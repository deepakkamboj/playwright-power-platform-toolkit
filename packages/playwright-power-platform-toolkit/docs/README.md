# Playwright Power Platform Toolkit Documentation

Complete documentation for testing Power Platform applications with Playwright.

## 📚 Table of Contents

### Getting Started

1. [Getting Started](./tutorials/01-getting-started.md) - Installation, setup, and your first test
2. [Architecture Overview](./ARCHITECTURE.md) - Understand the toolkit's design and patterns

### Testing Guides

3. [Testing Canvas Apps](./tutorials/02-canvas-apps.md) - Canvas App testing patterns and examples
4. [Testing Model-Driven Apps](./tutorials/03-model-driven-apps.md) - Model-Driven App testing with GridComponent and FormComponent
5. [Authentication](./tutorials/04-authentication.md) - Authentication setup with playwright-ms-auth
6. [Advanced Usage](./tutorials/05-advanced-usage.md) - Custom page objects, fixtures, and best practices

### Specialized Topics

7. [FormContext API Tutorial](./tutorials/FORMCONTEXT.md) - Deep dive into Dynamics 365 FormContext API
8. [Authentication Deep Dive](./tutorials/AUTHENTICATION.md) - Advanced authentication scenarios

## 🚀 Quick Start

### Installation

```bash
npm install playwright-power-platform-toolkit playwright-ms-auth
npm install -D @playwright/test
```

### Basic Usage

```typescript
import { test, expect } from '@playwright/test';
import {
  AppProvider,
  AppType,
  AppLaunchMode,
  CanvasAppPage,
} from 'playwright-power-platform-toolkit';

test('canvas app test', async ({ page, context }) => {
  const appProvider = new AppProvider(page, context);

  await appProvider.launch({
    app: 'My Canvas App',
    type: AppType.Canvas,
    mode: AppLaunchMode.Play,
    skipMakerPortal: true,
    directUrl: process.env.CANVAS_APP_URL,
  });

  const canvasApp = appProvider.getCanvasAppPage();

  const orderInput = canvasApp.getControl({ dataTestId: 'txtOrderNumber' });
  await orderInput.fill('ORD-12345');
});
```

## 📖 Documentation Structure

### Tutorials (Step-by-Step Guides)

Located in [`./tutorials/`](./tutorials/)

- **01-getting-started.md**: Installation, environment setup, first tests
- **02-canvas-apps.md**: Canvas App control interactions, galleries, screens
- **03-model-driven-apps.md**: Grid operations, form operations, CRUD examples
- **04-authentication.md**: Authentication setup, token management
- **05-advanced-usage.md**: Custom page objects, fixtures, test data, CI/CD

### Architecture Documentation

Located in [`./ARCHITECTURE.md`](./ARCHITECTURE.md)

- Core components and design patterns
- Component architecture (GridComponent, FormComponent)
- Authentication flow
- Performance considerations
- Future extensions

### API Documentation

Auto-generated API documentation (when available):

```bash
cd packages/playwright-power-platform-toolkit
npm run docs        # Generate API docs
npm run docs:serve  # Serve documentation locally
```

## 🎯 Core Concepts

### AppProvider Pattern (Mandatory Entry Point)

**AppProvider is the ONLY entry point for all Power Platform testing.** Never directly instantiate page objects.

✅ **CORRECT:**

```typescript
const appProvider = new AppProvider(page, context);
await appProvider.launch({...});
const app = appProvider.getCanvasAppPage();
```

❌ **INCORRECT:**

```typescript
// NEVER do this
const app = new CanvasAppPage(page);
```

### Component-Based Architecture

Model-Driven Apps use reusable components for common UI patterns:

#### GridComponent

```typescript
// Access via ModelDrivenAppPage
const grid = modelDrivenApp.grid;

// Grid operations
await grid.openRecord({ rowNumber: 0 });
const cellValue = await grid.getCellValue(0, 'Order Number');
await grid.selectRows([0, 1, 2]);
await grid.sortByColumn('Order Date', 'desc');
```

#### FormComponent

```typescript
// Access via ModelDrivenAppPage
const form = modelDrivenApp.form;

// Form operations
await form.setAttribute('name', 'Contoso Ltd');
await form.save();
const isDirty = await form.isDirty();
await form.showNotification('Saved', 'success', 'save-msg');
```

### Direct URL Launch (Recommended)

For fastest test execution, use direct URLs:

