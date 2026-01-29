/*!
 * Accessibility Testing Utilities for Power Apps
 * Helpers for WCAG compliance and accessibility testing
 */
import { Page, Locator } from '@playwright/test';
/**
 * WCAG Compliance Levels
 */
export declare enum WCAGLevel {
    A = "wcag2a",
    AA = "wcag2aa",
    AAA = "wcag2aaa"
}
/**
 * Common accessibility rules to check
 */
export declare const AccessibilityRules: {
    ColorContrast: string;
    Focusable: string;
    TabIndex: string;
    AriaRoles: string;
    AriaRequired: string;
    AriaValid: string;
    ImageAlt: string;
    LabelAssociation: string;
    FormFieldLabels: string;
    HeadingOrder: string;
    LinkName: string;
    Landmarks: string;
    PageTitle: string;
};
/**
 * Accessibility Test Helper
 */
export declare class AccessibilityTestHelper {
    private page;
    constructor(page: Page);
    /**
     * Run full accessibility scan on the page
     */
    scanPage(options?: {
        wcagLevel?: WCAGLevel;
        rules?: string[];
        disableRules?: string[];
    }): Promise<any>;
    /**
     * Scan specific element for accessibility issues
     */
    scanElement(selector: string, options?: {
        wcagLevel?: WCAGLevel;
    }): Promise<any>;
    /**
     * Assert no accessibility violations
     */
    assertNoViolations(results: any): Promise<void>;
    /**
     * Assert no critical violations (allows warnings)
     */
    assertNoCriticalViolations(results: any): Promise<void>;
    /**
     * Check keyboard navigation
     */
    testKeyboardNavigation(elements: string[]): Promise<void>;
    /**
     * Test tab order
     */
    testTabOrder(expectedSelectors: string[]): Promise<void>;
    /**
     * Check ARIA labels
     */
    assertAriaLabel(locator: Locator, expectedLabel: string): Promise<void>;
    /**
     * Check element is accessible by screen reader
     */
    assertAccessibleName(locator: Locator, expectedName: string): Promise<void>;
    /**
     * Check color contrast ratio
     */
    checkColorContrast(selector: string): Promise<void>;
    /**
     * Test keyboard shortcuts
     */
    testKeyboardShortcut(keys: string, expectedAction: () => Promise<void>): Promise<void>;
    /**
     * Check for proper heading hierarchy
     */
    assertHeadingHierarchy(): Promise<void>;
    /**
     * Check all images have alt text
     */
    assertImagesHaveAltText(): Promise<void>;
    /**
     * Check form fields have labels
     */
    assertFormFieldsLabeled(): Promise<void>;
    /**
     * Generate accessibility report
     */
    generateReport(results: any): string;
    /**
     * Save accessibility report to file
     */
    saveReport(results: any, filePath: string): Promise<void>;
}
/**
 * Common accessibility assertions
 */
export declare class AccessibilityAssertions {
    /**
     * Assert element is keyboard accessible
     */
    static assertKeyboardAccessible(locator: Locator): Promise<void>;
    /**
     * Assert element has proper ARIA role
     */
    static assertAriaRole(locator: Locator, role: string): Promise<void>;
    /**
     * Assert element is not in tab order (tabindex=-1)
     */
    static assertNotInTabOrder(locator: Locator): Promise<void>;
    /**
     * Assert element is announced to screen readers
     */
    static assertScreenReaderText(locator: Locator): Promise<void>;
}
