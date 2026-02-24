# Canvas App Tests - Northwind Orders

This folder contains end-to-end tests for the **Northwind Orders Canvas App** using the Playwright Power Platform Toolkit.

## 📋 Test Files

- **`canvas-app-crud.test.ts`** - CRUD operations test for Northwind Orders Canvas App
  - Load Canvas app and display orders in gallery
  - Click an order and display details
  - Test Add button functionality
  - Test Reload button
  - Verify all toolbar buttons present

## 🚀 Running Tests

### Run Canvas Tests

```bash
# Navigate to e2e-tests directory
cd packages/e2e-tests

# Run all Canvas tests
npm test -- tests/northwind/canvas/canvas-app-crud.test.ts

# Or use project filter
npm test -- --project=canvas-app
```

### Run with Headed Browser (Debug Mode)

```bash
cd packages/e2e-tests

# Run with visible browser
npm test -- tests/northwind/canvas/canvas-app-crud.test.ts -- --headed

# Run with debug mode (step through)
npm test -- tests/northwind/canvas/canvas-app-crud.test.ts -- --debug
```

### Run Specific Test

```bash
cd packages/e2e-tests

# Run single test by name
npm test -- tests/northwind/canvas/canvas-app-crud.test.ts -g "should load Canvas app"
```

## 🔐 Authentication

Authentication is handled automatically by the test fixtures. The auth state is saved to `packages/e2e-tests/.auth/user.json` and reused across tests.

### Pre-authenticate (Optional)

If you want to authenticate separately before running tests:

```bash
cd packages/e2e-tests

# Run authentication script
npm run auth

# Or use ts-node directly
npx ts-node scripts/authenticate.ts
```

### Authentication Methods Supported

1. **Username/Password (MSAL)**
2. **Certificate Authentication (MSAL)**
3. **Service Principal**

## 📝 Environment Variables

Create a `.env` file in `packages/e2e-tests/` with the following variables:

### Required for Canvas App Tests

```bash
# Canvas App Configuration (Option A: Component IDs - Recommended)
POWER_APPS_ENVIRONMENT_ID=d413c445-44c5-ed7c-be0f-761eaeee1919
CANVAS_APP_ID=8f6e67b9-93af-4cf4-b1f0-b6b25c20e2dc
CANVAS_APP_TENANT_ID=91bee3d9-0c15-4f17-8624-c92bb8b36ead

# OR (Option B: Full URL - Alternative)
CANVAS_APP_URL=https://apps.powerapps.com/play/e/environment-id/a/app-id?tenantId=tenant-id

# MSAL Authentication
MS_AUTH_TENANT_ID=your-tenant-id
MS_AUTH_CLIENT_ID=your-client-id
MS_AUTH_USERNAME=your-username@domain.com
MS_AUTH_PASSWORD=your-password

# Optional: Certificate Authentication
MS_AUTH_CREDENTIAL_TYPE=certificate
MS_AUTH_LOCAL_FILE_PATH=path/to/certificate.pfx
MS_AUTH_CERTIFICATE_PASSWORD=cert-password

# Optional: Auth Endpoint (defaults to login.microsoftonline.com)
AUTH_ENDPOINT=https://login.microsoftonline.com
```

### How to Get Canvas App IDs

**Option A: Component IDs (Recommended)**

1. **Environment ID**: Already set as `POWER_APPS_ENVIRONMENT_ID` (same as Model-Driven Apps)
2. **App ID**:
   - Open your Canvas app in Power Apps maker portal (make.powerapps.com)
   - Click "Details" in the top menu
   - Copy the "App ID" value
