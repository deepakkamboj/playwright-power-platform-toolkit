# Test Fixtures Quick Reference

Quick reference for the comprehensive test fixture system.

## Import Statement

```typescript
import {
  test,
  expect,
  smokeTest,
  nightlyTest,
  criticalTest,
  apiTest,
  a11yTest,
  e2eTest,
  localTest,
  prodTest,
  Environment,
  Geography,
  BuildPipeline,
  Priority,
  TestCategory,
  skipIfNotEnvironment,
  skipIfNotGeography,
  skipIfNotPipeline,
  onlyInEnvironment,
  onlyInGeography,
  onlyInPipeline,
  setTestFileOwner,
  logTestMetadata,
} from '@fixtures/test-fixtures';
```

## Environment Variables

```bash
# Set in .env or command line
TEST_ENV=local|dev|test|preview|staging|prod
TEST_GEO=us|europe|asia|china|australia|canada|uk
BUILD_PIPELINE=local|pr|ci|nightly|smoke|regression|performance
OWNER="Team Name"
```

## Auto-Injected Fixtures

All tests automatically get these fixtures:

```typescript
test('Example', async ({
  powerAppsPage,  // PowerAppsPage instance
  apiHelper,      // ApiTestHelper instance
  a11yHelper,     // AccessibilityTestHelper instance
  config,         // ConfigHelper instance
  testLogger,     // TestLogger utility
  // Plus standard Playwright fixtures:
  page,           // Browser page
  request,        // API request context
  context,        // Browser context
  browser,        // Browser instance
}) => {
  // Use any fixture directly
});
```

## Pre-configured Test Types

### smokeTest
```typescript
smokeTest('Critical path', async ({ powerAppsPage }) => {
  // P0, smoke category, runs in smoke builds
});
```

### nightlyTest
```typescript
nightlyTest('Comprehensive test', async ({ powerAppsPage }) => {
  // P1, runs in nightly builds
});
```

### criticalTest
```typescript
criticalTest('Must pass', async ({ powerAppsPage }) => {
  // P0 priority
});
```

### apiTest
```typescript
apiTest('API endpoint', async ({ apiHelper }) => {
  // API category
});
```

### a11yTest
```typescript
a11yTest('WCAG compliance', async ({ a11yHelper }) => {
  // Accessibility category
});
```

### e2eTest
```typescript
e2eTest('Full workflow', async ({ powerAppsPage, apiHelper }) => {
  // E2E category, P1 priority
});
```

### localTest
```typescript
localTest('Debug test', async ({ powerAppsPage }) => {
  // Only runs locally
});
```

### prodTest
```typescript
prodTest('Production check', async ({ apiHelper }) => {
  // Only runs in production
});
```

## Filtering Functions

### Skip Tests

```typescript
// Skip if not in specified environment
skipIfNotEnvironment(Environment.TEST, Environment.STAGING);

// Skip if not in specified geography
skipIfNotGeography(Geography.US, Geography.EUROPE);

// Skip if not in specified pipeline
skipIfNotPipeline(BuildPipeline.CI, BuildPipeline.NIGHTLY);
```

### Conditional Logic

```typescript
if (onlyInEnvironment(Environment.PROD)) {
  // Production-specific logic
}

if (onlyInGeography(Geography.CHINA)) {
  // China-specific logic
}

if (onlyInPipeline(BuildPipeline.PERFORMANCE)) {
  // Performance test logic
}
```

## Common Patterns

### Basic Test
```typescript
test('Simple test', async ({ powerAppsPage }) => {
  await powerAppsPage.navigateToHome();
});
```

### Environment-Specific Test
```typescript
test('TEST only', async ({ powerAppsPage }) => {
  skipIfNotEnvironment(Environment.TEST);
  await powerAppsPage.navigateToApps();
});
```

### API Test
```typescript
apiTest('Get apps', async ({ apiHelper }) => {
  const response = await apiHelper.get('/api/apps');
  await apiHelper.validateStatusCode(response, 200);
});
```

### E2E Test
```typescript
e2eTest('Create and verify', async ({ apiHelper, powerAppsPage, page }) => {
  // Create via API
  const response = await apiHelper.post('/api/apps', { name: 'Test' });

  // Verify in UI
  await powerAppsPage.navigateToApps();
  await expect(page.locator('text=Test')).toBeVisible();
});
```

### Test with Logging
```typescript
test('Logged test', async ({ powerAppsPage, testLogger }) => {
  testLogger.step(1, 'Navigate to home');
  await powerAppsPage.navigateToHome();

  testLogger.success('Test completed');
});
```

### Test Suite with Shared Options
```typescript
test.describe('Navigation Suite', () => {
  test.use({
    owner: 'UI Team',
    priority: Priority.P1,
    category: TestCategory.UI
  });

  test('Test 1', async ({ powerAppsPage }) => { /* ... */ });
  test('Test 2', async ({ powerAppsPage }) => { /* ... */ });
});
```

