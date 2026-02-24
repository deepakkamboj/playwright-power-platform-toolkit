# Model-Driven App (MDA) Tests - Northwind Orders

This folder contains end-to-end tests for the **Northwind Orders Model-Driven App** using the Playwright Power Platform Toolkit.

## 📋 Test Files

- **`model-driven-app-crud.test.ts`** - CRUD operations test for Northwind Orders MDA
  - Opens Orders grid view
  - Opens first order record
  - Verifies order form is displayed
  - Uses the new **GridComponent** for simplified grid operations

- **`form-context.test.ts`** - FormContext API test for Model-Driven Apps
  - Demonstrates reading form data using formContext
  - Shows how to update and save attribute values
  - Executes custom Xrm code
  - Validates form state (dirty, valid)
  - Extracts all form data programmatically

## 🚀 Running Tests

### Run MDA Tests

```bash
# Navigate to e2e-tests directory
cd packages/e2e-tests

# Run all MDA tests
npm test -- tests/northwind/mda/model-driven-app-crud.test.ts

# Or use project filter
npm test -- --project=model-driven-app
```

### Run with Headed Browser (Debug Mode)

```bash
cd packages/e2e-tests

# Run with visible browser
npm test -- tests/northwind/mda/model-driven-app-crud.test.ts -- --headed

# Run with debug mode (step through)
npm test -- tests/northwind/mda/model-driven-app-crud.test.ts -- --debug
```

### Run Specific Test

```bash
cd packages/e2e-tests

# Run single test by name
npm test -- tests/northwind/mda/model-driven-app-crud.test.ts -g "should open first order"
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

### Required for Model-Driven App Tests

```bash
# Base App URL (Model-Driven App)
BASE_APP_URL=https://your-org.crm.dynamics.com/main.aspx?appid=your-app-id

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

### Example `.env` File

```bash
# Model-Driven App Configuration
BASE_APP_URL=https://ltimautomation.crm.dynamics.com/main.aspx?appid=abc-123-def-456

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

## 🧪 Test Structure

### Test Flow

1. **Setup** - Authenticate and save session
2. **Navigate** - Open Model-Driven App
3. **Grid Operations** - Use GridComponent for interactions
4. **Verification** - Assert expected behavior
5. **Teardown** - Clean up resources

### Using GridComponent

The tests use the new **GridComponent** for simplified grid operations:

```typescript
import { ModelDrivenAppPage } from 'playwright-power-platform-toolkit';

const modelDrivenApp = new ModelDrivenAppPage(page, process.env.BASE_APP_URL);

// Open first record using GridComponent
await modelDrivenApp.grid.openRecord({ rowNumber: 0 });

// Get cell value
const orderNumber = await modelDrivenApp.grid.getCellValue(0, 'Order Number');

// Select row
await modelDrivenApp.grid.selectRow(0);

// Get row count
const count = await modelDrivenApp.grid.getRowCount();

// Sort by column
await modelDrivenApp.grid.sortByColumn('Order Number', 'asc');

// Or use convenience methods
await modelDrivenApp.openRecordFromGrid({ rowNumber: 0 });
await modelDrivenApp.selectGridRow(0);
const value = await modelDrivenApp.getGridCellValue(0, 'Order Number');
```

## 📦 Custom Page Object

The tests use **`NorthwindModelDrivenAppPage`** which extends `ModelDrivenAppPage`:

```typescript
import { NorthwindModelDrivenAppPage } from '../../pages/northwind/NorthwindModelDrivenAppPage';

const northwindApp = new NorthwindModelDrivenAppPage(page);

