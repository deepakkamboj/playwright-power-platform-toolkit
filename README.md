<div align="center">
  <h1><strong>Playwright Power Platform Toolkit</strong></h1>

[![Build Status](https://github.com/deepakkamboj/playwright-power-platform-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/deepakkamboj/playwright-power-platform-toolkit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/playwright-power-platform-toolkit.svg)](https://www.npmjs.com/package/playwright-power-platform-toolkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.57%2B-green)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)

  <p><strong>Enterprise Test Automation Framework for Microsoft Power Platform</strong></p>
  <p>A production-ready, comprehensive testing framework library for Power Platform applications built on Playwright. Supports Canvas Apps, Model-Driven Apps, and Power Platform services with robust authentication, API testing, accessibility testing, and intelligent reporting capabilities.</p>
</div>

## 🏗️ Architecture

This project follows a clean separation between the **Enterprise Test Automation Framework** (this library) and **Consumer Test Infrastructure** (your test projects).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Consumer Test Infrastructure                         │
│                          (Your Test Projects)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐   ┌────────────────────────────────────┐             │
│  │    Utils     │   │    Test Infrastructure              │             │
│  ├──────────────┤   ├────────────────────────────────────┤             │
│  │ • Fixtures   │   │ • Test Setup  • Test Scripts        │             │
│  │ • Functions  │   │ • Test Utils  • Shared Steps        │             │
│  │ • Annotations│   │ • Test Teardown                     │             │
│  └──────────────┘   │ • Globals (setup & teardown)        │             │
│                     └────────────────────────────────────┘             │
│                                                                          │
│  ┌────────────────────────────────────────────────────────┐             │
│  │              Configurations                             │             │
│  ├────────────────────────────────────────────────────────┤             │
│  │ • Environments   • Accounts/Teams                       │             │
│  │ • playwright.config.ts (with globalSetup/Teardown)      │             │
│  └────────────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ imports
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│      Enterprise Test Automation Framework (This Library)                │
│              playwright-power-platform-toolkit                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────┐│
│  │ Page Object Model    │  │  Accessibility       │  │  API Testing   ││
│  ├──────────────────────┤  ├──────────────────────┤  ├────────────────┤│
│  │ • Page Classes       │  │ • WCAG Rules         │  │ • Endpoints    ││
│  │ • Locators Repo      │  │ • Axe-Core           │  │ • Assertions   ││
│  │ • Utils              │  │ • Assertions         │  │ • API Recorder ││
│  │ • Auth Helper        │  │ • Violations Report  │  │ • Dataverse    ││
│  └──────────────────────┘  └──────────────────────┘  └────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ uses
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 Authentication (playwright-ms-auth)                      │
├─────────────────────────────────────────────────────────────────────────┤
│ • Cert-based Auth  • Password Auth  • Token Refresh                     │
│ • Storage State Management  • KeyVault Management                       │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ built on
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│         Playwright Core Libraries and Test Runner                       │
│                   (@playwright/test package)                            │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ outputs to
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Reporting Layer (playwright-ai-reporter)                    │
├─────────────────────────────────────────────────────────────────────────┤
│ • Trace Logs  • Screenshots & Videos  • AI-powered Analysis             │
│ • Test Suite Logs  • Email Notifications  • Bug Tracking Integration    │
│ • Test Failure Suggestions & Fix  • Reporting & Dashboard               │
└─────────────────────────────────────────────────────────────────────────┘
```

## 📦 What's Included

### Core Components

#### Page Object Model
- **PowerAppsPage**: Full POM for Power Apps Maker Portal
- **Locators Repository**: Maintainable selector management
- **Object Repository**: Constants and locators organized by page
- **Utilities**: Common helper functions for page interactions
- **Auth Helper**: Microsoft authentication integration

#### API Testing
- **REST API Testing**: Full HTTP methods support (GET, POST, PATCH, DELETE)
- **Endpoints**: Pre-defined Power Platform API endpoints
- **Assertions**: Validation helpers for API responses
- **API Recorder**: Record and replay browser API calls
- **Dataverse**: Dataverse-specific API utilities

#### Accessibility Testing
- **WCAG Rules**: Complete WCAG 2.0/2.1 compliance testing
- **Axe-Core Integration**: Industry-standard accessibility engine
- **Assertions**: Accessibility-specific validation
- **Violations Reporting**: Detailed accessibility reports

### Authentication
Powered by `playwright-ms-auth`:
- Certificate-based authentication
- Password-based authentication
- Automatic token refresh
- Storage state management
- Azure KeyVault integration

## 🚀 Features

- ✅ **Page Object Model**: Pre-built POMs for Power Apps Portal
- ✅ **Microsoft Authentication**: Certificate & password auth via playwright-ms-auth
- ✅ **API Testing**: Comprehensive REST API testing utilities
- ✅ **Accessibility Testing**: WCAG 2.0/2.1 compliance validation
- ✅ **API Recorder**: Capture and analyze browser API calls
- ✅ **Test Logger**: Colored console output for better debugging
- ✅ **AI-Powered Reporting**: Intelligent test failure analysis
- ✅ **TypeScript Support**: Full type definitions
- ✅ **Path Aliases**: Clean imports (@pages, @locators, @utils, @auth)
- ✅ **Best Practices**: Follows Playwright recommended patterns

## 📦 Installation

```bash
npm install playwright-power-platform-toolkit --save-dev
```

### Peer Dependencies

```bash
npm install @playwright/test playwright-ms-auth @axe-core/playwright dotenv --save-dev
```

## 🎯 Quick Start

### 1. Import Components

```typescript
import {
  PowerAppsPage,
  ApiTestHelper,
  AccessibilityTestHelper,
  ConfigHelper,
  TestLogger,
} from 'playwright-power-platform-toolkit';
```

### 2. Use Page Objects

```typescript
import { test } from '@playwright/test';
import { PowerAppsPage } from 'playwright-power-platform-toolkit';

test('Navigate to Apps', async ({ page }) => {
  const powerAppsPage = new PowerAppsPage(page);
  await powerAppsPage.navigateToApps();
});
```

### 3. Test APIs

```typescript
import { test } from '@playwright/test';
import { ApiTestHelper, ConfigHelper } from 'playwright-power-platform-toolkit';

test('Test Power Apps API', async ({ request }) => {
  const config = ConfigHelper.getInstance();
  const apiHelper = new ApiTestHelper(request, config);

  const response = await apiHelper.get('/providers/Microsoft.PowerApps/apps');
  await apiHelper.validateStatusCode(response, 200);
});
```

### 4. Check Accessibility

```typescript
import { test, expect } from '@playwright/test';
import { AccessibilityTestHelper } from 'playwright-power-platform-toolkit';

test('Check WCAG compliance', async ({ page }) => {
  await page.goto('https://make.powerapps.com');

  const a11yHelper = new AccessibilityTestHelper(page);
  const results = await a11yHelper.scanPage();

  expect(results.violations).toHaveLength(0);
});
```

## 📚 API Reference

### PowerAppsPage

**Navigation:**
- `navigateToHome()` - Navigate to Maker home
- `navigateToApps()` - Navigate to Apps page
- `navigateToSolutions()` - Navigate to Solutions page

**Wait Methods:**
- `waitForHomePageLoad()` - Wait for home page load
- `waitForAppsPageLoad()` - Wait for Apps page load
- `waitForSolutionsPageLoad()` - Wait for Solutions page load

**App Management:**
- `createApp(appType)` - Create new app
- `findApp(appName)` - Find app by name
- `deleteApp(appType, appName)` - Delete app

**Utilities:**
- `dismissTeachingBubble()` - Dismiss teaching bubbles

### ApiTestHelper

**HTTP Methods:**
- `get(endpoint, options?)` - GET request
- `post(endpoint, data?, options?)` - POST request
- `patch(endpoint, data?, options?)` - PATCH request
- `delete(endpoint, options?)` - DELETE request

**Validation:**
- `validateStatusCode(response, code)` - Validate HTTP status
- `validateResponseTime(response, maxMs)` - Validate response time
- `validateJsonResponse(response)` - Validate JSON response

**Dataverse:**
- `getDataverseRecords(table, options?)` - Query Dataverse
- `createDataverseRecord(table, data)` - Create record
- `updateDataverseRecord(table, id, data)` - Update record
- `deleteDataverseRecord(table, id)` - Delete record

### AccessibilityTestHelper

**Scanning:**
- `scanPage(options?)` - Scan entire page
- `scanElement(selector, options?)` - Scan specific element

**Assertions:**
- `assertNoViolations(results)` - Assert zero violations
- `assertNoCriticalViolations(results)` - Allow minor issues

**Keyboard Testing:**
- `testKeyboardNavigation(elements[])` - Test keyboard access
- `testTabOrder(selectors[])` - Test tab sequence

**ARIA:**
- `assertAriaLabel(locator, expected)` - Check ARIA label
- `checkColorContrast(selector)` - Validate contrast

**Reporting:**
- `generateReport(results)` - Generate text report
- `saveReport(results, path)` - Save report to file

### ConfigHelper

**Configuration:**
- `getInstance()` - Get singleton instance
- `getPowerAppsBaseUrl()` - Get base URL
- `getAuthEmail()` - Get auth email
- `getTenantId()` - Get tenant ID
- `getBapApiUrl()` - Get BAP API URL
- `getAuthToken()` - Extract auth token
- `checkStorageStateExpiration()` - Check token validity

### TestLogger

**Logging:**
- `info(message)` - Info message (cyan)
- `success(message)` - Success message (green)
- `error(message, error?)` - Error message (red)
- `warning(message)` - Warning message (yellow)
- `debug(message)` - Debug message (gray)
- `step(num, message)` - Step message (numbered)

### ApiRecorder

**Recording:**
- `startRecording()` - Start recording APIs
- `stopRecording()` - Stop recording
- `saveToFile(path)` - Save to JSON
- `getStatistics()` - Get recording stats

**Options:**
- `urlFilter` - Filter by URL pattern
- `resourceTypes` - Filter by type (xhr, fetch)

### Utilities

**CommonUtils:**
- `TimeOut` - Timeout constants
- `waitForCondition()` - Wait for condition
- `scrollToElement()` - Scroll to element
- `randomAlphaNumeric()` - Generate random string
- `delay()` - Async delay
- `retryWithBackoff()` - Retry with exponential backoff

**Colors:**
- `colors.fgCyan` - Cyan text
- `colors.fgGreen` - Green text
- `colors.fgYellow` - Yellow text
- `colors.fgRed` - Red text
- `colors.reset` - Reset color

## 🔐 Authentication

This library uses `playwright-ms-auth` for Microsoft authentication.

### Certificate Authentication

```env
MS_AUTH_EMAIL=user@domain.com
MS_AUTH_CREDENTIAL_TYPE=certificate
MS_AUTH_CLIENT_ID=your-client-id
MS_AUTH_CERTIFICATE_PATH=./cert.pem
MS_AUTH_CERTIFICATE_KEY_PATH=./key.pem
MS_AUTH_CERTIFICATE_THUMBPRINT=thumbprint
AZURE_TENANT_ID=tenant-id
```

### Password Authentication

```env
MS_AUTH_EMAIL=user@domain.com
MS_AUTH_CREDENTIAL_TYPE=password
MS_USER_PASSWORD=password
AZURE_TENANT_ID=tenant-id
```

## 📖 Documentation

For comprehensive documentation, see:

- **[docs/QUICKSTART.md](docs/QUICKSTART.md)** - Getting started guide
- **[docs/QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md)** - Code snippets & cheat sheet
- **[docs/API-ACCESSIBILITY-GUIDE.md](docs/API-ACCESSIBILITY-GUIDE.md)** - Advanced features
- **[docs/FIXTURES-GUIDE.md](docs/FIXTURES-GUIDE.md)** - Test fixtures guide
- **[CLAUDE.md](CLAUDE.md)** - Complete project overview for AI assistants

## 🧪 Example Test Project

See the `e2e-tests/` directory for a complete example of how to use this library in your test project. The example includes:

- **Test fixtures** with auto-injection of library utilities
- **Global setup/teardown** hooks for test lifecycle management
- **Environment-based test filtering** (local, dev, test, staging, prod)
- **Pre-configured test types** (smoke, nightly, API, accessibility, E2E)
- **Complete playwright.config.ts** with all optimizations

```bash
cd e2e-tests
npm install
npm run auth:headful
npm test
```

The example project demonstrates best practices for organizing tests, using fixtures, and structuring a consumer test infrastructure that leverages this library.

## 🏗️ Building the Library

```bash
# Build TypeScript to lib/
npm run build

# Build and watch
npm run build:watch

# Clean build artifacts
npm run clean
```

## 🤝 Contributing

### Development Workflow

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepakkamboj/playwright-power-platform-toolkit.git
   cd playwright-power-platform-toolkit
   ```

2. **Install library dependencies**
   ```bash
   npm install
   ```

3. **Make changes to library source**
   - Edit files in `src/` directory
   - Update exports in `src/index.ts` if adding new features

4. **Build the library**
   ```bash
   npm run build
   ```
   This compiles TypeScript to JavaScript in the `lib/` directory.

5. **Test your changes**
   ```bash
   cd e2e-tests
   npm install          # Installs the library from parent directory
   npm run auth:headful # Authenticate (first time only)
   npm test             # Run all tests
   ```

6. **Verify and document**
   - Check `src/index.ts` exports are correct
   - Update documentation if adding new features
   - Run `npm run format` to format code

### Important Notes

- **Library code**: Located in `src/`, compiled to `lib/`
- **Test code**: Located in `e2e-tests/`
- **Build command**: Only run `npm run build` in the root directory
- **e2e-tests**: Consumes the built library, doesn't need its own build

## 📝 License

MIT

## 🔗 Related Projects

- [Playwright](https://playwright.dev/) - Browser automation framework
- [playwright-ms-auth](https://github.com/deepakkamboj/playwright-ms-auth) - Microsoft authentication
- [playwright-ai-reporter](https://github.com/deepakkamboj/playwright-ai-reporter) - AI-powered reporting

## 💡 Tips

1. **Use the library as a dependency**: Install via npm in your test projects
2. **Create custom fixtures**: Extend the library with your own fixtures in your test project
3. **Organize tests**: Separate library code from test code
4. **Handle auth properly**: Run authentication once, reuse storage state
5. **Leverage API testing**: Use ApiTestHelper for backend validation
6. **Check accessibility**: Run AccessibilityTestHelper early and often
7. **Record APIs**: Use ApiRecorder to understand application behavior
8. **Use colored logging**: TestLogger helps debug issues faster

## 🐛 Troubleshooting

### Import Issues

Make sure the library is properly installed:
```bash
npm install playwright-power-platform-toolkit
```

### Authentication Fails

- Verify credentials in `.env`
- Check certificate/password is correct
- Ensure MFA is handled if required

### TypeScript Errors

- Ensure `@playwright/test` peer dependency is installed
- Check TypeScript version compatibility
- Verify path aliases in your `tsconfig.json`

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation
- Review example tests in `e2e-tests/`
