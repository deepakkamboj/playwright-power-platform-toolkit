/**
 * TestLogger.ts
 *
 * A lightweight logging utility for test cases that provides colored console output.
 * Designed to log test execution information in a clean, readable format with gray color.
 *
 * Purpose:
 * - Provide consistent logging across all test cases
 * - Use subtle gray color for test logs to avoid clutter
 * - Support multiple log levels (info, debug, step, success, warning, error)
 *
 * Usage:
 * ```typescript
 * import { TestLogger } from '../src';
 *
 * test('My test', async ({ page }) => {
 *   TestLogger.info('Starting test execution');
 *   TestLogger.step('Navigating to page');
 *   TestLogger.success('Test completed successfully');
 * });
 * ```
 */

import { colors } from './colors';

export class TestLogger {
  /**
   * Internal logging method with level-based coloring
   */
  private static _log(level: 'debug' | 'error', message: string): void {
    if (level === 'error') {
      console.log(`${colors.fgRed}${message}${colors.reset}`);
    } else {
      console.log(`${colors.fgGray}${message}${colors.reset}`);
    }
  }

  /**
   * Log informational message in gray color
   */
  static info(message: string): void {
    this._log('debug', `ℹ ${message}`);
  }

  /**
   * Log debug message in gray color
   */
  static debug(message: string): void {
    this._log('debug', `${message}`);
  }

  /**
   * Log test step in gray with step indicator
   */
  static step(stepNumber: number, message: string): void {
    this._log('debug', `  ${stepNumber}. ${message}`);
  }

  /**
   * Log success message in gray
   */
  static success(message: string): void {
    this._log('debug', `✓ ${message}`);
  }

  /**
   * Log warning message in gray
   */
  static warning(message: string): void {
    this._log('debug', `⚠ ${message}`);
  }

  /**
   * Log error message in red
   */
  static error(message: string, error?: Error): void {
    this._log('error', `✗ ${message}`);
    if (error) {
      this._log('error', `  ${error.message}`);
      if (error.stack) {
        this._log('debug', error.stack);
      }
    }
  }

  /**
   * Log a simple gray message without any prefix
   */
  static log(message: string): void {
    this._log('debug', message);
  }

  /**
   * Log a test section header
   */
  static section(title: string): void {
    this._log('debug', `\n${'='.repeat(50)}`);
    this._log('debug', title);
    this._log('debug', `${'='.repeat(50)}\n`);
  }

  /**
   * Log data in a formatted way
   */
  static data(label: string, value: any): void {
    const formattedValue =
      typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
    this._log('debug', `${label}: ${formattedValue}`);
  }

  /**
   * Log timing information
   */
  static timing(label: string, milliseconds: number): void {
    const seconds = (milliseconds / 1000).toFixed(2);
    this._log('debug', `⏱ ${label}: ${seconds}s`);
  }
}
