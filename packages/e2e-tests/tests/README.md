# Power Platform E2E Tests - Example Test Suite

This directory contains comprehensive example tests demonstrating how to use the `playwright-power-platform-toolkit` library to test Power Platform applications.

## 📚 Available Test Suites

### [app-provider.example.test.ts](app-provider.example.test.ts) - AppProvider Pattern (12 Examples)

Demonstrates the **AppProvider pattern** for launching and testing Power Platform apps:

1. **Launch Canvas app by ID** - Fast ID-based app launch with form testing
2. **Launch Model Driven app by ID** - Model-driven app testing with record creation
3. **Launch app by name** - Name-based app launch (requires PowerAppsPage)
4. **Test multiple apps in sequence** - Testing multiple apps in one test
5. **Launch with custom options** - Custom timeout and waitForReady settings
6. **Error handling** - Gracefully handling app launch errors
7. **Simple string syntax** - Using string shortcuts for app names
8. **Integration with PowerAppsPage** - Complete workflow: create, launch, test
9. **Provider state management** - Using getLaunchedApps(), getCurrentAppType(), etc.
10. **Best practice setup/teardown** - beforeEach/afterEach patterns
11. **AppProvider with API testing** - Combining UI and API testing
12. **API recording during app testing** - Recording all API traffic

**Key Concepts:**

- `AppProvider` class for unified app management
- Launching apps by ID or name
- Canvas vs Model-Driven app testing
- Play mode vs Edit mode
- Provider state and history tracking
- Integration with API testing

### [api-utilities.example.test.ts](api-utilities.example.test.ts) - API Testing (13 Examples)

Demonstrates **API testing utilities** for Power Platform APIs:

1. **Extract auth token** - Get authentication token from browser session
2. **Create authenticated API context** - Build request context with proper headers
3. **Make GET request** - Simple GET request to BAP API
4. **Validate response status** - Status code validation
5. **Validate response time** - Performance testing with timing validation
6. **Make POST request** - Creating resources via POST
7. **Complex API workflow** - Multi-step API interactions
8. **Error handling** - Handling API errors gracefully
9. **Dataverse API testing** - Testing Dataverse Web API
10. **BAP API testing** - Testing Business Application Platform APIs
11. **ResourceQuery API** - Testing ResourceQuery endpoints
12. **Parallel API requests** - Making multiple requests concurrently
13. **API performance measurement** - Measuring and asserting on API performance

**Key Concepts:**

- `ApiTestHelper` class for API testing
- Extracting tokens from authenticated browser sessions
- Making authenticated requests to Power Platform APIs
- Response validation and assertions
- Performance measurement
- Error handling patterns
- Testing Dataverse, BAP, and ResourceQuery APIs

### [api-recorder.example.test.ts](api-recorder.example.test.ts) - API Recording (8 Examples)

Demonstrates **API recording and analysis** capabilities:

1. **Basic API recording** - Start, record, and stop recording
2. **Recording with URL filtering** - Filter by URL patterns
3. **Recording statistics** - Get detailed call statistics
4. **Save recordings to file** - Export recordings as JSON
5. **Generate test code** - Auto-generate Playwright tests from recordings
6. **Response size filtering** - Limit response body sizes in recordings
7. **Filter by HTTP methods** - Record only specific methods (POST, PUT, etc.)
8. **Best practice with lifecycle hooks** - beforeEach/afterEach recording patterns

**Key Concepts:**

- `ApiRecorder` class for recording HTTP traffic
- Filtering by URL patterns, methods, and response size
- Statistics: success rate, average duration, method/status breakdown
- Exporting recordings to JSON for analysis
- Auto-generating test code from real API traffic
- Interactive CLI recording (`npm run record:apis:headful`)

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Authenticate
npm run auth:headful
```

### 2. Run All Examples

```bash
# Run all example tests
npm test

# Run with UI
npm run test:ui

# Run in headed mode
npm run test:headful
```

### 3. Run Specific Test Suite

```bash
# AppProvider examples
npm test -- app-provider.example.test.ts

# API utilities examples
npm test -- api-utilities.example.test.ts