// Northwind-specific methods
await northwindApp.navigateToOrdersGrid();
await northwindApp.openFirstOrderRecord();
await northwindApp.verifyOrderFormIsDisplayed();
await northwindApp.clickCommandButton('Refresh');
await northwindApp.closeRecordAndGoBack();
```

## 🎯 GridComponent Features

The GridComponent provides these operations:

| Method                          | Description                               |
| ------------------------------- | ----------------------------------------- |
| `openRecord(options)`           | Open record by row number or column value |
| `selectRow(rowNumber)`          | Select a single row                       |
| `selectRows(rowNumbers)`        | Select multiple rows                      |
| `getCellValue(row, column)`     | Get cell value at row and column          |
| `getRowCount()`                 | Get total number of rows                  |
| `sortByColumn(name, direction)` | Sort grid by column                       |
| `waitForGridLoad()`             | Wait for grid to fully load               |
| `isGridEmpty()`                 | Check if grid has no records              |
| `getGrid()`                     | Get grid locator for custom operations    |

## 🔧 FormContext API

The FormContext API allows programmatic access to form data in Model-Driven Apps. This is useful for:

- Reading field values
- Updating field values
- Saving forms programmatically
- Validating form state
- Executing custom Xrm code

**Quick Example:**

```typescript
import {
  getFormContext,
  getEntityAttribute,
  setEntityAttribute,
  saveForm,
} from 'playwright-power-platform-toolkit';

// Get form information
const formContext = await getFormContext(page);
console.log('Entity:', formContext.entityName);

// Read attribute value
const orderNumber = await getEntityAttribute(page, 'nwind_ordernumber');

// Update attribute value
await setEntityAttribute(page, 'nwind_ordernumber', 'TEST-12345');

// Save form
await saveForm(page);
```

**FormContext API Methods:**

| Method                     | Description                                 |
| -------------------------- | ------------------------------------------- |
| `getFormContext()`         | Get form info (entity name, ID, attributes) |
| `getEntityAttribute()`     | Read field value                            |
| `setEntityAttribute()`     | Update field value                          |
| `getAllEntityAttributes()` | Get all form data                           |
| `saveForm()`               | Save with options (stay/close/new)          |
| `isFormDirty()`            | Check for unsaved changes                   |
| `isFormValid()`            | Check validation state                      |
| `refreshForm()`            | Refresh without page reload                 |
| `executeInFormContext()`   | Run custom Xrm code                         |

**See Also:**

- [FormContext Test](./form-context.test.ts) - Complete test demonstrating all formContext features
- [FormContext Documentation](../../../../packages/playwright-power-platform-toolkit/docs/tutorials/FORMCONTEXT.md) - Full API reference and examples
- [FormContext Examples](../../../examples/form-context-example.ts) - Standalone examples

## 🐛 Troubleshooting

### Tests Fail with "Authentication Required"

- Verify `.env` file has correct credentials
- Run `npm run auth` to pre-authenticate
- Check if certificate path is correct (for cert auth)

### Tests Fail with "Base URL Not Set"

- Ensure `BASE_APP_URL` is set in `.env` file
- URL should be in format: `https://org.crm.dynamics.com/main.aspx?appid=app-id`

### Tests Timeout

- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify the Model-Driven App is accessible

### Grid Elements Not Found

- Wait for grid to load: `await modelDrivenApp.grid.waitForGridLoad()`
- Check if view is correct
- Verify entity has records

## 📚 Related Documentation

- [Main E2E Tests README](../../README.md)
- [Canvas App Tests README](../canvas/README.md)
- [Authentication Guide](../../../../packages/playwright-power-platform-toolkit/docs/tutorials/AUTHENTICATION.md)
- [GridComponent Documentation](../../../../packages/playwright-power-platform-toolkit/src/components/model-driven/grid.component.ts)
- [ModelDrivenAppPage API](../../../../packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts)

## 🔗 Quick Links

- **Run All Tests**: `npm test`
- **Run Canvas Tests**: `npm test -- --project=canvas-app`
- **Run MDA Tests**: `npm test -- --project=model-driven-app`
- **Authenticate**: `npm run auth`
- **Debug Mode**: `npm test -- <test-file> -- --debug`

## 💡 Tips

1. **Reuse Authentication**: Auth state is saved and reused automatically
2. **Use GridComponent**: Simplifies grid operations with built-in fallbacks
3. **Debug with Headed Mode**: Use `--headed` to see browser actions
4. **Check Selectors**: Use Playwright Inspector (`--debug`) to verify selectors
5. **Certificate Auth**: Recommended for CI/CD pipelines (no password in env)

## 📧 Support

For issues or questions:

- Check the main [README](../../../../README.md)
- Review [CLAUDE.md](../../../../CLAUDE.md) for project structure
- Open an issue on GitHub
