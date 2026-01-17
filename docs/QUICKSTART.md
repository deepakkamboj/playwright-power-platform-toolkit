# Quick Start Guide

> **Navigation:** [📚 Docs Home](README.md) | [🧪 API & A11y Guide](API-ACCESSIBILITY-GUIDE.md) | [📖 Quick Reference](QUICK-REFERENCE.md) | [🏠 Main README](../README.md)

Get up and running with the Playwright Power Apps Testing Library in minutes!

## Prerequisites

- Node.js 18 or higher
- Power Apps account with appropriate permissions
- Microsoft Azure credentials (for authentication)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:

- `@playwright/test` - Playwright testing framework
- `playwright-ms-auth` - Microsoft authentication
- `playwright-ai-reporter` - AI-powered test reporting
- `dotenv` - Environment variable management
- TypeScript and related tools

### 2. Configure Environment

Create a `.env` file in the project root:

```env
MS_AUTH_EMAIL=your-email@company.com
MS_USER_PASSWORD=your-password
POWER_APPS_BASE_URL=https://make.powerapps.com
AZURE_TENANT_ID=your-tenant-id
POWER_APPS_ENVIRONMENT_ID=your-environment-id
```

### 3. Authenticate

```bash
# Run authentication (headless)
npm run auth

# Or with visible browser
npm run auth:headful
```

This saves your authentication state for future test runs.

## Running Tests

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# Run only library validation tests
npm run test:validation

# View test report
npm run report
```

## Building the Library

```bash
# Compile TypeScript to JavaScript
npm run build

# Build and watch for changes
npm run build:watch

# Clean build artifacts
npm run clean
```

## Writing Your First Test

Create a new test file `tests/my-first-test.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { PowerAppsPage, PowerAppsPageSelectors } from '../src';

test('Navigate to Power Apps', async ({ page }) => {
  const PowerAppsPage = new PowerAppsPage(page);

  // Navigate to home page
  await PowerAppsPage.navigateToHome();

  // Verify page loaded
  await expect(page.locator(PowerAppsPageSelectors.Root)).toBeVisible();
  await expect(PowerAppsPage.locators.pageHeader).toBeVisible();
});

test('Check apps page', async ({ page }) => {
  const PowerAppsPage = new PowerAppsPage(page);

  // Navigate to apps
  await PowerAppsPage.navigateToApps();

  // Verify apps page elements
  await expect(PowerAppsPage.locators.newAppButton).toBeVisible();
  await expect(PowerAppsPage.locators.appListGrid).toBeVisible();
});
```

Run your test:

```bash
npx playwright test my-first-test.spec.ts
```

## Using the Library

### Approach 1: Using Constant Selectors (Recommended)

```typescript
import { PowerAppsPageSelectors } from '../src';

test('Use selectors', async ({ page }) => {
  await page.goto('https://make.powerapps.com');

  // Use constant selectors
  await page.locator(PowerAppsPageSelectors.Root).waitFor();
  await page.locator(PowerAppsPageSelectors.AppsPage.NewApp).click();
});
```

### Approach 2: Using Locator Helper

```typescript
import { PowerAppsPage } from '../src';

test('Use locator helper', async ({ page }) => {
  const PowerAppsPage = new PowerAppsPage(page);
  await PowerAppsPage.navigateToHome();

  // Use locator helper
  await PowerAppsPage.locators.newAppButton.click();
  await expect(PowerAppsPage.locators.commandBar).toBeVisible();
});
```

### Approach 3: Using Page Object Methods

```typescript
import { PowerAppsPage, AppType } from '../src';

