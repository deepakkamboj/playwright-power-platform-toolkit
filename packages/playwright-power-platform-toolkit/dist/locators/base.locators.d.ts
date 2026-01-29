/**
 * Base Locator Management System for Power Apps Testing
 * Follows Playwright best practices for maintainable selectors
 * Extracted and enhanced from lib/old
 */
import { Page, Locator } from '@playwright/test';
/**
 * Base class for locator management using the builder pattern
 * Promotes reusability and maintainability of selectors
 */
export declare abstract class BaseLocators {
    protected page: Page;
    constructor(page: Page);
    /**
     * Get a locator by data-test-id attribute (preferred method)
     * @param testId - The data-test-id value
     * @returns Playwright Locator
     */
    protected getByTestId(testId: string): Locator;
    /**
     * Get a locator by role (accessible and semantic)
     * @param role - ARIA role
     * @param options - Additional options like name, exact, etc.
     * @returns Playwright Locator
     */
    protected getByRole(role: 'button' | 'link' | 'textbox' | 'heading' | 'menuitem' | 'grid' | 'row' | 'cell' | 'dialog' | 'navigation' | 'searchbox' | 'switch' | 'rowheader' | 'gridcell' | 'menubar' | 'checkbox' | 'radio' | 'combobox' | 'listbox' | 'option' | 'tab' | 'tabpanel', options?: {
        name?: string | RegExp;
        exact?: boolean;
        includeHidden?: boolean;
    }): Locator;
    /**
     * Get a locator by text content
     * @param text - Text content or RegExp
     * @param options - Additional options
     * @returns Playwright Locator
     */
    protected getByText(text: string | RegExp, options?: {
        exact?: boolean;
    }): Locator;
    /**
     * Get a locator by label (for form inputs)
     * @param label - Label text
     * @param options - Additional options
     * @returns Playwright Locator
     */
    protected getByLabel(label: string | RegExp, options?: {
        exact?: boolean;
    }): Locator;
    /**
     * Get a locator by placeholder
     * @param placeholder - Placeholder text
     * @returns Playwright Locator
     */
    protected getByPlaceholder(placeholder: string | RegExp): Locator;
    /**
     * Get a locator by aria-label
     * @param label - ARIA label text
     * @returns Playwright Locator
     */
    protected getByAriaLabel(label: string | RegExp): Locator;
    /**
     * Fallback to CSS selector when semantic locators aren't available
     * Use sparingly and document why semantic locators can't be used
     * @param selector - CSS selector
     * @returns Playwright Locator
     */
    protected locator(selector: string): Locator;
    /**
     * Chain locators for more specific targeting
     * @param parent - Parent locator
     * @param child - Child selector or locator method
     * @returns Chained Playwright Locator
     */
    protected chain(parent: Locator, child: string | ((loc: Locator) => Locator)): Locator;
}
/**
 * Locator utility functions
 */
export declare class LocatorUtils {
    /**
     * Format a selector string with parameters
     * @param template - Template string with {0}, {1}, etc. placeholders
     * @param args - Arguments to replace placeholders
     * @returns Formatted string
     * @example
     * LocatorUtils.formatSelector('[data-id="{0}"]', 'myId') // => '[data-id="myId"]'
     */
    static formatSelector(template: string, ...args: string[]): string;
    /**
     * Create a data-test-id selector
     * @param testId - Test ID value
     * @returns CSS selector string
     */
    static dataTestId(testId: string): string;
    /**
     * Create an ID selector
     * @param id - Element ID
     * @returns CSS selector string
     */
    static id(id: string): string;
    /**
     * Create a class selector
     * @param className - Class name (can contain wildcards for partial match)
     * @returns CSS selector string
     * @example
     * LocatorUtils.className('my-class') // => '.my-class'
     * LocatorUtils.className('*-button') // => '[class*="-button"]'
     */
    static className(className: string): string;
    /**
     * Create an automation ID selector (for Microsoft Fluent UI)
     * @param automationId - Automation ID value
     * @returns CSS selector string
     */
    static automationId(automationId: string): string;
    /**
     * Create a data-automation-key selector
     * @param automationKey - Automation key value
     * @returns CSS selector string
     */
    static automationKey(automationKey: string): string;
    /**
     * Create an aria-label selector
     * @param label - ARIA label value
     * @returns CSS selector string
     */
    static ariaLabel(label: string): string;
}
