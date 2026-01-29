/**
 * Colors.ts
 *
 * This file defines a set of ANSI color codes as constants that can be used to
 * style console log outputs in the project. These colors are used to enhance
 * the readability of terminal output by distinguishing different types of log
 * messages (e.g., info, warnings, errors, success).
 *
 * Purpose:
 * - To centralize the ANSI color codes, making it easier to maintain and
 *   update the color scheme across the project.
 * - To provide a consistent and readable way to format log messages.
 *
 * Usage:
 * - Import the `Colors` object from this file wherever colored console logs are
 *   needed.
 * - Use the defined properties in this object to apply color formatting to
 *   console.log statements.
 *
 * Example:
 * ```
 * import { Colors } from '@utils/Colors';
 *
 * console.log(`${Colors.FgGreen}[SUCCESS]${Colors.Reset} Operation completed successfully.`);
 * console.error(`${Colors.FgRed}[ERROR]${Colors.Reset} An error occurred.`);
 * ```
 */
export declare const colors: {
    reset: string;
    bright: string;
    dim: string;
    underscore: string;
    blink: string;
    reverse: string;
    hidden: string;
    fgBlack: string;
    fgRed: string;
    fgGreen: string;
    fgYellow: string;
    fgBlue: string;
    fgMagenta: string;
    fgCyan: string;
    fgWhite: string;
    bgBlack: string;
    bgRed: string;
    bgGreen: string;
    bgYellow: string;
    bgBlue: string;
    bgMagenta: string;
    bgCyan: string;
    bgWhite: string;
    fgGray: string;
    fgMagentaBright: string;
};
