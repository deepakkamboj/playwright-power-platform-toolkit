# Model-Driven App - Direct URL Navigation Tests

This document explains how to use the `baseAppUrl` property to directly navigate to Model-Driven App views without going through the Power Apps home page.

## Overview

The `model-driven-direct-url.test.ts` demonstrates the new direct URL navigation feature that allows you to:

- Open Model-Driven apps directly from a URL
- Navigate between grid and form views programmatically
- Skip the Power Apps home page navigation
- Test specific entities and views directly

## Benefits

✅ **Faster Test Execution** - Skip home page navigation
✅ **More Reliable** - Direct URL navigation is more stable
✅ **Better Isolation** - Each test can start from a known state
✅ **Flexible** - Support for multiple entities and views
✅ **Maintainable** - Centralized URL management

## Setup

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and set the Model-Driven App URL:

```bash
# .env
MODEL_DRIVEN_APP_URL=https://your-org.crm.dynamics.com/main.aspx?appid=your-app-id
```

**How to get your Model-Driven App URL:**

1. Open your Model-Driven app in the browser
2. Copy the URL from the address bar
3. Make sure it includes the `appid` parameter
4. Example: `https://contoso.crm.dynamics.com/main.aspx?appid=abc-123-def-456`

### 2. Set Authentication

Ensure your authentication credentials are configured in `.env`:

```bash
MS_AUTH_EMAIL=your-email@domain.com
MS_USER_PASSWORD=your-password
```

## Usage Patterns

### Pattern 1: Set Base URL in Constructor

```typescript
const modelDrivenApp = new ModelDrivenAppPage(page, BASE_APP_URL);

// Navigate to grid view
await modelDrivenApp.navigateToGridView('nwind_order');

// Navigate to form view
await modelDrivenApp.navigateToFormView('nwind_order');
```

### Pattern 2: Set Base URL Dynamically

```typescript
const modelDrivenApp = new ModelDrivenAppPage(page);
modelDrivenApp.setBaseAppUrl(BASE_APP_URL);

// Now use navigation methods
await modelDrivenApp.navigateToGridView('account');
```

### Pattern 3: Auto-Detect from Current Page

```typescript
// Navigate to app first
await page.goto('https://org.crm.dynamics.com/main.aspx?appid=123');

// Create page object - it will auto-detect the base URL
const modelDrivenApp = new ModelDrivenAppPage(page);

// Use navigation methods
await modelDrivenApp.navigateToGridView('contact');
```

## Test Examples

### Navigate to Grid View

```typescript
test('should open grid view directly', async ({ page }) => {
  const appProvider = new AppProvider(page);
  await appProvider.authenticate();

  const modelDrivenApp = new ModelDrivenAppPage(page, MODEL_DRIVEN_APP_URL);

  // Navigate directly to Orders grid
  await modelDrivenApp.navigateToGridView('nwind_order');

  // Perform grid operations
  await modelDrivenApp.grid.waitForGridLoad();
  const rowCount = await modelDrivenApp.grid.getRowCount();
  console.log(`Grid has ${rowCount} records`);
});
```

### Navigate to Form View

```typescript
test('should open form view directly', async ({ page }) => {
  const appProvider = new AppProvider(page);
  await appProvider.authenticate();

  const modelDrivenApp = new ModelDrivenAppPage(page, MODEL_DRIVEN_APP_URL);

  // Navigate to new record form
  await modelDrivenApp.navigateToFormView('nwind_order');

  // Fill out form fields...
});
```

### Open Record from Grid

```typescript
test('should navigate grid to form', async ({ page }) => {
  const appProvider = new AppProvider(page);
  await appProvider.authenticate();

  const modelDrivenApp = new ModelDrivenAppPage(page, MODEL_DRIVEN_APP_URL);

  // Navigate to grid
  await modelDrivenApp.navigateToGridView('nwind_order');
  await modelDrivenApp.grid.waitForGridLoad();

  // Open first record
  await modelDrivenApp.grid.openRecord({ rowNumber: 0 });

  // Now on form page - perform operations...
});
```

## Navigation Methods

### `navigateToGridView(entityName, options?)`

Navigate to a grid/list view for a specific entity.

**Parameters:**

