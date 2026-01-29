/*!
 * Accessibility Testing Utilities for Power Apps
 * Helpers for WCAG compliance and accessibility testing
 */

import { Page, Locator, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG Compliance Levels
 */
export enum WCAGLevel {
  A = 'wcag2a',
  AA = 'wcag2aa',
  AAA = 'wcag2aaa',
}

/**
 * Common accessibility rules to check
 */
export const AccessibilityRules = {
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
export class AccessibilityTestHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Run full accessibility scan on the page
   */
  async scanPage(options?: {
    wcagLevel?: WCAGLevel;
    rules?: string[];
    disableRules?: string[];
  }): Promise<any> {
    let builder = new AxeBuilder({ page: this.page });

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
  async scanElement(
    selector: string,
    options?: {
      wcagLevel?: WCAGLevel;
    }
  ): Promise<any> {
    let builder = new AxeBuilder({ page: this.page }).include(selector);

    if (options?.wcagLevel) {
      builder = builder.withTags([options.wcagLevel]);
    }

    const results = await builder.analyze();
    return results;
  }

  /**
   * Assert no accessibility violations
   */
  async assertNoViolations(results: any): Promise<void> {
    expect(results.violations).toHaveLength(0);
  }

  /**
   * Assert no critical violations (allows warnings)
   */
  async assertNoCriticalViolations(results: any): Promise<void> {
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations).toHaveLength(0);
  }

  /**
   * Check keyboard navigation
   */
  async testKeyboardNavigation(elements: string[]): Promise<void> {
    for (const selector of elements) {
      const element = this.page.locator(selector);
      await element.focus();
      await expect(element).toBeFocused();
    }
  }

  /**
   * Test tab order
   */
  async testTabOrder(expectedSelectors: string[]): Promise<void> {
    for (let i = 0; i < expectedSelectors.length; i++) {
      if (i > 0) {
        await this.page.keyboard.press('Tab');
      }
      const selector = expectedSelectors[i];
      if (!selector) continue;
      const currentElement = this.page.locator(selector);
      await expect(currentElement).toBeFocused();
    }
  }

  /**
   * Check ARIA labels
   */
  async assertAriaLabel(locator: Locator, expectedLabel: string): Promise<void> {
    const ariaLabel = await locator.getAttribute('aria-label');
    expect(ariaLabel).toBe(expectedLabel);
  }

  /**
   * Check element is accessible by screen reader
   */
  async assertAccessibleName(locator: Locator, expectedName: string): Promise<void> {
    const accessibleName = await locator.evaluate((el) => {
      // @ts-expect-error - computedName is not in TypeScript DOM types yet
      return el.computedName || el.getAttribute('aria-label') || el.textContent;
    });
    expect(accessibleName?.trim()).toContain(expectedName);
  }

  /**
   * Check color contrast ratio
   */
  async checkColorContrast(selector: string): Promise<void> {
    const results = await new AxeBuilder({ page: this.page })
      .include(selector)
      .withRules([AccessibilityRules.ColorContrast])
      .analyze();

    expect(results.violations).toHaveLength(0);
  }

  /**
   * Test keyboard shortcuts
   */
  async testKeyboardShortcut(keys: string, expectedAction: () => Promise<void>): Promise<void> {
    await this.page.keyboard.press(keys);
    await expectedAction();
  }

  /**
   * Check for proper heading hierarchy
   */
  async assertHeadingHierarchy(): Promise<void> {
    const results = await new AxeBuilder({ page: this.page })
      .withRules([AccessibilityRules.HeadingOrder])
      .analyze();

    expect(results.violations).toHaveLength(0);
  }

  /**
   * Check all images have alt text
   */
  async assertImagesHaveAltText(): Promise<void> {
    const results = await new AxeBuilder({ page: this.page })
      .withRules([AccessibilityRules.ImageAlt])
      .analyze();

    expect(results.violations).toHaveLength(0);
  }

  /**
   * Check form fields have labels
   */
  async assertFormFieldsLabeled(): Promise<void> {
    const results = await new AxeBuilder({ page: this.page })
      .withRules([AccessibilityRules.LabelAssociation])
      .analyze();

    expect(results.violations).toHaveLength(0);
  }

  /**
   * Generate accessibility report
   */
  generateReport(results: any): string {
    let report = '=== Accessibility Test Report ===\n\n';

    report += `Total Violations: ${results.violations.length}\n`;
    report += `Passes: ${results.passes.length}\n`;
    report += `Incomplete: ${results.incomplete.length}\n\n`;

    if (results.violations.length > 0) {
      report += 'VIOLATIONS:\n';
      results.violations.forEach((violation: any, index: number) => {
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
  async saveReport(results: any, filePath: string): Promise<void> {
    const fs = await import('fs');
    const report = this.generateReport(results);
    fs.writeFileSync(filePath, report);
  }
}

/**
 * Common accessibility assertions
 */
export class AccessibilityAssertions {
  /**
   * Assert element is keyboard accessible
   */
  static async assertKeyboardAccessible(locator: Locator): Promise<void> {
    await locator.focus();
    await expect(locator).toBeFocused();
  }

  /**
   * Assert element has proper ARIA role
   */
  static async assertAriaRole(locator: Locator, role: string): Promise<void> {
    const ariaRole = await locator.getAttribute('role');
    expect(ariaRole).toBe(role);
  }

  /**
   * Assert element is not in tab order (tabindex=-1)
   */
  static async assertNotInTabOrder(locator: Locator): Promise<void> {
    const tabIndex = await locator.getAttribute('tabindex');
    expect(tabIndex).toBe('-1');
  }

  /**
   * Assert element is announced to screen readers
   */
  static async assertScreenReaderText(locator: Locator): Promise<void> {
    const ariaLabel = await locator.getAttribute('aria-label');
    const ariaLabelledBy = await locator.getAttribute('aria-labelledby');
    const textContent = await locator.textContent();

    const hasAccessibleText =
      ariaLabel || ariaLabelledBy || (textContent && textContent.trim().length > 0);
    expect(hasAccessibleText).toBeTruthy();
  }
}
