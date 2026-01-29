"use strict";
/**
 * Base Locator Management System for Power Apps Testing
 * Follows Playwright best practices for maintainable selectors
 * Extracted and enhanced from lib/old
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocatorUtils = exports.BaseLocators = void 0;
/**
 * Base class for locator management using the builder pattern
 * Promotes reusability and maintainability of selectors
 */
class BaseLocators {
    constructor(page) {
        this.page = page;
    }
    /**
     * Get a locator by data-test-id attribute (preferred method)
     * @param testId - The data-test-id value
     * @returns Playwright Locator
     */
    getByTestId(testId) {
        return this.page.getByTestId(testId);
    }
    /**
     * Get a locator by role (accessible and semantic)
     * @param role - ARIA role
     * @param options - Additional options like name, exact, etc.
     * @returns Playwright Locator
     */
    getByRole(role, options) {
        return this.page.getByRole(role, options);
    }
    /**
     * Get a locator by text content
     * @param text - Text content or RegExp
     * @param options - Additional options
     * @returns Playwright Locator
     */
    getByText(text, options) {
        return this.page.getByText(text, options);
    }
    /**
     * Get a locator by label (for form inputs)
     * @param label - Label text
     * @param options - Additional options
     * @returns Playwright Locator
     */
    getByLabel(label, options) {
        return this.page.getByLabel(label, options);
    }
    /**
     * Get a locator by placeholder
     * @param placeholder - Placeholder text
     * @returns Playwright Locator
     */
    getByPlaceholder(placeholder) {
        return this.page.getByPlaceholder(placeholder);
    }
    /**
     * Get a locator by aria-label
     * @param label - ARIA label text
     * @returns Playwright Locator
     */
    getByAriaLabel(label) {
        return this.page.getByLabel(label);
    }
    /**
     * Fallback to CSS selector when semantic locators aren't available
     * Use sparingly and document why semantic locators can't be used
     * @param selector - CSS selector
     * @returns Playwright Locator
     */
    locator(selector) {
        return this.page.locator(selector);
    }
    /**
     * Chain locators for more specific targeting
     * @param parent - Parent locator
     * @param child - Child selector or locator method
     * @returns Chained Playwright Locator
     */
    chain(parent, child) {
        if (typeof child === 'string') {
            return parent.locator(child);
        }
        return child(parent);
    }
}
exports.BaseLocators = BaseLocators;
/**
 * Locator utility functions
 */
class LocatorUtils {
    /**
     * Format a selector string with parameters
     * @param template - Template string with {0}, {1}, etc. placeholders
     * @param args - Arguments to replace placeholders
     * @returns Formatted string
     * @example
     * LocatorUtils.formatSelector('[data-id="{0}"]', 'myId') // => '[data-id="myId"]'
     */
    static formatSelector(template, ...args) {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
    /**
     * Create a data-test-id selector
     * @param testId - Test ID value
     * @returns CSS selector string
     */
    static dataTestId(testId) {
        return `[data-test-id="${testId}"]`;
    }
    /**
     * Create an ID selector
     * @param id - Element ID
     * @returns CSS selector string
     */
    static id(id) {
        return `#${id}`;
    }
    /**
     * Create a class selector
     * @param className - Class name (can contain wildcards for partial match)
     * @returns CSS selector string
     * @example
     * LocatorUtils.className('my-class') // => '.my-class'
     * LocatorUtils.className('*-button') // => '[class*="-button"]'
     */
    static className(className) {
        if (className.includes('*')) {
            return `[class*="${className.replace(/\*/g, '')}"]`;
        }
        return `.${className}`;
    }
    /**
     * Create an automation ID selector (for Microsoft Fluent UI)
     * @param automationId - Automation ID value
     * @returns CSS selector string
     */
    static automationId(automationId) {
        return `[data-automation-id="${automationId}"]`;
    }
    /**
     * Create a data-automation-key selector
     * @param automationKey - Automation key value
     * @returns CSS selector string
     */
    static automationKey(automationKey) {
        return `[data-automation-key="${automationKey}"]`;
    }
    /**
     * Create an aria-label selector
     * @param label - ARIA label value
     * @returns CSS selector string
     */
    static ariaLabel(label) {
        return `[aria-label="${label}"]`;
    }
}
exports.LocatorUtils = LocatorUtils;
