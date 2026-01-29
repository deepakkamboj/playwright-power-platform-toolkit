[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / colors

# Variable: colors

> `const` **colors**: `object`

Defined in: [utils/colors.ts:29](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/colors.ts#L29)

Colors.ts

This file defines a set of ANSI color codes as constants that can be used to
style console log outputs in the project. These colors are used to enhance
the readability of terminal output by distinguishing different types of log
messages (e.g., info, warnings, errors, success).

Purpose:

- To centralize the ANSI color codes, making it easier to maintain and
  update the color scheme across the project.
- To provide a consistent and readable way to format log messages.

Usage:

- Import the `Colors` object from this file wherever colored console logs are
  needed.
- Use the defined properties in this object to apply color formatting to
  console.log statements.

Example:

```
import { Colors } from '@utils/Colors';

console.log(`${Colors.FgGreen}[SUCCESS]${Colors.Reset} Operation completed successfully.`);
console.error(`${Colors.FgRed}[ERROR]${Colors.Reset} An error occurred.`);
```

## Type Declaration

### reset

> **reset**: `string` = `'\x1b[0m'`

### bright

> **bright**: `string` = `'\x1b[1m'`

### dim

> **dim**: `string` = `'\x1b[2m'`

### underscore

> **underscore**: `string` = `'\x1b[4m'`

### blink

> **blink**: `string` = `'\x1b[5m'`

### reverse

> **reverse**: `string` = `'\x1b[7m'`

### hidden

> **hidden**: `string` = `'\x1b[8m'`

### fgBlack

> **fgBlack**: `string` = `'\x1b[30m'`

### fgRed

> **fgRed**: `string` = `'\x1b[31m'`

### fgGreen

> **fgGreen**: `string` = `'\x1b[32m'`

### fgYellow

> **fgYellow**: `string` = `'\x1b[33m'`

### fgBlue

> **fgBlue**: `string` = `'\x1b[34m'`

### fgMagenta

> **fgMagenta**: `string` = `'\x1b[35m'`

### fgCyan

> **fgCyan**: `string` = `'\x1b[36m'`

### fgWhite

> **fgWhite**: `string` = `'\x1b[37m'`

### bgBlack

> **bgBlack**: `string` = `'\x1b[40m'`

### bgRed

> **bgRed**: `string` = `'\x1b[41m'`

### bgGreen

> **bgGreen**: `string` = `'\x1b[42m'`

### bgYellow

> **bgYellow**: `string` = `'\x1b[43m'`

### bgBlue

> **bgBlue**: `string` = `'\x1b[44m'`

### bgMagenta

> **bgMagenta**: `string` = `'\x1b[45m'`

### bgCyan

> **bgCyan**: `string` = `'\x1b[46m'`

### bgWhite

> **bgWhite**: `string` = `'\x1b[47m'`

### fgGray

> **fgGray**: `string` = `'\x1b[90m'`

### fgMagentaBright

> **fgMagentaBright**: `string` = `'\x1b[95m'`
