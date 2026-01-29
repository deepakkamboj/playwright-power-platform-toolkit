"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLogger = void 0;
const colors_1 = require("./colors");
class TestLogger {
    /**
     * Internal logging method with level-based coloring
     */
    static _log(level, message) {
        if (level === 'error') {
            console.log(`${colors_1.colors.fgRed}${message}${colors_1.colors.reset}`);
        }
        else {
            console.log(`${colors_1.colors.fgGray}${message}${colors_1.colors.reset}`);
        }
    }
    /**
     * Log informational message in gray color
     */
    static info(message) {
        this._log('debug', `ℹ ${message}`);
    }
    /**
     * Log debug message in gray color
     */
    static debug(message) {
        this._log('debug', `${message}`);
    }
    /**
     * Log test step in gray with step indicator
     */
    static step(stepNumber, message) {
        this._log('debug', `  ${stepNumber}. ${message}`);
    }
    /**
     * Log success message in gray
     */
    static success(message) {
        this._log('debug', `✓ ${message}`);
    }
    /**
     * Log warning message in gray
     */
    static warning(message) {
        this._log('debug', `⚠ ${message}`);
    }
    /**
     * Log error message in red
     */
    static error(message, error) {
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
    static log(message) {
        this._log('debug', message);
    }
    /**
     * Log a test section header
     */
    static section(title) {
        this._log('debug', `\n${'='.repeat(50)}`);
        this._log('debug', title);
        this._log('debug', `${'='.repeat(50)}\n`);
    }
    /**
     * Log data in a formatted way
     */
    static data(label, value) {
        const formattedValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
        this._log('debug', `${label}: ${formattedValue}`);
    }
    /**
     * Log timing information
     */
    static timing(label, milliseconds) {
        const seconds = (milliseconds / 1000).toFixed(2);
        this._log('debug', `⏱ ${label}: ${seconds}s`);
    }
}
exports.TestLogger = TestLogger;