- `entityName` (string) - Logical name of the entity (e.g., 'account', 'nwind_order')
- `options` (optional):
  - `appId` (string) - Override app ID (extracted from base URL if not provided)
  - `viewId` (string) - Specific view ID to load

**Examples:**

```typescript
// Navigate to default view
await modelDrivenApp.navigateToGridView('account');

// Navigate to specific view
await modelDrivenApp.navigateToGridView('account', {
  viewId: 'view-guid-here',
});

// Override app ID
await modelDrivenApp.navigateToGridView('contact', {
  appId: 'different-app-id',
});
```

### `navigateToFormView(entityName, options?)`

Navigate to a form view for a specific entity.

**Parameters:**

- `entityName` (string) - Logical name of the entity
- `options` (optional):
  - `recordId` (string) - Record ID for editing existing record (omit for new record)
  - `appId` (string) - Override app ID
  - `formId` (string) - Specific form ID to load

**Examples:**

```typescript
// Create new record
await modelDrivenApp.navigateToFormView('account');

// Edit existing record
await modelDrivenApp.navigateToFormView('account', {
  recordId: 'record-guid-here',
});

// Use specific form
await modelDrivenApp.navigateToFormView('contact', {
  formId: 'form-guid-here',
});
```

## Running the Tests

### Run all direct URL tests:

```bash
cd packages/e2e-tests
npm test -- model-driven-direct-url.test.ts
```

### Run a specific test:

```bash
npm test -- model-driven-direct-url.test.ts -g "should navigate directly to grid view"
```

### Run in headed mode (see the browser):

```bash
npm test -- model-driven-direct-url.test.ts --headed
```

## URL Structure

The navigation methods construct URLs with the following structure:

### Grid View URL

```
https://org.crm.dynamics.com/main.aspx
  ?pagetype=entitylist
  &etn=<entityName>
  &appid=<appId>
  &viewid=<viewId>     (optional)
```

### Form View URL

```
https://org.crm.dynamics.com/main.aspx
  ?pagetype=entityrecord
  &etn=<entityName>
  &appid=<appId>
  &id=<recordId>       (optional - for edit)
  &formid=<formId>     (optional)
```

## Troubleshooting

### Error: MODEL_DRIVEN_APP_URL environment variable is not set

**Solution:** Set the environment variable in your `.env` file:

```bash
MODEL_DRIVEN_APP_URL=https://your-org.crm.dynamics.com/main.aspx?appid=your-app-id
```

### Error: Grid/Form not loading

**Solution:**

1. Verify the base URL is correct
2. Ensure the entity name is correct (use logical name, not display name)
3. Check that you have permissions to access the entity
4. Try navigating manually in browser first to verify the URL works

### Error: Authentication failed

**Solution:**

1. Verify `MS_AUTH_EMAIL` and `MS_USER_PASSWORD` are set correctly
2. Check that your account has access to the Dynamics 365 environment
3. Ensure MFA is configured correctly if using certificate authentication

## Best Practices

1. **Store Base URL in Environment Variable** - Don't hardcode URLs in tests
2. **Use Entity Logical Names** - Always use logical names (e.g., 'account'), not display names (e.g., 'Accounts')
3. **Wait for Load** - Always call `grid.waitForGridLoad()` after navigating to grid view
4. **Check Entity Exists** - Verify the entity and view exist in your environment before testing
5. **Reuse Page Object** - Create one `ModelDrivenAppPage` instance per test and reuse it for multiple navigations

## Related Documentation

- [Model-Driven App Component Guide](../../../playwright-power-platform-toolkit/docs/tutorials/model-driven-components.md)
- [GridComponent API](../../../playwright-power-platform-toolkit/docs/api/classes/GridComponent.md)
- [ModelDrivenAppPage API](../../../playwright-power-platform-toolkit/docs/api/classes/ModelDrivenAppPage.md)

## Questions?

If you encounter issues or have questions, please check:

- Project README: `../../README.md`
- Toolkit Documentation: `../../../playwright-power-platform-toolkit/docs/`
- GitHub Issues: [playwright-power-platform-toolkit/issues](https://github.com/deepakkamboj/playwright-power-platform-toolkit/issues)