# API recorder examples
npm test -- api-recorder.example.test.ts
```

### 4. Run Specific Example

```bash
# Run specific test by name
npm test -- app-provider.example.test.ts -g "Launch Canvas app by ID"

# Run API recording example
npm test -- api-recorder.example.test.ts -g "Record API calls"
```

## 🎯 Common Usage Patterns

### Pattern 1: Launch and Test Canvas App

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import {
  AppProvider,
  AppType,
  AppLaunchMode,
  CanvasControlType,
} from 'playwright-power-platform-toolkit';

test('Test Canvas app form submission', async ({ page }) => {
  const provider = new AppProvider(page);

  // Launch app
  await provider.launch({
    app: { id: process.env.CANVAS_APP_ID },
    type: AppType.Canvas,
    mode: AppLaunchMode.Play,
    baseUrl: 'https://make.powerapps.com',
  });

  // Fill form
  await provider.fill({ name: 'NameInput', type: CanvasControlType.TextInput }, 'John Doe');
  await provider.click({
    name: 'SubmitButton',
    type: CanvasControlType.Button,
  });

  // Verify
  await provider.assertVisible({ name: 'SuccessMessage' });

  await provider.close();
});
```

### Pattern 2: API Testing with Authentication

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import { ApiTestHelper } from 'playwright-power-platform-toolkit';

test('Fetch apps via API', async ({ page }) => {
  const apiHelper = new ApiTestHelper(page.request);

  // Get auth token from browser
  const token = await apiHelper.getAuthToken(page);

  // Make authenticated request
  const response = await apiHelper.makeAuthenticatedRequest(token, {
    url: 'https://api.bap.microsoft.com/providers/Microsoft.PowerApps/apps',
    method: 'GET',
  });

  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.value).toBeDefined();
  console.log(`Found ${data.value.length} apps`);
});
```

### Pattern 3: Record and Analyze API Calls

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import { ApiRecorder, PowerAppsPage } from 'playwright-power-platform-toolkit';

test('Record API traffic during navigation', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page, {
    urlPatterns: ['**/api/**'],
  });

  // Start recording
  await recorder.startRecording();

  // Perform actions
  await powerAppsPage.navigateToApps();
  await page.waitForTimeout(2000);

  // Stop and analyze
  await recorder.stopRecording();
  const stats = recorder.getStatistics();

  console.log(`Recorded ${stats.totalCalls} calls`);
  console.log(`Success rate: ${stats.successRate.toFixed(2)}%`);
  console.log(`Avg duration: ${stats.averageDuration.toFixed(2)}ms`);

  // Save for later analysis
  await recorder.saveToFile('./recordings/navigation-apis.json');
});
```

### Pattern 4: Combined UI + API Testing

```typescript
import { test, expect } from '../fixtures/test-fixtures';
import {
  AppProvider,
  ApiTestHelper,
  AppType,
  AppLaunchMode,
} from 'playwright-power-platform-toolkit';

test('Verify app data consistency', async ({ page }) => {
  const provider = new AppProvider(page);
  const apiHelper = new ApiTestHelper(page.request);

  // 1. Launch app
  await provider.launch({
    app: { id: process.env.CANVAS_APP_ID },
    type: AppType.Canvas,
    mode: AppLaunchMode.Play,
    baseUrl: 'https://make.powerapps.com',
  });

  // 2. Interact with UI
  await provider.click({ name: 'LoadDataButton' });
  await provider.assertVisible({ name: 'DataLoadedLabel' });

  // 3. Verify via API
  const token = await apiHelper.getAuthToken(page);
  const response = await apiHelper.makeAuthenticatedRequest(token, {
    url: `${process.env.BASE_URL}/api/data/v9.2/accounts?$top=1`,
    method: 'GET',
  });

  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.value).toBeDefined();

  await provider.close();
});
```

## 🛠️ Interactive API Recording

Record API calls interactively during manual exploration:

```bash
# Interactive recording with browser
npm run record:apis:headful

# Record specific endpoints
npm run record:apis -- --filter "**/api/data/**"

# Record for 30 seconds
npm run record:apis -- --duration 30000

# Save to custom file
npm run record:apis -- --output my-recording.json
```

The interactive recorder provides:

- Real-time statistics display
- Filtering options (Power Apps, Dataverse, BAP, Custom)
- Auto-generated test code
- JSON export for analysis

## 📖 Test Structure Best Practices

### 1. Use Test Steps for Clarity

```typescript
test('My feature test', async ({ powerAppsPage }) => {
  await test.step('Navigate to apps', async () => {
    await powerAppsPage.navigateToApps();
  });

  await test.step('Perform action', async () => {
    // Action logic
  });

  await test.step('Verify result', async () => {
    // Verification logic
  });
});
```

### 2. Use beforeEach/afterEach for Setup/Cleanup

```typescript
test.describe('My feature tests', () => {
  let provider: AppProvider;

  test.beforeEach(async ({ page }) => {
    provider = new AppProvider(page);
    await provider.launch({
      app: { id: process.env.CANVAS_APP_ID },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
    });
  });

  test.afterEach(async () => {
    await provider.close();
    provider.reset();
  });

  test('Test 1', async () => {
    // Test logic
  });

  test('Test 2', async () => {
    // Test logic
  });
});
```

### 3. Use Fixtures for Auto-Injection

```typescript
import { test, expect } from '../fixtures/test-fixtures';

test('Test with fixtures', async ({
  powerAppsPage, // Auto-injected PowerAppsPage
  apiHelper, // Auto-injected ApiTestHelper
  a11yHelper, // Auto-injected AccessibilityTestHelper
  config, // Auto-injected ConfigHelper
  testLogger, // Auto-injected TestLogger
}) => {
  // Use fixtures directly
  await powerAppsPage.navigateToHome();
  testLogger.info('Test started');
});
```

## 🔍 Debugging Examples

### Run with Debug Mode

```bash
# Debug specific test
npm run test:debug -- app-provider.example.test.ts

# Debug specific example
npm run test:debug -- app-provider.example.test.ts -g "Launch Canvas"
```

### Run with UI Mode

```bash
# Interactive test runner
npm run test:ui
```

### View Test Traces

```bash
# Generate trace on failure (automatic)
npm test

# View report with traces
npm run report
```

## 📝 Environment Variables

Configure test behavior with environment variables:

```bash
# App IDs for testing
CANVAS_APP_ID=your-canvas-app-id
MODEL_APP_ID=your-model-app-id

# Base URLs
BASE_URL=https://make.powerapps.com
BAP_API_URL=https://api.bap.microsoft.com

# Test filtering
TEST_ENV=local|dev|test|preview|staging|prod
TEST_GEO=us|europe|asia|china|australia|canada|uk
BUILD_PIPELINE=local|pr|ci|nightly|smoke|regression
```

## 🎓 Learning Path

1. **Start with AppProvider examples** ([app-provider.example.test.ts](app-provider.example.test.ts))
   - Learn basic app launching and interaction patterns
   - Understand Canvas vs Model-Driven testing

2. **Explore API testing** ([api-utilities.example.test.ts](api-utilities.example.test.ts))
   - Learn how to extract auth tokens
   - Make authenticated API requests
   - Validate responses and performance

3. **Try API recording** ([api-recorder.example.test.ts](api-recorder.example.test.ts))
   - Record real API traffic
   - Analyze call patterns and performance
   - Generate test code automatically

4. **Combine patterns**
   - Mix UI testing with API verification
   - Use recording to understand app behavior
   - Build comprehensive E2E tests

## 🤝 Contributing Examples

To add a new example test:

1. **Create a new .example.test.ts file**
2. **Follow the existing patterns**:
   - Use test steps for clarity
   - Include clear comments
   - Add error handling
   - Use fixtures from `test-fixtures.ts`
3. **Document the example** in this README
4. **Add to the test suite**

## 📚 Additional Resources

- [E2E Tests README](../README.md) - Full test infrastructure documentation
- [Main Library Documentation](../../playwright-power-platform-toolkit/README.md) - Toolkit API reference
- [Test Fixtures](../fixtures/test-fixtures.ts) - Custom fixture implementations
- [API Reference](../../docs/pages/reference/) - Full API documentation

---

**Happy Testing!** 🎭

For questions or issues, see the [main README](../README.md) or open an issue on GitHub.
