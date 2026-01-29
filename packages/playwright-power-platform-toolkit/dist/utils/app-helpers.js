"use strict";
/**
 * App Testing Helper Utilities
 * Common utility functions for Canvas and Model Driven app testing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueAppName = generateUniqueAppName;
exports.generateRandomAlphaNumeric = generateRandomAlphaNumeric;
exports.waitForElement = waitForElement;
exports.waitForElementHidden = waitForElementHidden;
exports.waitForSpinnerToDisappear = waitForSpinnerToDisappear;
exports.clickWithRetry = clickWithRetry;
exports.fillWithRetry = fillWithRetry;
exports.elementExists = elementExists;
exports.getElementCount = getElementCount;
exports.scrollIntoView = scrollIntoView;
exports.waitForNetworkIdle = waitForNetworkIdle;
exports.takeScreenshot = takeScreenshot;
exports.handleDialog = handleDialog;
exports.waitForDownload = waitForDownload;
exports.uploadFile = uploadFile;
exports.typeWithDelay = typeWithDelay;
exports.selectDropdownOption = selectDropdownOption;
exports.hoverElement = hoverElement;
exports.doubleClickElement = doubleClickElement;
exports.rightClickElement = rightClickElement;
exports.getTextContent = getTextContent;
exports.getAttributeValue = getAttributeValue;
exports.isElementEnabled = isElementEnabled;
exports.isElementDisabled = isElementDisabled;
exports.isElementChecked = isElementChecked;
exports.waitForElementCount = waitForElementCount;
exports.pressKey = pressKey;
exports.pressShortcut = pressShortcut;
/**
 * Generate a unique app name with timestamp
 * @param prefix - Prefix for the app name
 * @returns Unique app name
 */
function generateUniqueAppName(prefix = 'TestApp') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
}
/**
 * Generate random alphanumeric string
 * @param length - Length of the string
 * @returns Random alphanumeric string
 */
function generateRandomAlphaNumeric(length = 8) {
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
async function waitForElement(page, selector, timeout = 30000) {
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
async function waitForElementHidden(page, selector, timeout = 30000) {
    const locator = page.locator(selector);
    await locator.waitFor({ state: 'hidden', timeout });
}
/**
 * Wait for spinner/loading indicator to disappear
 * @param page - Playwright page object
 * @param spinnerSelector - Spinner selector (default: common spinner)
 * @param timeout - Timeout in milliseconds (default: 60000)
 */
async function waitForSpinnerToDisappear(page, spinnerSelector = '[role="progressbar"][aria-label="Loading"]', timeout = 60000) {
    try {
        await page.locator(spinnerSelector).waitFor({ state: 'hidden', timeout });
    }
    catch (error) {
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
async function clickWithRetry(page, selector, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await page.locator(selector).click({ timeout: 10000 });
            return;
        }
        catch (error) {
            if (i === retries - 1)
                throw error;
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
async function fillWithRetry(page, selector, value, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const input = page.locator(selector);
            await input.clear();
            await input.fill(value);
            return;
        }
        catch (error) {
            if (i === retries - 1)
                throw error;
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
async function elementExists(page, selector, timeout = 5000) {
    try {
        await page.locator(selector).waitFor({ state: 'visible', timeout });
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Get element count
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Number of elements matching the selector
 */
async function getElementCount(page, selector) {
    return await page.locator(selector).count();
}
/**
 * Scroll element into view
 * @param page - Playwright page object
 * @param selector - Element selector
 */
async function scrollIntoView(page, selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
}
/**
 * Wait for network to be idle
 * @param page - Playwright page object
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
async function waitForNetworkIdle(page, timeout = 30000) {
    await page.waitForLoadState('networkidle', { timeout });
}
/**
 * Take screenshot with timestamp
 * @param page - Playwright page object
 * @param screenshotName - Name for the screenshot
 * @param path - Path to save screenshot (default: ./screenshots/)
 */
async function takeScreenshot(page, screenshotName, path = './screenshots/') {
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
async function handleDialog(page, accept = true, promptText) {
    page.once('dialog', async (dialog) => {
        if (promptText) {
            await dialog.accept(promptText);
        }
        else if (accept) {
            await dialog.accept();
        }
        else {
            await dialog.dismiss();
        }
    });
}
/**
 * Wait for file download
 * @param page - Playwright page object
 * @returns Downloaded file path
 */
async function waitForDownload(page) {
    const [download] = await Promise.all([page.waitForEvent('download')]);
    return (await download.path()) || '';
}
/**
 * Upload file to input
 * @param page - Playwright page object
 * @param selector - File input selector
 * @param filePath - Path to file to upload
 */
async function uploadFile(page, selector, filePath) {
    await page.locator(selector).setInputFiles(filePath);
}
/**
 * Clear and type with delay (for better stability)
 * @param page - Playwright page object
 * @param selector - Input selector
 * @param text - Text to type
 * @param delay - Delay between keystrokes in ms (default: 50)
 */
async function typeWithDelay(page, selector, text, delay = 50) {
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
async function selectDropdownOption(page, selector, option) {
    if (typeof option === 'number') {
        await page.locator(selector).selectOption({ index: option });
    }
    else {
        await page.locator(selector).selectOption(option);
    }
}
/**
 * Hover over element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
async function hoverElement(page, selector) {
    await page.locator(selector).hover();
}
/**
 * Double click element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
async function doubleClickElement(page, selector) {
    await page.locator(selector).dblclick();
}
/**
 * Right click element
 * @param page - Playwright page object
 * @param selector - Element selector
 */
async function rightClickElement(page, selector) {
    await page.locator(selector).click({ button: 'right' });
}
/**
 * Get element text content
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns Text content of the element
 */
async function getTextContent(page, selector) {
    return (await page.locator(selector).textContent()) || '';
}
/**
 * Get element attribute value
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param attribute - Attribute name
 * @returns Attribute value
 */
async function getAttributeValue(page, selector, attribute) {
    return (await page.locator(selector).getAttribute(attribute)) || '';
}
/**
 * Check if element is enabled
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if enabled, false otherwise
 */
async function isElementEnabled(page, selector) {
    return await page.locator(selector).isEnabled();
}
/**
 * Check if element is disabled
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if disabled, false otherwise
 */
async function isElementDisabled(page, selector) {
    return await page.locator(selector).isDisabled();
}
/**
 * Check if element is checked (checkbox/radio)
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if checked, false otherwise
 */
async function isElementChecked(page, selector) {
    return await page.locator(selector).isChecked();
}
/**
 * Wait for specific number of elements
 * @param page - Playwright page object
 * @param selector - Element selector
 * @param count - Expected count
 * @param timeout - Timeout in milliseconds (default: 30000)
 */
async function waitForElementCount(page, selector, count, timeout = 30000) {
    await page.waitForFunction((args) => {
        const elements = document.querySelectorAll(args.selector);
        return elements.length === args.count;
    }, { selector, count }, { timeout });
}
/**
 * Press keyboard key
 * @param page - Playwright page object
 * @param key - Key to press (e.g., 'Enter', 'Escape', 'Tab')
 */
async function pressKey(page, key) {
    await page.keyboard.press(key);
}
/**
 * Press keyboard shortcut
 * @param page - Playwright page object
 * @param modifiers - Modifier keys (e.g., ['Control', 'Shift'])
 * @param key - Key to press
 */
async function pressShortcut(page, modifiers, key) {
    const shortcut = [...modifiers, key].join('+');
    await page.keyboard.press(shortcut);
}