3. **Tenant ID**:
   - Go to [Azure Portal](https://portal.azure.com) → Azure Active Directory
   - Copy the "Tenant ID" (must be GUID format, not domain name)
   - OR extract from the full Canvas app play URL

**Option B: Full URL (Alternative)**

1. Open your Canvas app in Power Apps maker portal (make.powerapps.com)
2. Click "Play" button to launch the app
3. Copy the URL from the browser address bar
4. Paste it as the `CANVAS_APP_URL` value in `.env`

**Note**: If both are provided, `CANVAS_APP_URL` takes precedence.

### Example `.env` File

```bash
# Canvas App Configuration
POWER_APPS_ENVIRONMENT_ID=d413c445-44c5-ed7c-be0f-761eaeee1919
CANVAS_APP_ID=8f6e67b9-93af-4cf4-b1f0-b6b25c20e2dc
CANVAS_APP_TENANT_ID=91bee3d9-0c15-4f17-8624-c92bb8b36ead

# MSAL Configuration
MS_AUTH_TENANT_ID=12345678-1234-1234-1234-123456789abc
MS_AUTH_CLIENT_ID=87654321-4321-4321-4321-abcdef123456
MS_AUTH_USERNAME=testuser@yourorg.onmicrosoft.com
MS_AUTH_PASSWORD=YourSecurePassword123!

# Certificate Auth (Optional)
MS_AUTH_CREDENTIAL_TYPE=certificate
MS_AUTH_LOCAL_FILE_PATH=E:\git\playwright-power-platform-toolkit\cert\certificate.pfx
MS_AUTH_CERTIFICATE_PASSWORD=CertPassword123!
```

## Test Structure

### Test: Complete CRUD Workflow

This comprehensive test performs all CRUD operations:

1. **CREATE**:
   - Clicks "Add" button (+ icon)
   - Fills Order Number field with unique test data
   - Saves the record
   - Navigates back to gallery

2. **READ**:
   - Searches through gallery items
   - Verifies the created record exists
   - Confirms record can be found by Order Number

3. **UPDATE**:
   - Opens the record from gallery
   - Updates Order Number with "-UPDATED" suffix
   - Saves changes
   - Verifies update in gallery

4. **DELETE**:
   - Opens the updated record
   - Clicks Delete button (trash icon)
   - Verifies record is removed from gallery

### Test: Quick Create and Delete

A faster test that:

- Creates a record
- Immediately deletes it
- Useful for smoke testing

## Canvas App Selectors

The test uses `data-control-name` attributes to locate Canvas App controls:

```typescript
const selectors = {
  // Gallery
  orderGalleryItem: '[data-control-name="Gallery1"] [data-control-part="item"]',

  // Buttons
  addButton: '[data-control-name="IconNewItem1"]',
  saveButton: '[data-control-name="IconSave1"]',
  deleteButton: '[data-control-name="IconDelete1"]',
  backButton: '[data-control-name="IconBackarrow1"]',

  // Form Fields
  orderNumberInput: '[data-control-name="OrderNumber_DataCard1"] input',
  orderStatusDropdown: '[data-control-name="StatusDropdown"]',
  // ... more fields
};
```

**Note**: These selectors are specific to the Northwind Orders Canvas app. If you're testing a different Canvas app, you'll need to update the selectors based on your app's control names.

## Customizing for Your Canvas App

### 1. Inspect Control Names

To find the correct selectors for your Canvas app:

1. Open your Canvas app in play mode
2. Right-click on a control and select "Inspect" (F12)
3. Look for `data-control-name` attributes in the HTML
4. Update the selectors in the test file

Example:

```html
<button data-control-name="MyCustomButton">Click Me</button>
```

Selector:

```typescript
myButton: '[data-control-name="MyCustomButton"]';
```

### 2. Update Test Flow

Modify the test steps to match your app's workflow:

- Change field names
- Add/remove form fields
- Adjust navigation flow
- Update validation logic

### 3. Handle Different UI Patterns

Canvas apps can have different patterns:

- **Gallery + Detail Form** (Northwind pattern)
- **Single Form View**
- **Tabbed Interface**
- **Master-Detail with embedded forms**

Adjust the test logic based on your app's UI pattern.

## 🐛 Troubleshooting

### Tests Fail with "Authentication Required"

- Verify `.env` file has correct credentials
- Run `npm run auth` to pre-authenticate
- Check if certificate path is correct (for cert auth)
- Ensure auth state file exists at `.auth/user.json`

### Canvas App Not Loading

- Increase wait timeout: `await page.waitForTimeout(10000)`
- Check network tab for failed API calls
- Verify authentication state is valid
- Ensure `CANVAS_APP_ID` or `CANVAS_APP_URL` is set correctly

### Iframe Not Found

The Canvas app runs inside an iframe with name `fullscreen-app-host`. If you get strict mode violations:

```typescript
// Correct - specific iframe selector
canvasFrame: 'iframe[name="fullscreen-app-host"]';

// Wrong - matches multiple iframes
canvasFrame: 'iframe';
```

### Selectors Not Found

- Inspect the app to verify `data-control-name` attributes
- Use Playwright Inspector: `npm test -- tests/northwind/canvas/canvas-app-crud.test.ts -- --debug`
- Check if controls are inside iframe (use frameLocator)
- Verify the Canvas app HTML structure matches expected selectors

### Gallery Items Not Found

- Check if pagination is enabled
- Verify search/filter is not active
- Ensure gallery selector is correct: `[data-control-part="gallery-item"]`
- Wait for Canvas app to fully load before interacting

### Tests Timeout

- Increase timeout in `playwright.config.ts`
- Canvas apps can take 5-10 seconds to load
- Check network connectivity
- Verify the Canvas App is published and accessible

## Best Practices

1. **Use Unique Test Data**: Generate unique Order Numbers to avoid conflicts
2. **Clean Up**: Always delete test records in `afterEach` or at end of test
3. **Wait for Operations**: Canvas apps can be slow, use adequate timeouts
4. **Handle Iframes**: Always use `frameLocator` for Canvas app controls
5. **Verify State**: Check that screens/forms are visible before interacting
6. **Refresh When Needed**: Reload page after create/update to see latest data

## Known Limitations

1. **Slow Loading**: Canvas apps can take 5-10 seconds to load in play mode
2. **Iframe Isolation**: All controls must be accessed through frameLocator
3. **Dynamic Selectors**: Control names may change if app is modified
4. **Pagination**: Gallery pagination requires additional logic
5. **Complex Dropdowns**: Fluent UI dropdowns need special handling

## Example Output

```
🔑 Test Order Number: TEST-45678

🌐 Navigating to Canvas App: https://apps.powerapps.com/play/...
⏳ Waiting for Canvas App to load...
✅ Canvas App loaded successfully!

═══════════════════════════════════════════════════════
🧪 CANVAS APP CRUD WORKFLOW TEST
═══════════════════════════════════════════════════════

📝 STEP 1: CREATE - Adding new order record...
➕ Clicking Add button...
✅ Detail screen opened
✍️  Entering Order Number: TEST-45678
💾 Saving the new record...
⬅️  Navigating back to gallery...
✅ Record created successfully!

🔍 STEP 2: READ - Finding record in gallery...
📊 Gallery has 12 items
✅ Found record "TEST-45678" at position 0
✅ Record verified in gallery!

... (more steps)

═══════════════════════════════════════════════════════
🎉 CANVAS APP CRUD WORKFLOW COMPLETED SUCCESSFULLY!
   ✅ CREATE: Record created
   ✅ READ: Record found in gallery
   ✅ UPDATE: Record updated
   ✅ DELETE: Record deleted
═══════════════════════════════════════════════════════
```

## 📚 Related Documentation

- [Main E2E Tests README](../../README.md)
- [Model-Driven App Tests README](../mda/README.md)
- [Authentication Guide](../../../../packages/playwright-power-platform-toolkit/docs/tutorials/AUTHENTICATION.md)
- [CanvasAppPage API](../../../../packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts)
- [Canvas App Locators](../../../../packages/playwright-power-platform-toolkit/src/locators/canvas-app.locators.ts)

## 🔗 Quick Links

- **Run All Tests**: `npm test`
- **Run Canvas Tests**: `npm test -- --project=canvas-app`
- **Run MDA Tests**: `npm test -- --project=model-driven-app`
- **Authenticate**: `npm run auth`
- **Debug Mode**: `npm test -- <test-file> -- --debug`
- **Headed Mode**: `npm test -- <test-file> -- --headed`

## 💡 Tips

1. **Reuse Authentication**: Auth state is saved and reused automatically
2. **Use Specific Iframe Selector**: Always use `iframe[name="fullscreen-app-host"]` to avoid strict mode violations
3. **Wait for App Load**: Canvas apps take 5-10 seconds to load - be patient
4. **Debug with Headed Mode**: Use `--headed` to see browser actions
5. **Check Selectors**: Use Playwright Inspector (`--debug`) to verify selectors
6. **Certificate Auth**: Recommended for CI/CD pipelines (no password in env)
7. **Unique Test Data**: Generate unique IDs for test records to avoid conflicts

## 📧 Support

For issues or questions:

- Check the main [README](../../../../README.md)
- Review [CLAUDE.md](../../../../CLAUDE.md) for project structure
- Open an issue on GitHub
