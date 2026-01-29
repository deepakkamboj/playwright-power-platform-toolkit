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
export declare function generateUniqueAppName(prefix?: string): string;
/**
 * Generate random alphanumeric string
 * @param length - Length of the string
 * @returns Random alphanumeric string
 */
export declare function generateRandomAlphaNumeric(length?: number): string;
/**
 * Wait for element to be visible with custom timeout
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export declare function waitForElement(page: Page, selector: string, timeout?: number): Promise<Locator>;
/**
 * Wait for element to be hidden
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export declare function waitForElementHidden(page: Page, selector: string, timeout?: number): Promise<void>;
/**
 * Wait for spinner/loading indicator to disappear
 * @param page - Playwright page object
 * @param spinnerSelector - Spinner selector (default: common spinner)
 * @param timeout - Timeout in milliseconds (default: 60000)
 */
export declare function waitForSpinnerToDisappear(page: Page, spinnerSelector?: string, timeout?: number): Promise<void>;
/**
 * Click element with retry logic
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param retries - Number of retries (default: 3)
 */
export declare function clickWithRetry(page: Page, selector: string, retries?: number): Promise<void>;
/**
 * Fill input field with retry logic
 * @param page - Playwright page object
 * @param selector - Input selector
 * @param value - Value to fill
 * @param retries - Number of retries (default: 3)
 */
export declare function fillWithRetry(page: Page, selector: string, value: string, retries?: number): Promise<void>;
/**
 * Check if element exists without throwing error
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns True if element exists, false otherwise
 */
export declare function elementExists(page: Page, selector: string, timeout?: number): Promise<boolean>;
/**
 * Get element count
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Number of elements matching the selector
 */
export declare function getElementCount(page: Page, selector: string): Promise<number>;
/**
 * Scroll element into view
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export declare function scrollIntoView(page: Page, selector: string): Promise<void>;
/**
 * Wait for network to be idle
 * @param page - Playwright page object
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export declare function waitForNetworkIdle(page: Page, timeout?: number): Promise<void>;
/**
 * Take screenshot with timestamp
 * @param page - Playwright page object
 * @param screenshotName - Name for the screenshot
 * @param path - Path to save screenshot (default: ./screenshots/)
 */
export declare function takeScreenshot(page: Page, screenshotName: string, path?: string): Promise<void>;
/**
 * Handle dialog/popup
 * @param page - Playwright page object
 * @param accept - True to accept, false to dismiss
 * @param promptText - Optional text for prompt dialogs
 */
export declare function handleDialog(page: Page, accept?: boolean, promptText?: string): Promise<void>;
/**
 * Wait for file download
 * @param page - Playwright page object
 * @returns Downloaded file path
 */
export declare function waitForDownload(page: Page): Promise<string>;
/**
 * Upload file to input
 * @param page - Playwright page object
 * @param selector - File input selector
 * @param filePath - Path to file to upload
 */
export declare function uploadFile(page: Page, selector: string, filePath: string): Promise<void>;
/**
 * Clear and type with delay (for better stability)
 * @param page - Playwright page object
 * @param selector - Input selector
 * @param text - Text to type
 * @param delay - Delay between keystrokes in ms (default: 50)
 */
export declare function typeWithDelay(page: Page, selector: string, text: string, delay?: number): Promise<void>;
/**
 * Select option from dropdown
 * @param page - Playwright page object
 * @param selector - Dropdown selector
 * @param option - Option to select (value, label, or index)
 */
export declare function selectDropdownOption(page: Page, selector: string, option: string | number): Promise<void>;
/**
 * Hover over element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export declare function hoverElement(page: Page, selector: string): Promise<void>;
/**
 * Double click element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export declare function doubleClickElement(page: Page, selector: string): Promise<void>;
/**
 * Right click element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
export declare function rightClickElement(page: Page, selector: string): Promise<void>;
/**
 * Get element text content
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Text content of the element
 */
export declare function getTextContent(page: Page, selector: string): Promise<string>;
/**
 * Get element attribute value
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param attribute - Attribute name
 * @returns Attribute value
 */
export declare function getAttributeValue(page: Page, selector: string, attribute: string): Promise<string>;
/**
 * Check if element is enabled
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if enabled, false otherwise
 */
export declare function isElementEnabled(page: Page, selector: string): Promise<boolean>;
/**
 * Check if element is disabled
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if disabled, false otherwise
 */
export declare function isElementDisabled(page: Page, selector: string): Promise<boolean>;
/**
 * Check if element is checked (checkbox/radio)
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if checked, false otherwise
 */
export declare function isElementChecked(page: Page, selector: string): Promise<boolean>;
/**
 * Wait for specific number of elements
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param count - Expected count
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
export declare function waitForElementCount(page: Page, selector: string, count: number, timeout?: number): Promise<void>;
/**
 * Press keyboard key
 * @param page - Playwright page object
 * @param key - Key to press (e.g., 'Enter', 'Escape', 'Tab')
 */
export declare function pressKey(page: Page, key: string): Promise<void>;
/**
 * Press keyboard shortcut
 * @param page - Playwright page object
 * @param modifiers - Modifier keys (e.g., ['Control', 'Shift'])
 * @param key - Key to press
 */
export declare function pressShortcut(page: Page, modifiers: string[], key: string): Promise<void>;
