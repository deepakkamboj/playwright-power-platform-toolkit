/*!
 * Common utilities for Power Apps testing
 */

import { Page, expect, Locator } from '@playwright/test';
import * as path from 'path';
import { existsSync } from 'fs';

/**
 * Timeout constants (in milliseconds)
 */
export enum TimeOut {
  DefaultLoopWaitTime = 5000, // 5 secs
  DefaultWaitTime = 30000, // 30 secs
  DefaultMaxWaitTime = 180000, // 3 minutes
  DefaultWaitTimeForValidation = 30000, // 30 secs
  ElementWaitTime = 2000, // 2 secs
  FiveMinutesTimeout = 720000, // 5 minutes
  LoadTimeOut = 60000, // 1 minute
  NavigationTimeout = 60000, // 60 secs (1 minute)
  OneMinuteTimeOut = 60000, // 1 minute
  OptionalElementTimeout = 5000, // 5 secs - for optional elements that may not be present
  PageLoadTimeOut = 30000, // 30 secs
  TestTimeout = 360000, // 360000 ms (6 minutes)
  TestTimeoutMax = 600000, // 600000 ms (10 minutes)
  TwoMinutesTimeout = 120000, // 2 minutes
  FifteenMinutesTimeout = 900000, // 15 minutes
}

/**
 * Find the project root by looking for package.json file
 * @param startDir - The directory to start searching from
 * @returns The project root directory
 */
function findProjectRoot(startDir: string): string {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    if (existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  // Fall back to the current working directory if project root isn't found
  return process.cwd();
}

/**
 * Get the calling project's root directory
 */
export function getProjectRoot(): string {
  return findProjectRoot(process.cwd());
}

export const ProcessEnvironmentConfig = () => ({
  outputDirectory:
    process.env.OUTPUT_DIR || path.join(getProjectRoot(), '.playwright-test-results'),
  testDirectory: process.env.TEST_DIR || path.join(getProjectRoot(), 'tests'),
  testTimeout: Number(process.env.TEST_TIMEOUT) || TimeOut.TestTimeoutMax,
  repeatEach: Number(process.env.REPEAT) || 1,
  retries: Number(process.env.RETRIES) || 0,
  workers: Number(process.env.WORKERS) || 4,
});

/**
 * Get the storage state path for the authenticated user
 * This replicates playwright-ms-auth's getStorageStatePath without importing the module
 */
export function storageStatePath(): string {
  const email = process.env.MS_AUTH_EMAIL || '';
  const authDir = path.join(getProjectRoot(), '.playwright-ms-auth');
  // Sanitize email to create safe filename
  const sanitizedEmail = email.replace(/[^a-zA-Z0-9@.-]/g, '-');
  return path.join(authDir, `state-${sanitizedEmail}.json`);
}

/**
 * Check if all required environment variables are set
 */
export function checkEnvironmentVariables(): void {
  const required = ['POWER_APPS_BASE_URL', 'MS_AUTH_EMAIL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Get grep configuration value for test filtering
 */
export function getGrepConfigValue(): RegExp | undefined {
  if (process.env.GREP) {
    return new RegExp(process.env.GREP);
  }
  return undefined;
}

/**
 * Wait for a condition to be true with timeout
 * @param condition - Async function that returns boolean
 * @param errorMessage - Error message if timeout occurs
 * @param timeout - Maximum wait time in milliseconds
 * @param pollInterval - How often to check condition in milliseconds
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  errorMessage: string,
  timeout: number = TimeOut.OneMinuteTimeOut,
  pollInterval: number = 1000
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      if (await condition()) {
        return;
      }
    } catch (error) {
      // Continue polling even if condition throws
    }
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error(`${errorMessage} (timeout after ${timeout}ms)`);
}

/**
 * Scroll element into view if needed
 * @param page - Playwright Page object
 * @param element - Element handle or locator
 */
export async function scrollToElement(page: Page, element: any): Promise<void> {
  if (element && typeof element.scrollIntoViewIfNeeded === 'function') {
    await element.scrollIntoViewIfNeeded();
  }
}

/**
 * Format a string template with arguments
 * @param template - String with {0}, {1}, etc. placeholders
 * @param args - Values to replace placeholders
 * @returns Formatted string
 */
export function formatString(template: string, ...args: string[]): string {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
}

/**
 * Generate random alphanumeric string
 * @param length - Length of the string (default: 8)
 * @returns Random alphanumeric string
 */
export function randomAlphaNumeric(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Delay execution for specified milliseconds
 * @param ms - Milliseconds to delay
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry an operation with exponential backoff
 * @param operation - Async function to retry
 * @param maxRetries - Maximum number of retries
 * @param initialDelay - Initial delay in milliseconds
 * @returns Result of the operation
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const delayTime = initialDelay * Math.pow(2, attempt);
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delayTime}ms...`);
        await delay(delayTime);
      }
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

/**
 * Wait for network to be idle
 * @param page - Playwright Page object
 * @param timeout - Maximum wait time
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = TimeOut.TwoMinutesTimeout
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Dismiss a teaching bubble if present
 * @param page - Playwright Page object
 */
export async function dismissTeachingBubbleIfPresent(page: Page): Promise<void> {
  try {
    const teachingBubble = page.locator('[role="dialog"][class*="ms-TeachingBubble-content"]');
    await teachingBubble.waitFor({ timeout: TimeOut.ElementWaitTime });

    const closeButton = page.locator('[class*="ms-TeachingBubble-closebutton"]');
    if (await closeButton.isVisible()) {
      await closeButton.click();
      console.log('Dismissed teaching bubble via close button');
    } else {
      const primaryButton = page.locator('.ms-TeachingBubble-primaryButton');
      if (await primaryButton.isVisible()) {
        await primaryButton.click();
        console.log('Dismissed teaching bubble via primary button');
      }
    }
  } catch {
    // Teaching bubble not present, continue
  }
}

/**
 * Safe fill for input fields (clears first)
 * @param locator - Input field locator
 * @param value - Value to fill
 */
export async function safeFill(locator: Locator, value: string): Promise<void> {
  await locator.click();
  await locator.fill('');
  await locator.fill(value);
}

/**
 * Wait for element to be detached from DOM
 * @param locator - Element locator
 * @param timeout - Maximum wait time
 */
export async function waitForDetached(
  locator: Locator,
  timeout: number = TimeOut.OneMinuteTimeOut
): Promise<void> {
  await locator.waitFor({ state: 'detached', timeout });
}
