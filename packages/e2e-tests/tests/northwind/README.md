# Northwind Traders - E2E Tests

End-to-end automation tests for Northwind Traders apps using the Playwright Power Platform Toolkit.

## Overview

This directory contains comprehensive E2E tests for the Northwind Traders sample solution, demonstrating both **Edit Mode** (designer) and **Runtime Mode** (player) testing:

- **Model-driven App** - Northwind Orders (Model-driven)
- **Canvas App** - Northwind Orders (Canvas)

## Prerequisites

1. **Microsoft Tenant** with Power Apps access
2. **Northwind Traders Solution** installed in your environment
3. **Certificate-based or Password authentication** configured

## Solution Installation

### Step 1: Download the Solution

Download the Northwind Traders solution zip file:

- [NorthwindTraders_final.zip](https://download.microsoft.com/download/f/8/d/f8ddbb69-5499-4776-bd41-00f3bae050a6/NorthwindTraders_final.zip)

### Step 2: Import the Solution

1. Go to [Power Apps Maker Portal](https://make.powerapps.com/)
2. Navigate to **Solutions**
3. Click **Import solution**
4. Select the downloaded `NorthwindTraders_final.zip` file
5. Follow the import wizard to complete installation

### Step 3: Verify Installation

After import, you should see these apps:

- **Northwind Orders (Canvas)** - Canvas app for order management
- **Northwind Orders** - Model-driven app for order management

For more details, see:

- [Northwind Traders Installation Guide](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-install)
- [Canvas App Overview](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/northwind-orders-canvas-overview)
- [Model-driven Apps Documentation](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/)

## Project Setup

### Install Dependencies

From the repository root:

```bash
# Install all dependencies
rush install

# Or from the e2e-tests directory
cd packages/e2e-tests
npm install
```

### Configure Environment

Create a `.env` file in `packages/e2e-tests/`:

```bash
# Required
MS_AUTH_EMAIL=your-email@domain.com
POWER_APPS_BASE_URL=https://make.powerapps.com
POWER_APPS_ENVIRONMENT_ID=your-environment-id

# Optional (for certificate auth)
AZURE_KEY_VAULT_NAME=your-keyvault
AZURE_CERTIFICATE_NAME=your-cert-name
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-secret
```

### Authenticate

Before running tests, authenticate and save storage state:

```bash
# From e2e-tests directory
npm run auth:headful
```

This opens a browser where you log in to Power Apps. After successful authentication, the storage state is saved automatically.

## Test Scenarios

### Canvas App Tests

#### 1. Edit Mode Test (`canvas-app-controls.test.ts`)

Tests app designer functionality:

1. Launch Northwind Orders canvas app in Edit mode
2. Insert Text Label control via search
3. Edit control name to "TextLabel1"
4. Verify control appears in canvas tree

#### 2. Runtime Mode Test (`canvas-app-runtime.test.ts`)

Tests app player functionality:

1. Launch Northwind Orders canvas app in Play mode
2. Verify app loads in new tab
3. Verify app is running correctly
4. Close app

### Model-Driven App Tests

#### 1. Edit Mode Test (`model-driven-app-navigation.test.ts`)

Tests app designer functionality:

1. Launch Northwind Orders model-driven app in Edit mode
2. Add new navigation page with URL
3. Verify page appears in navigation tree

#### 2. Runtime Mode Test (`model-driven-app-runtime.test.ts`)

**Note:** This test is skipped because model-driven apps do not support Play mode like Canvas apps.

- The Play button is disabled for model-driven apps
- Use the CRUD test instead for runtime operations
- Model-driven apps can be tested using Edit mode or direct URLs

#### 3. CRUD Operations Test (`model-driven-app-crud.test.ts`)

Tests full CRUD lifecycle for order records:

1. Navigate to Orders grid view
2. Create new order record
3. Fill in order form and save
4. Verify record exists in grid
5. Open and edit the record
6. Save updated record
7. Delete the record
8. Verify record is deleted

## Running Tests

```bash
# From e2e-tests directory

# Run all Northwind tests
npm test -- --grep "Northwind"

# Run specific test files
npm test -- canvas-app-controls.test.ts           # Canvas Edit Mode
npm test -- canvas-app-runtime.test.ts            # Canvas Runtime Mode
npm test -- model-driven-app-navigation.test.ts   # Model-Driven Edit Mode
npm test -- model-driven-app-runtime.test.ts      # Model-Driven Runtime Mode
npm test -- model-driven-app-crud.test.ts         # Model-Driven CRUD Operations

# Run all runtime tests
npm test -- --grep "Runtime"

# Run all edit/designer tests
npm test -- --grep "Navigation|Controls"

# Run in headed mode (visible browser)
npm test -- --headed --grep "Northwind"

# Run in UI mode
npm test -- --ui --grep "Northwind"
```

## Test Structure

### Canvas App Tests

| Test File                     | Mode    | Test Type | What It Tests                               |
| ----------------------------- | ------- | --------- | ------------------------------------------- |
| `canvas-app-controls.test.ts` | Edit    | Designer  | Insert controls, edit names, verify display |
| `canvas-app-runtime.test.ts`  | Runtime | Player    | Launch app, verify running, close app       |

### Model-Driven App Tests

| Test File                             | Mode    | Test Type | What It Tests                                               |
| ------------------------------------- | ------- | --------- | ----------------------------------------------------------- |
| `model-driven-app-navigation.test.ts` | Edit    | Designer  | Add navigation pages, verify in tree                        |
| `model-driven-app-runtime.test.ts`    | Runtime | Player    | **Skipped** - Play mode not supported for model-driven apps |
| `model-driven-app-crud.test.ts`       | Edit    | CRUD      | Create, read, update, delete order records                  |

## Page Objects

### NorthwindCanvasAppPage

Supports both Edit and Runtime modes:

**Edit Mode Methods:**

- `insertControlsBySearch(controlNames)` - Insert controls via search
- `editControlName(newName)` - Edit control name
- `verifyControlDisplayedOnCanvas(name)` - Verify control in tree

**Runtime Mode Methods:**

- `setAppPage(page)` - Set app page reference
- `waitForCanvasAppToLoad()` - Wait for app to load
- `navigateToOrdersGrid()` - Navigate to orders gallery
- `openFirstOrderRecord()` - Open first order
- `verifyOrderDetailIsDisplayed()` - Verify detail view
- `clickSaveButton()` - Click save
- `clickBackButton()` - Navigate back
- `closeApp()` - Close app tab

### NorthwindModelDrivenAppPage

Supports both Edit and Runtime modes:

**Edit Mode Methods:**

- `addNewNavigationPage(url, title)` - Add navigation page

**Runtime Mode Methods:**

- `navigateToOrdersGrid()` - Navigate to orders grid
- `openFirstOrderRecord()` - Open first order
- `verifyOrderFormIsDisplayed()` - Verify form loads
- `clickCommandButton(name)` - Click command button
- `clickRefreshButton()` - Refresh data
- `closeRecordAndGoBack()` - Navigate back to grid

## Project Structure

```
packages/e2e-tests/tests/northwind/
├── pages/
│   ├── NorthwindCanvasAppPage.ts      # Canvas app page object
│   └── NorthwindModelDrivenAppPage.ts # Model-driven app page object
├── tests/
│   ├── canvas-app-controls.test.ts           # Canvas Edit Mode test
│   ├── canvas-app-runtime.test.ts            # Canvas Runtime Mode test
│   ├── model-driven-app-navigation.test.ts   # Model-Driven Edit Mode test
│   └── model-driven-app-runtime.test.ts      # Model-Driven Runtime Mode test
└── README.md
```

## Key Features

- **Uses Playwright Power Platform Toolkit** - Leverages `AppProvider` for app launching
- **Dual Mode Testing** - Tests both designer (Edit) and player (Runtime) functionality
- **Page Object Pattern** - Clean separation of page logic and test logic
- **Type-Safe** - Full TypeScript support with type definitions
- **Storage State Auth** - Efficient authentication using saved storage state
- **Serial Execution** - Tests run sequentially to avoid conflicts

## Configuration

Tests use the configuration from `packages/e2e-tests/playwright.config.ts`:

- **Browser**: Microsoft Edge (msedge)
- **Viewport**: 1920x1080
- **Test Timeout**: Configurable via environment
- **Auth**: Uses saved storage state from certificate or password auth
- **Launch Args**: Minimal (`--start-maximized`, `--window-size=1920,1080`)

## Architecture

### AppProvider Pattern

Tests use the `AppProvider` class from the toolkit for simplified app launching:

```typescript
import {
  AppProvider,
  AppType,
  AppLaunchMode,
  ConfigHelper,
} from 'playwright-power-platform-toolkit';

const appProvider = new AppProvider(page);

await appProvider.launch({
  app: 'Northwind Orders (Canvas)',
  type: AppType.Canvas,
  mode: AppLaunchMode.Edit,
  baseUrl: ConfigHelper.getBaseUrl(),
});
```

### Custom Page Objects

Page objects extend functionality for app-specific operations:

```typescript
import { NorthwindCanvasAppPage } from '../../pages/northwind/NorthwindCanvasAppPage';

const northwindApp = new NorthwindCanvasAppPage(page);
await northwindApp.insertControlsBySearch(['Text label']);
```

## Troubleshooting

### Authentication Issues

If you see OAuth 400 errors:

1. Re-authenticate: `npm run auth:headful`
2. Check storage state file exists
3. Verify environment variables are set

### App Not Found

If app search fails:

1. Verify app name matches exactly (case-sensitive)
2. Check app is in the correct environment
3. Verify environment ID is set correctly

### Test Timeouts

If tests timeout:

1. Increase timeout in `playwright.config.ts`
2. Check network connectivity
3. Verify app is accessible in browser manually

## Notes

- Tests use the **Playwright Power Platform Toolkit** for app interactions
- Authentication is handled via **saved storage state**
- Both **Edit Mode** (designer) and **Runtime Mode** (player) are tested
- Page objects contain **app-specific selectors** and methods
- Tests demonstrate **best practices** for Power Platform automation

## Related Documentation

- [Playwright Power Platform Toolkit](../../README.md)
- [E2E Tests Overview](../README.md)
- [Authentication Guide](../../docs/authentication.md)

## License

This project is part of the Playwright Power Platform Toolkit.
