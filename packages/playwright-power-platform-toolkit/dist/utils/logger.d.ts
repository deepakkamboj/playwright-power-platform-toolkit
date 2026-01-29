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
export declare class TestLogger {
    /**
     * Internal logging method with level-based coloring
     */
    private static _log;
    /**
     * Log informational message in gray color
     */
    static info(message: string): void;
    /**
     * Log debug message in gray color
     */
    static debug(message: string): void;
    /**
     * Log test step in gray with step indicator
     */
    static step(stepNumber: number, message: string): void;
    /**
     * Log success message in gray
     */
    static success(message: string): void;
    /**
     * Log warning message in gray
     */
    static warning(message: string): void;
    /**
     * Log error message in red
     */
    static error(message: string, error?: Error): void;
    /**
     * Log a simple gray message without any prefix
     */
    static log(message: string): void;
    /**
     * Log a test section header
     */
    static section(title: string): void;
    /**
     * Log data in a formatted way
     */
    static data(label: string, value: any): void;
    /**
     * Log timing information
     */
    static timing(label: string, milliseconds: number): void;
}