```typescript
await appProvider.launch({
  app: 'My App',
  type: AppType.Canvas,
  mode: AppLaunchMode.Play,
  skipMakerPortal: true, // Skip maker portal navigation
  directUrl: process.env.APP_URL, // Direct URL is fastest
});
```

## 📦 Package Structure

```
playwright-power-platform-toolkit/
├── src/
│   ├── core/                    # Core infrastructure
│   │   ├── app-provider.ts     # AppProvider entry point
│   │   ├── url-builder.ts      # URL building utilities
│   │   └── page-waiters/       # Page load handling
│   ├── pages/                   # Page Object Models
│   │   ├── canvas-app.page.ts
│   │   └── model-driven-app.page.ts
│   ├── components/              # Reusable UI components
│   │   └── model-driven/
│   │       ├── grid.component.ts
│   │       ├── form.component.ts
│   │       └── form-context.ts
│   ├── locators/                # Locator strategies
│   │   ├── canvas-app.locators.ts
│   │   └── model-driven-app.locators.ts
│   ├── utils/                   # Utility functions
│   │   ├── config.ts           # Configuration helpers
│   │   ├── auth-helpers.ts     # Authentication utilities
│   │   ├── app-helpers.ts      # Test data generation
│   │   └── locator-helpers.ts  # Fallback locators
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   └── index.ts                 # Main entry point
├── docs/                        # Documentation
│   ├── tutorials/               # Step-by-step guides
│   ├── ARCHITECTURE.md          # Architecture overview
│   └── README.md                # This file
└── package.json
```

## 🎓 Learning Path

### Beginner

1. Read [Getting Started](./tutorials/01-getting-started.md)
2. Set up authentication (see [Authentication](./tutorials/04-authentication.md))
3. Try Canvas App examples (see [Canvas Apps](./tutorials/02-canvas-apps.md))
4. Try Model-Driven App examples (see [Model-Driven Apps](./tutorials/03-model-driven-apps.md))

### Intermediate

1. Understand [Architecture](./ARCHITECTURE.md)
2. Create custom page objects (see [Advanced Usage](./tutorials/05-advanced-usage.md))
3. Use GridComponent and FormComponent effectively
4. Set up test fixtures and data factories

### Advanced

1. Implement CI/CD integration
2. Create custom components
3. Optimize test performance
4. Use FormContext API for complex scenarios (see [FormContext](./tutorials/FORMCONTEXT.md))

## 🔧 Common Use Cases

### Canvas App Testing

```typescript
test('create order in canvas app', async ({ page, context }) => {
  const appProvider = new AppProvider(page, context);
  await appProvider.launch({
    app: 'Orders Canvas',
    type: AppType.Canvas,
    mode: AppLaunchMode.Play,
    skipMakerPortal: true,
    directUrl: process.env.CANVAS_APP_URL,
  });

  const canvasApp = appProvider.getCanvasAppPage();

  // Fill order form
  await canvasApp.getControl({ dataTestId: 'txtOrderNumber' }).fill('ORD-12345');
  await canvasApp.getControl({ dataTestId: 'txtCustomer' }).fill('Contoso Ltd');
  await canvasApp.getControl({ dataTestId: 'btnSubmit' }).click();

  // Verify success
  const statusLabel = canvasApp.getControl({ dataTestId: 'lblStatus' });
  await expect(statusLabel).toContainText('Order Created');
});
```

### Model-Driven App Grid Operations

```typescript
test('work with grid', async ({ page, context }) => {
  const appProvider = new AppProvider(page, context);
  await appProvider.launch({
    app: 'Orders App',
    type: AppType.ModelDriven,
    mode: AppLaunchMode.Play,
    skipMakerPortal: true,
    directUrl: process.env.MODEL_DRIVEN_APP_URL,
  });

  const modelDrivenApp = appProvider.getModelDrivenAppPage();

  // Wait for grid
  await modelDrivenApp.grid.waitForGridLoad();

  // Get data from grid
  const orderNumber = await modelDrivenApp.grid.getCellValue(0, 'Order Number');
  console.log('Order Number:', orderNumber);

  // Open record
  await modelDrivenApp.grid.openRecord({ rowNumber: 0 });
});
```

### Model-Driven App Form Operations

