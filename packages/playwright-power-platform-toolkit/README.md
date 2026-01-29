# Playwright Power Platform Toolkit

A comprehensive, TypeScript-native toolkit for automating and testing Power Platform applications (Canvas Apps, Model-Driven Apps, and Dynamics 365) using Playwright.

## Features

### Core Functionality

- 🎯 **Canvas Apps** - Complete page object model for Canvas App testing
- 🔧 **Model-Driven Apps** - Full support for Dynamics 365 and Model-Driven Apps
- 🏭 **Factory Pattern** - Smart app launcher that automatically detects app type
- 📱 **Page Objects** - Well-structured page object models with reusable locators
- 🔐 **Authentication** - Built-in Microsoft authentication support

### Testing Utilities

- ♿ **Accessibility Testing** - WCAG compliance testing with Axe integration
- 🔌 **API Testing** - Dataverse and Power Platform API helpers
- 📊 **Test Logger** - Colored console logging for better debugging
- ⚙️ **Configuration** - Environment and timeout management
- 🎨 **Locators** - Pre-built locator strategies for Power Platform controls

### Developer Experience

- 📦 **TypeScript** - Full type safety and IntelliSense support
- 📖 **Well-Documented** - Comprehensive JSDoc comments and examples
- 🧪 **Test-Ready** - Works seamlessly with Playwright Test
- 🛠️ **Modular** - Use only what you need

## Installation

```bash
npm install playwright-power-platform-toolkit @playwright/test
```

For accessibility testing, also install:

```bash
npm install -D @axe-core/playwright
```

## Quick Start

### Canvas App Testing

```typescript
import { test } from '@playwright/test';
import { AppProvider } from 'playwright-power-platform-toolkit';

test('canvas app test', async ({ page }) => {
  const appProvider = new AppProvider(page);

  // Launch Canvas App
  const canvasApp = await appProvider.launchApp({
    appUrl: 'https://apps.powerapps.com/play/...',
    appType: 'canvas',
  });

  await canvasApp.waitForAppToLoad();

  // Interact with controls
  await canvasApp.clickControl('ButtonSubmit');
  await canvasApp.fillTextInput('TextInputName', 'John Doe');

  const result = await canvasApp.getControlText('LabelResult');
  expect(result).toContain('Success');
});
```

### Model-Driven App Testing

```typescript
import { test } from '@playwright/test';
import { AppProvider } from 'playwright-power-platform-toolkit';

test('model-driven app test', async ({ page }) => {
  const appProvider = new AppProvider(page);

  // Launch Model-Driven App
  const modelApp = await appProvider.launchApp({
    appUrl: 'https://yourorg.crm.dynamics.com/...',
    appType: 'model-driven',
  });

  // Navigate and create record
  await modelApp.navigateToEntity('Accounts');
  await modelApp.clickNewButton();
  await modelApp.fillFormField('name', 'Contoso Ltd');
  await modelApp.saveRecord();
});
```

### Accessibility Testing

```typescript
import { test } from '@playwright/test';
import { AccessibilityTestHelper, WCAGLevel } from 'playwright-power-platform-toolkit';

test('accessibility test', async ({ page }) => {
  await page.goto('https://your-app.com');

  const a11y = new AccessibilityTestHelper(page);
  const results = await a11y.scanPage({ wcagLevel: WCAGLevel.AA });

  await a11y.assertNoViolations(results);
});
```

### API Testing

```typescript
import { test, request } from '@playwright/test';
import { ApiTestHelper } from 'playwright-power-platform-toolkit';

test('API test', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://yourorg.crm.dynamics.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apiHelper = new ApiTestHelper(apiContext);

  // Get Dataverse records
  const response = await apiHelper.getDataverseRecords('accounts', {
    select: ['name', 'accountid'],
    filter: "name eq 'Contoso'",
    top: 10,
  });

  await apiHelper.assertStatus(response, 200);
});
```

## Core Exports

### Page Objects

- `AppProvider` - Factory for creating app-specific page objects
- `CanvasAppPage` - Canvas App page object
- `ModelDrivenAppPage` - Model-Driven App page object
- `PowerAppsPage` - Base page for all Power Apps

### Locators

- `CanvasAppLocators` - Canvas App locator helpers
- `ModelDrivenAppLocators` - Model-Driven App locator helpers
- `BaseLocators` - Base locator utilities

### Testing Utilities

- `AccessibilityTestHelper` - Accessibility testing helper
- `ApiTestHelper` - API testing helper
- `TestLogger` - Test logging utility
- `ConfigHelper` - Configuration management
- `TimeOut` - Timeout constants

## Documentation

Visit the comprehensive documentation site at [https://your-docs-site.com](https://your-docs-site.com) (coming soon) or see the [docs package](../docs/) for:

- **Getting Started Guide** - Installation and first test
- **Canvas Apps Guide** - Complete Canvas App testing guide
- **Model-Driven Apps Guide** - Complete Model-Driven App testing guide
- **Authentication Guide** - Microsoft authentication setup
- **Advanced Usage** - Custom page objects, fixtures, CI/CD
- **API Reference** - Auto-generated from source code

### Local Documentation

```bash
# Generate API docs
cd packages/playwright-power-platform-toolkit
npm run docs

# View documentation site locally
cd packages/docs
npm run dev
# Visit http://localhost:3000
```

## Example Tests

See the [e2e-tests package](../e2e-tests/tests/) for complete examples.

## Configuration

Create a `.env` file in your project root:

```env
# App URLs
CANVAS_APP_URL=https://apps.powerapps.com/play/...
MODEL_DRIVEN_APP_URL=https://yourorg.crm.dynamics.com/...

# Authentication
MS_USERNAME=your.email@domain.com
MS_PASSWORD=your-password
AZURE_TENANT_ID=your-tenant-id

# Configuration
POWER_APPS_BASE_URL=https://make.powerapps.com
```

## TypeScript Support

This package includes full TypeScript type definitions:

```typescript
import type {
  AppMetadata,
  LaunchAppConfig,
  CanvasAppLocators,
  WCAGLevel,
} from 'playwright-power-platform-toolkit';
```

## Contributing

Contributions are welcome! Please read the [contribution guidelines](../../README.md#contribute) first.

## License

MIT © Deepak Kamboj

## Support

- **GitHub Issues**: [Report a bug](https://github.com/deepakkamboj/playwright-power-platform-toolkit/issues)
- **Email**: deepakkamboj@gmail.com
- **Documentation**: [Full docs](../../docs/)

## Related Packages

- [@playwright-power-platform/e2e-tests](../e2e-tests/) - Example tests
- [@playwright-power-platform/docs](../docs/) - Documentation site
