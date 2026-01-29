"use strict";
/*!
 * Accessibility Testing Utilities for Power Apps
 * Helpers for WCAG compliance and accessibility testing
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityAssertions = exports.AccessibilityTestHelper = exports.AccessibilityRules = exports.WCAGLevel = void 0;
const test_1 = require("@playwright/test");
const playwright_1 = __importDefault(require("@axe-core/playwright"));
/**
 * WCAG Compliance Levels
 */
var WCAGLevel;
(function (WCAGLevel) {
    WCAGLevel["A"] = "wcag2a";
    WCAGLevel["AA"] = "wcag2aa";
    WCAGLevel["AAA"] = "wcag2aaa";
})(WCAGLevel || (exports.WCAGLevel = WCAGLevel = {}));
/**
 * Common accessibility rules to check
 */
exports.AccessibilityRules = {
    // Color contrast
    ColorContrast: 'color-contrast',
    // Keyboard navigation
    Focusable: 'focus-order-semantics',
    TabIndex: 'tabindex',
    // ARIA
    AriaRoles: 'aria-roles',
    AriaRequired: 'aria-required-attr',
    AriaValid: 'aria-valid-attr',
    // Images
    ImageAlt: 'image-alt',
    // Forms
    LabelAssociation: 'label',
    FormFieldLabels: 'form-field-multiple-labels',
    // Headings
    HeadingOrder: 'heading-order',
    // Links
    LinkName: 'link-name',
    // Page structure
    Landmarks: 'region',
    PageTitle: 'document-title',
};
/**
 * Accessibility Test Helper
 */