```typescript
test('update order', async ({ page, context }) => {
  const appProvider = new AppProvider(page, context);
  await appProvider.launch({
    app: 'Orders App',
    type: AppType.ModelDriven,
    mode: AppLaunchMode.Play,
    skipMakerPortal: true,
    directUrl: process.env.MODEL_DRIVEN_APP_URL,
  });

  const modelDrivenApp = appProvider.getModelDrivenAppPage();

  // Open record
  await modelDrivenApp.grid.waitForGridLoad();
  await modelDrivenApp.grid.openRecord({ rowNumber: 0 });
  await page.waitForTimeout(3000);

  // Update using FormComponent
  await modelDrivenApp.form.setAttribute('nwind_quantity', 25);
  await modelDrivenApp.form.save();

  // Verify
  const quantity = await modelDrivenApp.form.getAttribute('nwind_quantity');
  expect(quantity).toBe(25);
});
```

## 🛠️ Utilities Available

### Test Data Generation

```typescript
import {
  generateUniqueOrderNumber,
  generateUniqueTestId,
  generateRandomAlphaNumeric,
} from 'playwright-power-platform-toolkit';

const orderNumber = generateUniqueOrderNumber(); // ORD-12345
const testId = generateUniqueTestId('USER'); // USER-ABC123
const random = generateRandomAlphaNumeric(8); // X7K9M2P4
```

### URL Building

```typescript
import { buildCanvasAppUrl, buildCanvasAppUrlFromEnv } from 'playwright-power-platform-toolkit';

// From environment variables
const url = buildCanvasAppUrlFromEnv();

// From specific values
const url = buildCanvasAppUrl({
  environmentId: 'env-id',
  appId: 'app-id',
  tenantId: 'tenant-id',
});
```

### Configuration Helpers

```typescript
import { ConfigHelper } from 'playwright-power-platform-toolkit';

// Get auth token
const token = ConfigHelper.getAuthToken();

// Check token expiration
const check = ConfigHelper.checkStorageStateExpiration();
if (check.expired) {
  console.log('Token expired, please re-authenticate');
}

// Get environment configuration
const envId = ConfigHelper.getEnvironmentId();
const tenantId = ConfigHelper.getTenantId();
```

## 📝 Best Practices

### 1. Always Use AppProvider

```typescript
// ✅ CORRECT
const appProvider = new AppProvider(page, context);
await appProvider.launch({...});

// ❌ INCORRECT
const app = new CanvasAppPage(page);
```

### 2. Use Direct URL Launch

```typescript
// ✅ CORRECT - Fast
await appProvider.launch({
  skipMakerPortal: true,
  directUrl: process.env.APP_URL,
});

// ❌ INCORRECT - Slow
await appProvider.launch({
  skipMakerPortal: false,
  app: 'My App',
  baseUrl: 'https://make.powerapps.com',
});
```

### 3. Use Components for Model-Driven Apps

```typescript
// ✅ CORRECT - Use GridComponent
await modelDrivenApp.grid.openRecord({ rowNumber: 0 });

// ✅ CORRECT - Use FormComponent
await modelDrivenApp.form.setAttribute('name', 'Value');
await modelDrivenApp.form.save();
```

### 4. Generate Unique Test Data

```typescript
// ✅ CORRECT
const orderNumber = generateUniqueOrderNumber();
await input.fill(orderNumber);

// ❌ INCORRECT - Can cause collisions
await input.fill('TEST-123');
```

### 5. Wait Appropriately

```typescript
// ✅ CORRECT - Wait for specific condition
await modelDrivenApp.grid.waitForGridLoad();

// ❌ INCORRECT - Fixed timeout
await page.waitForTimeout(5000);
```

## 🐛 Troubleshooting

### Common Issues

1. **App not loading**: Check authentication, direct URL, timeouts
2. **Controls not found**: Verify data-test-id, wait for app load
3. **Token expired**: Re-run authentication script
4. **Grid operations fail**: Wait for grid load first
5. **Form operations fail**: Wait after opening record

See individual tutorial pages for detailed troubleshooting sections.

## 🔗 Related Resources

- [Playwright Documentation](https://playwright.dev/)
- [playwright-ms-auth](https://github.com/microsoft/playwright-ms-auth) - Microsoft authentication
- [Power Platform Documentation](https://docs.microsoft.com/power-platform/)
- [Dynamics 365 Xrm Client API](https://docs.microsoft.com/dynamics365/customerengagement/on-premises/developer/clientapi/reference) - FormContext API reference

## 🤝 Contributing

See the main project README for contribution guidelines.

## 📄 License

See the main project LICENSE file.

## 📧 Support

For issues and questions:

- GitHub Issues: [Create an issue](https://github.com/YOUR_REPO/issues)
- Email: deepakkamboj@gmail.com

---

**Version**: 0.0.4
**Last Updated**: February 2026
**Maintained by**: Deepak Kamboj
