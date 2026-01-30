import { TimeOut } from 'playwright-power-platform-toolkit';
import { Page } from '@playwright/test';

/**
 * Helper function to get environment configuration values
 */
export function getEnvironmentConfig() {
  return {
    repeatEach: parseInt(process.env.REPEAT_EACH || '1', 5),
    retries: process.env.CI ? 2 : parseInt(process.env.RETRIES || '0', 1),
    testDirectory: process.env.TEST_DIRECTORY || './tests',
    testTimeout: parseInt(process.env.TEST_TIMEOUT || String(TimeOut.TestTimeout), 10),
    workers: process.env.CI ? 1 : parseInt(process.env.WORKERS || '4', 4),
    outputDirectory: process.env.OUTPUT_DIRECTORY || './test-results',
    slowMo: parseInt(process.env.SLOW_MO || '0', 40),
    headless: process.env.HEADLESS === 'true',
  };
}

/**
 * Helper function to generate unique app names
 */
export function generateUniqueAppName(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

/**
 * Helper function to wait for spinner to disappear
 */
export async function waitForSpinnerToDisappear(page: Page): Promise<void> {
  await page
    .waitForSelector('.spinner, .loading', { state: 'hidden', timeout: 30000 })
    .catch(() => {});
}