## Enums

### Environment
- `Environment.LOCAL`
- `Environment.DEV`
- `Environment.TEST`
- `Environment.PREVIEW`
- `Environment.STAGING`
- `Environment.PROD`

### Geography
- `Geography.US`
- `Geography.EUROPE`
- `Geography.ASIA`
- `Geography.CHINA`
- `Geography.AUSTRALIA`
- `Geography.CANADA`
- `Geography.UK`

### BuildPipeline
- `BuildPipeline.LOCAL`
- `BuildPipeline.PR`
- `BuildPipeline.CI`
- `BuildPipeline.NIGHTLY`
- `BuildPipeline.SMOKE`
- `BuildPipeline.REGRESSION`
- `BuildPipeline.PERFORMANCE`

### Priority
- `Priority.P0` - Critical
- `Priority.P1` - High
- `Priority.P2` - Medium
- `Priority.P3` - Low

### TestCategory
- `TestCategory.UI`
- `TestCategory.API`
- `TestCategory.ACCESSIBILITY`
- `TestCategory.INTEGRATION`
- `TestCategory.E2E`
- `TestCategory.SMOKE`
- `TestCategory.REGRESSION`

## Command Line Examples

```bash
# Run all tests
npm test

# Run in specific environment
TEST_ENV=test npm test

# Run in specific geography
TEST_GEO=china npm test

# Run specific pipeline
BUILD_PIPELINE=smoke npm test

# Combine multiple filters
TEST_ENV=test TEST_GEO=us BUILD_PIPELINE=ci npm test

# Run specific test file
npm test -- tests/fixtures-examples.spec.ts

# Run with specific owner
OWNER="Platform Team" npm test
```

## Available Fixture Properties

```typescript
// powerAppsPage methods
await powerAppsPage.navigateToHome();
await powerAppsPage.navigateToApps();
await powerAppsPage.navigateToSolutions();
await powerAppsPage.clickNewApp();
await powerAppsPage.dismissTeachingBubbleIfPresent();

// apiHelper methods
const response = await apiHelper.get(endpoint);
await apiHelper.post(endpoint, data);
await apiHelper.patch(endpoint, data);
await apiHelper.delete(endpoint);
await apiHelper.validateStatusCode(response, 200);
await apiHelper.validateJsonResponse(response);

// a11yHelper methods
const results = await a11yHelper.scanPage();
const results = await a11yHelper.scanElement(selector);
await a11yHelper.generateReport(results, 'report.json');

// config methods
config.getPowerAppsBaseUrl();
config.getAuthEmail();
config.getBapApiUrl();
await config.getAuthToken();
await config.checkStorageStateExpiration();

// testLogger methods
testLogger.info('Message');
testLogger.step(1, 'Step description');
testLogger.success('Success message');
testLogger.error('Error message', error);
testLogger.warning('Warning message');
testLogger.debug('Debug info');
```

## Complete Example

```typescript
import { test, expect, Environment, skipIfNotEnvironment } from '@fixtures/test-fixtures';

test('Complete example', async ({
  powerAppsPage,
  apiHelper,
  a11yHelper,
  config,
  testLogger,
  page
}) => {
  // Filter by environment
  skipIfNotEnvironment(Environment.TEST);

  // Log test start
  testLogger.info('Starting comprehensive test');

  // Get config
  const baseUrl = config.getPowerAppsBaseUrl();
  testLogger.info(`Base URL: ${baseUrl}`);

  // Step 1: API test
  testLogger.step(1, 'Test API');
  const response = await apiHelper.get('/api/apps?$top=1');
  await apiHelper.validateStatusCode(response, 200);

  // Step 2: UI test
  testLogger.step(2, 'Test UI');
  await powerAppsPage.navigateToHome();
  await expect(page).toHaveTitle(/Power Apps/);

  // Step 3: Accessibility test
  testLogger.step(3, 'Test accessibility');
  const a11yResults = await a11yHelper.scanPage();
  expect(a11yResults.violations.length).toBeLessThanOrEqual(5);

  testLogger.success('Test completed successfully');
});
```

## Troubleshooting

### Import Error
```typescript
// ❌ Wrong
import { test } from '@playwright/test';

// ✅ Correct
import { test } from '@fixtures/test-fixtures';
```

### Path Alias Not Working
Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@fixtures/*": ["./src/fixtures/*"]
    }
  }
}
```

### Tests Always Skipping
Check environment variables:
```bash
echo $TEST_ENV
echo $TEST_GEO
echo $BUILD_PIPELINE
```

## More Information

- [Complete Fixtures Guide](./FIXTURES-GUIDE.md)
- [Example Tests](../tests/fixtures-examples.spec.ts)
- [CLAUDE.md](../CLAUDE.md) - Full project overview
