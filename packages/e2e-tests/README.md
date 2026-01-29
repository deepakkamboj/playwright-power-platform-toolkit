# Power Platform E2E Tests

**Consumer Test Infrastructure** for Microsoft Power Platform using the [playwright-power-platform-toolkit](../README.md) library.

This test project demonstrates how to build a comprehensive test suite using the Enterprise Test Automation Framework (playwright-power-platform-toolkit).

## 🏗️ Architecture

This project implements the **Consumer Test Infrastructure** layer:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Consumer Test Infrastructure                         │
│                        (This Test Project)                               │
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
│  │ • playwright.config.ts                                  │             │
│  └────────────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ imports
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│      Enterprise Test Automation Framework                                │
│              playwright-power-platform-toolkit                           │
│                                                                          │
│  • Page Object Model    • API Testing    • Accessibility                │
│  • Authentication       • Utilities      • Logging                       │
└─────────────────────────────────────────────────────────────────────────┘
```

## 📦 What's Included

### Test Infrastructure

- **Test Setup**: Global setup hooks for authentication and initialization
- **Test Scripts**: Organized test suites for different scenarios
- **Test Teardown**: Global teardown hooks for cleanup
- **Test Utils**: Shared helper functions and utilities
- **Shared Steps**: Reusable test steps across multiple tests

### Utils

- **Test Fixtures** (`test-fixtures.ts`): Custom fixtures with auto-injection
- **Test Functions**: Helper functions for common operations
- **Test Annotations**: Metadata for test organization

### Configurations

- **Environments**: Configuration for local, dev, test, staging, prod
- **Accounts/Teams**: Test account and team configurations
- **playwright.config.ts**: Playwright test runner configuration

### Globals (Test Lifecycle Hooks)

- **global-setup.ts**: Pre-test initialization (runs once before all tests)
- **global-teardown.ts**: Post-test cleanup (runs once after all tests)
- Configured in `playwright.config.ts` with `globalSetup` and `globalTeardown`
- Import utilities from `playwright-power-platform-toolkit`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs the `playwright-power-platform-toolkit` library from the parent directory.

**Note:** If you've made changes to the library source code, rebuild it first:

```bash
cd ..
npm run build
cd e2e-tests
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```bash
# Authentication
MS_AUTH_EMAIL=user@domain.com
MS_AUTH_CREDENTIAL_TYPE=password  # or "certificate"
MS_USER_PASSWORD=YourPassword123

# Power Apps
POWER_APPS_BASE_URL=https://make.powerapps.com

# APIs
BAP_API_URL=https://api.bap.microsoft.com

# Test Filtering (Optional)
TEST_ENV=local|dev|test|preview|staging|prod
TEST_GEO=us|europe|asia|china|australia|canada|uk
BUILD_PIPELINE=local|pr|ci|nightly|smoke|regression|performance
```

### 3. Authenticate

```bash
npm run auth:headful
```

### 4. Record API Calls (Optional)

Record API calls during manual exploration:

```bash
# Record API calls in headless mode
npm run record:apis

# Record with visible browser for interaction
npm run record:apis:headful
```

This will:

- Start recording all HTTP requests/responses
- Save recordings to `test-results/recordings/`
- Generate Playwright test code from recordings
- Provide detailed statistics (success rate, avg duration, etc.)

### 5. Run Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run specific test
npm test -- tests/powerapps-page.spec.ts

# Run with environment filter
TEST_ENV=test npm test