class AccessibilityTestHelper {
    constructor(page) {
        this.page = page;
    }
    /**
     * Run full accessibility scan on the page
     */
    async scanPage(options) {
        let builder = new playwright_1.default({ page: this.page });
        if (options?.wcagLevel) {
            builder = builder.withTags([options.wcagLevel]);
        }
        if (options?.rules) {
            builder = builder.include(options.rules);
        }
        if (options?.disableRules) {
            builder = builder.disableRules(options.disableRules);
        }
        const results = await builder.analyze();
        return results;
    }
    /**
     * Scan specific element for accessibility issues
     */
    async scanElement(selector, options) {
        let builder = new playwright_1.default({ page: this.page }).include(selector);
        if (options?.wcagLevel) {
            builder = builder.withTags([options.wcagLevel]);
        }
        const results = await builder.analyze();
        return results;
    }
    /**
     * Assert no accessibility violations
     */
    async assertNoViolations(results) {
        (0, test_1.expect)(results.violations).toHaveLength(0);
    }
    /**
     * Assert no critical violations (allows warnings)
     */
    async assertNoCriticalViolations(results) {
        const criticalViolations = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
        (0, test_1.expect)(criticalViolations).toHaveLength(0);
    }
    /**
     * Check keyboard navigation
     */
    async testKeyboardNavigation(elements) {
        for (const selector of elements) {
            const element = this.page.locator(selector);
            await element.focus();
            await (0, test_1.expect)(element).toBeFocused();
        }
    }
    /**
     * Test tab order
     */
    async testTabOrder(expectedSelectors) {
        for (let i = 0; i < expectedSelectors.length; i++) {
            if (i > 0) {
                await this.page.keyboard.press('Tab');
            }
            const selector = expectedSelectors[i];
            if (!selector)
                continue;
            const currentElement = this.page.locator(selector);
            await (0, test_1.expect)(currentElement).toBeFocused();
        }
    }
    /**
     * Check ARIA labels
     */
    async assertAriaLabel(locator, expectedLabel) {
        const ariaLabel = await locator.getAttribute('aria-label');
        (0, test_1.expect)(ariaLabel).toBe(expectedLabel);
    }
    /**
     * Check element is accessible by screen reader
     */
    async assertAccessibleName(locator, expectedName) {
        const accessibleName = await locator.evaluate((el) => {
            // @ts-ignore
            return el.computedName || el.getAttribute('aria-label') || el.textContent;
        });
        (0, test_1.expect)(accessibleName?.trim()).toContain(expectedName);
    }
    /**
     * Check color contrast ratio
     */
    async checkColorContrast(selector) {
        const results = await new playwright_1.default({ page: this.page })
            .include(selector)
            .withRules([exports.AccessibilityRules.ColorContrast])
            .analyze();
        (0, test_1.expect)(results.violations).toHaveLength(0);
    }
    /**
     * Test keyboard shortcuts
     */
    async testKeyboardShortcut(keys, expectedAction) {
        await this.page.keyboard.press(keys);
        await expectedAction();
    }
    /**
     * Check for proper heading hierarchy
     */
    async assertHeadingHierarchy() {
        const results = await new playwright_1.default({ page: this.page })
            .withRules([exports.AccessibilityRules.HeadingOrder])
            .analyze();
        (0, test_1.expect)(results.violations).toHaveLength(0);
    }
    /**
     * Check all images have alt text
     */
    async assertImagesHaveAltText() {
        const results = await new playwright_1.default({ page: this.page })
            .withRules([exports.AccessibilityRules.ImageAlt])
            .analyze();
        (0, test_1.expect)(results.violations).toHaveLength(0);
    }
    /**
     * Check form fields have labels
     */
    async assertFormFieldsLabeled() {
        const results = await new playwright_1.default({ page: this.page })
            .withRules([exports.AccessibilityRules.LabelAssociation])
            .analyze();
        (0, test_1.expect)(results.violations).toHaveLength(0);
    }
    /**
     * Generate accessibility report
     */
    generateReport(results) {
        let report = '=== Accessibility Test Report ===\n\n';
        report += `Total Violations: ${results.violations.length}\n`;
        report += `Passes: ${results.passes.length}\n`;
        report += `Incomplete: ${results.incomplete.length}\n\n`;
        if (results.violations.length > 0) {
            report += 'VIOLATIONS:\n';
            results.violations.forEach((violation, index) => {
                report += `\n${index + 1}. ${violation.id} (${violation.impact})\n`;
                report += `   Description: ${violation.description}\n`;
                report += `   Help: ${violation.helpUrl}\n`;
                report += `   Affected elements: ${violation.nodes.length}\n`;
            });
        }
        return report;
    }
    /**
     * Save accessibility report to file
     */
    async saveReport(results, filePath) {
        const fs = await Promise.resolve().then(() => __importStar(require('fs')));
        const report = this.generateReport(results);
        fs.writeFileSync(filePath, report);
    }
}
exports.AccessibilityTestHelper = AccessibilityTestHelper;
/**
 * Common accessibility assertions
 */
class AccessibilityAssertions {
    /**
     * Assert element is keyboard accessible
     */
    static async assertKeyboardAccessible(locator) {
        await locator.focus();
        await (0, test_1.expect)(locator).toBeFocused();
    }
    /**
     * Assert element has proper ARIA role
     */
    static async assertAriaRole(locator, role) {
        const ariaRole = await locator.getAttribute('role');
        (0, test_1.expect)(ariaRole).toBe(role);
    }
    /**
     * Assert element is not in tab order (tabindex=-1)
     */
    static async assertNotInTabOrder(locator) {
        const tabIndex = await locator.getAttribute('tabindex');
        (0, test_1.expect)(tabIndex).toBe('-1');
    }
    /**
     * Assert element is announced to screen readers
     */
    static async assertScreenReaderText(locator) {
        const ariaLabel = await locator.getAttribute('aria-label');
        const ariaLabelledBy = await locator.getAttribute('aria-labelledby');
        const textContent = await locator.textContent();
        const hasAccessibleText = ariaLabel || ariaLabelledBy || (textContent && textContent.trim().length > 0);
        (0, test_1.expect)(hasAccessibleText).toBeTruthy();
    }
}
exports.AccessibilityAssertions = AccessibilityAssertions;
