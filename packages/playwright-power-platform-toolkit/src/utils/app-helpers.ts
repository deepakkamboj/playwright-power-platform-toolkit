/**
 * App Testing Helper Utilities
 * Common utility functions for Canvas and Model Driven app testing
 */

import { Page, Locator } from '@playwright/test';

/**
 * Generate a unique app name with timestamp
 * @param prefix - Prefix for the app name
 * @returns Unique app name
 */
export function generateUniqueAppName(prefix: string = 'TestApp'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Generate random alphanumeric string
 * @param length - Length of the string
 * @returns Random alphanumeric string
 */
export function generateRandomAlphaNumeric(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Wait for element to be visible with custom timeout
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 30000
): Promise<Locator> {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'visible', timeout });
  return locator;
}

/**
 * Wait for element to be hidden
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export async function waitForElementHidden(
  page: Page,
  selector: string,
  timeout: number = 30000
): Promise<void> {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'hidden', timeout });
}

/**
 * Wait for spinner/loading indicator to disappear
 * @param page - Playwright page object
 * @param spinnerSelector - Spinner selector (default: common spinner)
 * @param timeout - Timeout in milliseconds (default: 60000)
 */
export async function waitForSpinnerToDisappear(
  page: Page,
  spinnerSelector: string = '[role="progressbar"][aria-label="Loading"]',
  timeout: number = 60000
): Promise<void> {
  try {
    await page.locator(spinnerSelector).waitFor({ state: 'hidden', timeout });
  } catch {
    // Spinner might not appear at all, which is fine
    console.log('Spinner did not appear or already disappeared');
  }
}

/**
 * Click element with retry logic
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param retries - Number of retries (default: 3)
 */
export async function clickWithRetry(
  page: Page,
  selector: string,
  retries: number = 3
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await page.locator(selector).click({ timeout: 10000 });
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await page.waitForTimeout(1000);
    }
  }
}

/**
 * Fill input field with retry logic
 * @param page - Playwright page object
 * @param selector - Input selector
 * @param value - Value to fill
 * @param retries - Number of retries (default: 3)
 */
export async function fillWithRetry(
  page: Page,
  selector: string,
  value: string,
  retries: number = 3
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      const input = page.locator(selector);
      await input.clear();
      await input.fill(value);
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await page.waitForTimeout(1000);
    }
  }
}

/**
 * Check if element exists without throwing error
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns True if element exists, false otherwise
 */
export async function elementExists(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<boolean> {
  try {
    await page.locator(selector).waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get element count
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Number of elements matching the selector
 */
export async function getElementCount(page: Page, selector: string): Promise<number> {
  return await page.locator(selector).count();
}

/**
 * Scroll element into view
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Wait for network to be idle
 * @param page - Playwright page object
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 30000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Take screenshot with timestamp
 * @param page - Playwright page object
 * @param screenshotName - Name for the screenshot
 * @param path - Path to save screenshot (default: ./screenshots/)
 */
export async function takeScreenshot(
  page: Page,
  screenshotName: string,
  path: string = './screenshots/'
): Promise<void> {
  const timestamp = Date.now();
  await page.screenshot({
    path: `${path}${screenshotName}_${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Handle dialog/popup
 * @param page - Playwright page object
 * @param accept - True to accept, false to dismiss
 * @param promptText - Optional text for prompt dialogs
 */
export async function handleDialog(
  page: Page,
  accept: boolean = true,
  promptText?: string
): Promise<void> {
  page.once('dialog', async (dialog) => {
    if (promptText) {
      await dialog.accept(promptText);
    } else if (accept) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

/**
 * Wait for file download
 * @param page - Playwright page object
 * @returns Downloaded file path
 */
export async function waitForDownload(page: Page): Promise<string> {
  const [download] = await Promise.all([page.waitForEvent('download')]);
  return (await download.path()) || '';
}

/**
 * Upload file to input
 * @param page - Playwright page object
 * @param selector - File input selector
 * @param filePath - Path to file to upload
 */
export async function uploadFile(page: Page, selector: string, filePath: string): Promise<void> {
  await page.locator(selector).setInputFiles(filePath);
}

/**
 * Clear and type with delay (for better stability)
 * @param page - Playwright page object
 * @param selector - Input selector
 * @param text - Text to type
 * @param delay - Delay between keystrokes in ms (default: 50)
 */
export async function typeWithDelay(
  page: Page,
  selector: string,
  text: string,
  delay: number = 50
): Promise<void> {
  const input = page.locator(selector);
  await input.clear();
  await input.type(text, { delay });
}

/**
 * Select option from dropdown
 * @param page - Playwright page object
 * @param selector - Dropdown selector
 * @param option - Option to select (value, label, or index)
 */
export async function selectDropdownOption(
  page: Page,
  selector: string,
  option: string | number
): Promise<void> {
  if (typeof option === 'number') {
    await page.locator(selector).selectOption({ index: option });
  } else {
    await page.locator(selector).selectOption(option);
  }
}

/**
 * Hover over element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export async function hoverElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).hover();
}

/**
 * Double click element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export async function doubleClickElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).dblclick();
}

/**
 * Right click element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export async function rightClickElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).click({ button: 'right' });
}

/**
 * Get element text content
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Text content of the element
 */
export async function getTextContent(page: Page, selector: string): Promise<string> {
  return (await page.locator(selector).textContent()) || '';
}

/**
 * Get element attribute value
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param attribute - Attribute name
 * @returns Attribute value
 */
export async function getAttributeValue(
  page: Page,
  selector: string,
  attribute: string
): Promise<string> {
  return (await page.locator(selector).getAttribute(attribute)) || '';
}

/**
 * Check if element is enabled
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if enabled, false otherwise
 */
export async function isElementEnabled(page: Page, selector: string): Promise<boolean> {
  return await page.locator(selector).isEnabled();
}

/**
 * Check if element is disabled
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if disabled, false otherwise
 */
export async function isElementDisabled(page: Page, selector: string): Promise<boolean> {
  return await page.locator(selector).isDisabled();
}

/**
 * Check if element is checked (checkbox/radio)
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if checked, false otherwise
 */
export async function isElementChecked(page: Page, selector: string): Promise<boolean> {
  return await page.locator(selector).isChecked();
}

/**
 * Wait for specific number of elements
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param count - Expected count
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export async function waitForElementCount(
  page: Page,
  selector: string,
  count: number,
  timeout: number = 30000
): Promise<void> {
  await page.waitForFunction(
    (args) => {
      const elements = document.querySelectorAll(args.selector);
      return elements.length === args.count;
    },
    { selector, count },
    { timeout }
  );
}

/**
 * Press keyboard key
 * @param page - Playwright page object
 * @param key - Key to press (e.g., 'Enter', 'Escape', 'Tab')
 */
export async function pressKey(page: Page, key: string): Promise<void> {
  await page.keyboard.press(key);
}

/**
 * Press keyboard shortcut
 * @param page - Playwright page object
 * @param modifiers - Modifier keys (e.g., ['Control', 'Shift'])
 * @param key - Key to press
 */
export async function pressShortcut(page: Page, modifiers: string[], key: string): Promise<void> {
  const shortcut = [...modifiers, key].join('+');
  await page.keyboard.press(shortcut);
}