# Run smoke tests only
BUILD_PIPELINE=smoke npm test
```

## 📁 Project Structure

```
e2e-tests/                             # Consumer Test Infrastructure
├── globals/                           # Test lifecycle hooks
│   ├── global-setup.ts                # Pre-test initialization
│   └── global-teardown.ts             # Post-test cleanup
├── tests/                             # Test specifications
│   ├── app-provider.example.test.ts   # AppProvider usage (12 examples)
│   ├── api-utilities.example.test.ts  # API testing utilities (13 examples)
│   ├── api-recorder.example.test.ts   # API recording (8 examples)
│   └── README.md                      # Test documentation
├── scripts/                           # Utility scripts
│   ├── authenticate.ts                # Interactive authentication
│   ├── check-auth.ts                  # Verify auth status
│   ├── record-apis.ts                 # Record API calls interactively
│   └── clean-results.ts               # Clean test results
├── fixtures/                          # Custom test fixtures (Utils layer)
│   └── test-fixtures.ts               # Enhanced Playwright fixtures
├── playwright.config.ts               # Playwright configuration (with globals)
├── package.json                       # Dependencies (includes toolkit)
├── tsconfig.json                      # TypeScript config
├── .env.example                       # Environment template
└── README.md                          # This file
```

This structure follows the **Consumer Test Infrastructure** pattern:

- **Utils**: `test-fixtures.ts` provides auto-injection and test types
- **Test Infrastructure**: `globals/` + `tests/` + `scripts/`
- **Configurations**: `playwright.config.ts` + `.env` + environment variables

### Key Configuration Files

#### playwright.config.ts

The main configuration file that ties everything together:

```typescript
export default defineConfig({
  // Global lifecycle hooks
  globalSetup: require.resolve('./globals/global-setup'),
  globalTeardown: require.resolve('./globals/global-teardown'),

  // Test directory
  testDir: './tests',

  // Use storage state for authentication
  use: {
    storageState: process.env.MS_AUTH_EMAIL ? storageStatePath() : undefined,
  },

  // Import utilities from the library
  // storageStatePath, ConfigHelper, colors, etc.
});
```

## 🎯 Using Test Fixtures

### Auto-Injected Fixtures

The `test-fixtures.ts` file provides auto-injected utilities:

```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('Example with auto-injection', async ({
  powerAppsPage, // PowerAppsPage instance
  apiHelper, // ApiTestHelper instance
  a11yHelper, // AccessibilityTestHelper instance
  config, // ConfigHelper instance
  testLogger, // TestLogger instance
  page, // Standard Playwright page
  request, // Standard Playwright request
}) => {
  await powerAppsPage.navigateToHome();
});
```

### Pre-configured Test Types

```typescript
import { smokeTest, nightlyTest, apiTest, a11yTest } from '@fixtures/test-fixtures';

// Smoke tests - critical paths
smokeTest('User can login', async ({ powerAppsPage }) => {
  await powerAppsPage.navigateToHome();
});

// API tests
apiTest('Get apps list', async ({ apiHelper }) => {
  const response = await apiHelper.get('/providers/Microsoft.PowerApps/apps');
  expect(response.status()).toBe(200);
});

// Accessibility tests
a11yTest('Homepage accessibility', async ({ a11yHelper, page }) => {
  await page.goto('/');
  const results = await a11yHelper.scanPage();
  expect(results.violations).toHaveLength(0);
});

// Nightly tests - comprehensive
nightlyTest('Full workflow', async ({ powerAppsPage, apiHelper }) => {
  // Long-running test...
});
```

### Test Filtering by Environment

```typescript
import { test, Environment, Geography, BuildPipeline } from '@fixtures/test-fixtures';

test('Production-only test', async ({ powerAppsPage }) => {
  test.use({
    environment: Environment.PROD,
    geography: Geography.US,
    buildPipeline: [BuildPipeline.NIGHTLY, BuildPipeline.REGRESSION],
  });

  // This test only runs in PROD, US, during nightly/regression builds
  await powerAppsPage.navigateToHome();
});
```

## 🔌 API Testing Features

### API Utilities (ApiTestHelper)

The toolkit includes comprehensive API testing utilities:

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import { ApiTestHelper } from 'playwright-power-platform-toolkit';

test('Verify apps via API', async ({ page }) => {
  const apiHelper = new ApiTestHelper(page.request);

  // Extract auth token from browser session
  const token = await apiHelper.getAuthToken(page);

  // Make authenticated request
  const response = await apiHelper.makeAuthenticatedRequest(token, {
    url: 'https://api.bap.microsoft.com/providers/Microsoft.PowerApps/apps',
    method: 'GET',
  });

  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  console.log(`Found ${data.value.length} apps`);
});
```

**Key Features:**

- Extract authentication tokens from browser sessions
- Make authenticated API requests with proper headers
- Integration with Playwright's request context
- Support for Power Apps, Dataverse, and BAP APIs

### API Recording (ApiRecorder)

Record, analyze, and generate test code from real API traffic:

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import { ApiRecorder } from 'playwright-power-platform-toolkit';

