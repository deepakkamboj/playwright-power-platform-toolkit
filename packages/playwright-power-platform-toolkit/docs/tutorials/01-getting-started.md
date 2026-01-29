# Getting Started with Playwright Power Platform Toolkit

This guide will walk you through setting up and writing your first test for a Power Platform application.

## Installation

First, install the toolkit in your project:

```bash
npm install playwright-power-platform-toolkit
npm install -D @playwright/test
```

## Project Setup

Create a Playwright configuration file `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
  },
});
```

## Environment Variables

Create a `.env` file in your project root:

```env
# Power Platform App URLs
CANVAS_APP_URL=https://apps.powerapps.com/play/...
MODEL_DRIVEN_APP_URL=https://yourorg.crm.dynamics.com/...

# Authentication (if needed)
POWER_PLATFORM_USERNAME=your.email@domain.com
POWER_PLATFORM_PASSWORD=your-password
```

## Writing Your First Test

### Canvas App Test

Create a test file `tests/canvas-app.test.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { AppProvider } from 'playwright-power-platform-toolkit';

test.describe('Canvas App Tests', () => {
  test('should launch and interact with canvas app', async ({ page }) => {
    // Create an app provider instance
    const appProvider = new AppProvider(page);

    // Launch the canvas app
    const canvasApp = await appProvider.launchApp({
      appUrl: process.env.CANVAS_APP_URL!,
      appType: 'canvas',
    });

    // Wait for the app to load
    await canvasApp.waitForAppToLoad();

    // Interact with canvas controls
    await canvasApp.clickControl('ButtonSubmit');
    await canvasApp.fillTextInput('TextInputName', 'John Doe');

    // Verify results
    const labelText = await canvasApp.getControlText('LabelWelcome');
    expect(labelText).toContain('Welcome, John Doe');
  });
});
```

### Model-Driven App Test

Create a test file `tests/model-driven-app.test.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { AppProvider } from 'playwright-power-platform-toolkit';

test.describe('Model-Driven App Tests', () => {
  test('should navigate and create a record', async ({ page }) => {
    // Create an app provider instance
    const appProvider = new AppProvider(page);

    // Launch the model-driven app
    const modelDrivenApp = await appProvider.launchApp({
      appUrl: process.env.MODEL_DRIVEN_APP_URL!,
      appType: 'model-driven',
    });

    // Navigate to an entity
    await modelDrivenApp.navigateToEntity('Accounts');

    // Create a new record
    await modelDrivenApp.clickNewButton();
    await modelDrivenApp.fillFormField('name', 'Contoso Ltd');
    await modelDrivenApp.saveRecord();

    // Verify the record was created
    const accountName = await modelDrivenApp.getFieldValue('name');
    expect(accountName).toBe('Contoso Ltd');
  });
});
```

## Running Tests

Run your tests using Playwright:

```bash
# Run all tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/canvas-app.test.ts

# Run with UI mode
npx playwright test --ui
```

## Understanding the Architecture

The toolkit uses three main patterns:

1. **AppProvider**: Factory for creating app-specific page objects
2. **Page Objects**: Specialized classes for Canvas and Model-Driven apps
3. **Locators**: Reusable locator strategies for Power Platform controls

```typescript
// The AppProvider creates the appropriate page object
const appProvider = new AppProvider(page);

// Returns either CanvasAppPage or ModelDrivenAppPage
const app = await appProvider.launchApp({...});

// Each page object has app-specific methods
await app.waitForAppToLoad();
```

## Next Steps

- [Testing Canvas Apps](./02-canvas-apps.md) - Deep dive into Canvas App testing
- [Testing Model-Driven Apps](./03-model-driven-apps.md) - Deep dive into Model-Driven App testing
- [Authentication](./04-authentication.md) - Setting up authentication
- [Advanced Usage](./05-advanced-usage.md) - Advanced patterns and techniques

## Troubleshooting

### App Not Loading

If your app doesn't load, check:

- The app URL is correct and accessible
- Authentication is properly configured
- Timeouts are sufficient (Power Apps can be slow to load)

### Control Not Found

If controls aren't found:

- Verify the control name matches exactly (case-sensitive)
- Wait for the app to fully load before interacting
- Use browser DevTools to inspect the control selectors

### Authentication Issues

For authentication problems:

- Ensure credentials are correct in `.env`
- Check if MFA is required (may need manual intervention)
- Verify your account has access to the app