test('Use page object methods', async ({ page }) => {
  const PowerAppsPage = new PowerAppsPage(page);

  // High-level actions
  await PowerAppsPage.navigateToApps();
  const appName = await PowerAppsPage.createApp(AppType.Canvas);
  await PowerAppsPage.deleteApp(AppType.Canvas, appName);
});
```

## Project Structure Overview

```
playwright-power-platform-demo/
├── src/                          # Library source code
│   ├── pages/                    # Page Object Models
│   │   └── PowerAppsPage.ts
│   ├── locators/                 # Selector management
│   │   ├── BaseLocators.ts
│   │   └── PowerAppsPageLocators.ts  # Exports PowerAppsPageSelectors
│   ├── auth/                     # Authentication
│   │   └── MsAuthHelper.ts
│   ├── utils/                    # Utilities
│   │   ├── CommonUtils.ts
│   │   └── ConfigHelper.ts
│   └── index.ts                  # Public API
├── tests/                        # Your tests
│   ├── lib-validation/           # Library validation tests
│   └── example.spec.ts           # Your test files
├── scripts/                      # Utility scripts
│   └── authenticate.ts
├── .env                          # Your environment config
├── .env.example                  # Environment template
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # NPM package config
```

## Available Selectors

All selectors are organized in `PowerAppsPageSelectors`:

```typescript
// Root elements
PowerAppsPageSelectors.Root;
PowerAppsPageSelectors.PageHeader;

// Apps page
PowerAppsPageSelectors.AppsPage.MainContainer;
PowerAppsPageSelectors.AppsPage.NewApp;
PowerAppsPageSelectors.AppsPage.CommandBar;
PowerAppsPageSelectors.AppsPage.AppListsGridContainer;

// Solutions page
PowerAppsPageSelectors.SolutionsPage.SideBar;
PowerAppsPageSelectors.SolutionsPage.SearchTextBox;
PowerAppsPageSelectors.SolutionsPage.SolutionsListContainer;

// App preview
PowerAppsPageSelectors.AppPreviewPage.SaveButton;
PowerAppsPageSelectors.AppPreviewPage.PublishButton;
PowerAppsPageSelectors.AppPreviewPage.PlayButton;

// Teaching bubbles
PowerAppsPageSelectors.TeachingBubble;
PowerAppsPageSelectors.TeachingBubbleCloseButton;

// And many more...
```

## Helper Utilities

```typescript
import {
  Timeouts,
  waitForCondition,
  randomAlphaNumeric,
  formatString,
  safeFill,
  dismissTeachingBubbleIfPresent,
} from '../src';

// Use timeouts
await page.waitForSelector(selector, { timeout: Timeouts.TwoMinutes });

// Wait for custom conditions
await waitForCondition(
  async () => await element.isVisible(),
  'Element should be visible',
  Timeouts.OneMinute
);

// Generate random strings
const testName = `Test-${randomAlphaNumeric(10)}`;

// Format selector strings
const selector = formatString('[data-id="{0}"]', userId);

// Safe fill (clears first)
await safeFill(page.locator('input'), 'value');

// Dismiss teaching bubbles
await dismissTeachingBubbleIfPresent(page);
```

## Next Steps

- 📖 **[API & Accessibility Testing](API-ACCESSIBILITY-GUIDE.md)** - Learn about advanced testing features
- 📚 **[Quick Reference](QUICK-REFERENCE.md)** - Common patterns and code snippets
- 🏠 **[Main README](../README.md)** - Complete documentation and API reference
- 🧪 **[Example Tests](../tests/)** - Explore more test examples

## Troubleshooting

**Authentication Issues:**

```bash
# Check authentication status
npm run auth:check

# Clear auth state and try again
npm run clean:results
npm run auth:headful
```

**Build Issues:**

```bash
# Clean and rebuild
npm run clean
npm run build
```

**Test Failures:**

```bash
# Run with debug mode
npx playwright test --debug

# Run with trace and report
npx playwright test --trace on
npm run report
```

## Additional Resources

- 📚 [Documentation Index](README.md) - All documentation
- 🌐 [Playwright Documentation](https://playwright.dev)
- 🔌 [Power Apps Documentation](https://docs.microsoft.com/power-apps)
- 🔐 [playwright-ms-auth](https://github.com/deepakkamboj/playwright-ms-auth) - Authentication package
- 🤖 [playwright-ai-reporter](https://github.com/deepakkamboj/playwright-ai-reporter) - AI-powered reporting

---

> **Next:** Check out the [API & Accessibility Testing Guide](API-ACCESSIBILITY-GUIDE.md) to learn about advanced features! 🚀