test('Record and analyze API calls', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page, {
    urlPatterns: ['**/api/**'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Start recording
  await recorder.startRecording();

  // Perform actions
  await powerAppsPage.navigateToApps();
  await page.waitForTimeout(2000);

  // Stop and analyze
  await recorder.stopRecording();

  const stats = recorder.getStatistics();
  console.log(`Recorded ${stats.totalCalls} API calls`);
  console.log(`Success rate: ${stats.successRate.toFixed(2)}%`);
  console.log(`Avg duration: ${stats.averageDuration.toFixed(2)}ms`);

  // Save recordings
  await recorder.saveToFile('./recordings/api-calls.json');

  // Generate test code
  await recorder.saveTestCode('./recordings/generated-test.ts', {
    testName: 'API Test',
    includeHeaders: true,
    includeBody: true,
  });
});
```

**Key Features:**

- Record HTTP requests/responses automatically
- Filter by URL patterns, methods, and response size
- Generate detailed statistics (success rate, duration, method breakdown)
- Save recordings as JSON for later analysis
- Auto-generate Playwright test code from recordings
- Interactive CLI for manual exploration (`npm run record:apis:headful`)

## 🧪 Test Examples

### Basic UI Test

```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('Navigate to Apps page', async ({ powerAppsPage }) => {
  await powerAppsPage.navigateToApps();
  await powerAppsPage.waitForAppsPageLoad();
});
```

### API Test

```typescript
import { apiTest, expect } from '@fixtures/test-fixtures';

apiTest('List Power Apps', async ({ apiHelper }) => {
  const response = await apiHelper.get('/providers/Microsoft.PowerApps/apps');

  await apiHelper.validateStatusCode(response, 200);
  await apiHelper.validateResponseTime(response, 5000);

  const data = await response.json();
  expect(data.value).toBeDefined();
});
```

### Accessibility Test

```typescript
import { a11yTest, expect } from '@fixtures/test-fixtures';

a11yTest('Apps page WCAG compliance', async ({ page, a11yHelper }) => {
  await page.goto('https://make.powerapps.com/apps');

  const results = await a11yHelper.scanPage({
    standard: 'WCAG2AA',
  });

  expect(results.violations).toHaveLength(0);
});
```

### Combined E2E Test

```typescript
import { e2eTest, expect } from '@fixtures/test-fixtures';

e2eTest('Complete app lifecycle', async ({ powerAppsPage, apiHelper, a11yHelper, page }) => {
  // 1. Create app via API
  const createResponse = await apiHelper.post('/api/apps', {
    displayName: 'Test App',
  });
  const appId = (await createResponse.json()).id;

  // 2. Verify in UI
  await powerAppsPage.navigateToApps();
  const app = await powerAppsPage.findApp(appId);
  await expect(app).toBeVisible();

  // 3. Check accessibility
  const results = await a11yHelper.scanPage();
  expect(results.violations).toHaveLength(0);

  // 4. Cleanup
  await apiHelper.delete(`/api/apps/${appId}`);
});
```

## 📋 Available Commands

### Testing

```bash
npm test                    # Run all tests
npm run test:headed         # Run with visible browser
npm run test:ui             # Run in Playwright UI mode
npm run test:debug          # Run in debug mode
npm run test:validation     # Run library validation tests
```

### Authentication

```bash
npm run auth                # Authenticate (headless)
npm run auth:headful        # Authenticate (headed)
npm run auth:check          # Check authentication status
```

### API Recording

```bash
npm run record:apis         # Record API calls (headless)
npm run record:apis:headful # Record API calls (headed - interactive)
```

**Interactive Recording Features:**

- Choose which APIs to record (All, Power Apps, Dataverse, BAP, Custom)
- Set recording duration
- Filter by HTTP methods
- Auto-generate test code
- View detailed statistics
- Save recordings to JSON files

**Command-line Options:**

```bash
# Record specific URLs
npm run record:apis -- --filter "**/api/data/**"

# Record for specific duration
npm run record:apis -- --duration 30000

# Run in headful mode
npm run record:apis -- --headful

# Skip test code generation
npm run record:apis -- --no-tests

# Custom output file
npm run record:apis -- --output my-recording.json
```

### Reporting

```bash
npm run report              # View HTML report
npm run report:generate     # Generate standalone report
```

### Utilities

```bash
npm run clean:results       # Clean test results
npm run clean               # Clean all artifacts
npm run codegen             # Playwright code generator
```

### Code Quality

```bash
npm run format              # Format code with Prettier
npm run format:check        # Check code formatting
```

## 🎛️ Test Filtering

### By Environment

```bash
TEST_ENV=test npm test      # TEST environment only
TEST_ENV=prod npm test      # PROD environment only
```

### By Geography

```bash
TEST_GEO=us npm test        # US region only
TEST_GEO=china npm test     # China region only
```

### By Build Pipeline

```bash
BUILD_PIPELINE=smoke npm test      # Smoke tests only
BUILD_PIPELINE=nightly npm test    # Nightly tests only
BUILD_PIPELINE=ci npm test         # CI tests only
```

### Combined Filters

```bash
TEST_ENV=test TEST_GEO=us BUILD_PIPELINE=ci npm test
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd e2e-tests
          npm install

      - name: Run smoke tests
        env:
          TEST_ENV: test
          BUILD_PIPELINE: smoke
          MS_AUTH_EMAIL: ${{ secrets.MS_AUTH_EMAIL }}
          MS_USER_PASSWORD: ${{ secrets.MS_USER_PASSWORD }}
        run: |
          cd e2e-tests
          npm run auth
          npm test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: e2e-tests/test-results/
```

## 📚 Documentation

For detailed documentation:

- **[Main Library README](../README.md)** - Library overview and API reference
- **[Fixtures Guide](../docs/FIXTURES-GUIDE.md)** - Complete fixtures documentation
- **[Quick Reference](../docs/FIXTURES-QUICK-REFERENCE.md)** - Code snippets
- **[API & Accessibility Guide](../docs/API-ACCESSIBILITY-GUIDE.md)** - Advanced features
- **[CLAUDE.md](../CLAUDE.md)** - Complete project overview for AI assistants

## 🐛 Troubleshooting

### Authentication Issues

```bash
# Re-authenticate with visible browser
npm run auth:headful

# Check authentication status
npm run auth:check
```

### Import Errors

If you see module not found errors:

```bash
# Reinstall dependencies
npm install

# Verify library is installed
npm ls playwright-power-platform-toolkit
```

### Tests Skipping

Tests may skip if environment variables don't match requirements:

```bash
# Check current environment settings
echo $TEST_ENV
echo $TEST_GEO
echo $BUILD_PIPELINE

# Clear filters to run all tests
unset TEST_ENV TEST_GEO BUILD_PIPELINE
npm test
```

### TypeScript Errors

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Verify tsconfig.json paths are correct
cat tsconfig.json
```

### "Missing script: build" Error

The e2e-tests project doesn't have a build script - it consumes the already-built library.

**Solution:**

```bash
# Build the library in the parent directory
cd ..
npm run build

# Then install/update the library in e2e-tests
cd e2e-tests
npm install

# Now run tests
npm test
```

**Workflow:**

1. Make changes to library source (`../src/`)
2. Build library in root: `cd .. && npm run build`
3. Return to e2e-tests: `cd e2e-tests`
4. Install updated library: `npm install`
5. Run tests: `npm test`

## 🤝 Contributing

When adding new tests:

1. **Use fixtures**: Import from `@fixtures/test-fixtures` for consistency
2. **Follow patterns**: Use existing test structure as templates
3. **Add filtering**: Include environment/geography/pipeline metadata
4. **Document tests**: Add clear descriptions and comments
5. **Test metadata**: Use test annotations for ownership and priority

### Adding a New Test

```typescript
import { test, expect, Environment, Priority, TestCategory } from '@fixtures/test-fixtures';

test('My new test', async ({ powerAppsPage, testLogger }) => {
  // Configure test metadata
  test.use({
    environment: [Environment.TEST, Environment.DEV],
    priority: Priority.P1,
    category: TestCategory.REGRESSION,
  });

  // Add logging
  testLogger.info('Starting my new test');
  testLogger.step(1, 'Navigate to page');

  // Test implementation
  await powerAppsPage.navigateToHome();

  testLogger.success('Test completed successfully');
});
```

## 💡 Best Practices

1. **Organize by feature**: Group related tests in the same file
2. **Use descriptive names**: Test names should clearly describe what's being tested
3. **Leverage fixtures**: Use auto-injected fixtures instead of manual initialization
4. **Add proper filtering**: Tag tests with appropriate environment/geography/pipeline
5. **Use globals wisely**: Place one-time setup/teardown in global hooks
6. **Clean up after tests**: Use proper teardown or after hooks for test-specific cleanup
7. **Use Test Logger**: Add structured logging for better debugging
8. **Check accessibility**: Include a11y tests for all UI features
9. **Validate APIs**: Test backend APIs alongside UI tests

### When to Use Globals vs Test Hooks

**Use Global Setup/Teardown for:**

- Environment validation
- Pre-flight checks
- Test environment announcements
- Global resource initialization/cleanup

**Use Test-level beforeAll/afterAll for:**

- Test suite-specific setup
- Shared test data creation
- Suite-specific resource cleanup

**Use Test-level beforeEach/afterEach for:**

- Per-test initialization
- Navigation to starting pages
- Per-test cleanup and state reset

## 📝 License

MIT

---

**Happy Testing!** ✨

For questions or issues, see the [main library documentation](../README.md) or open an issue on GitHub.
