# Test Fixtures Guide

This guide explains how to use the comprehensive test fixture system for filtering and organizing tests by environment, geography, build pipeline, and other criteria.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Environment Variables](#environment-variables)
4. [Test Options](#test-options)
5. [Built-in Fixtures](#built-in-fixtures)
6. [Test Filtering](#test-filtering)
7. [Pre-configured Test Types](#pre-configured-test-types)
8. [Examples](#examples)
9. [Best Practices](#best-practices)

---

## Overview

The fixture system provides:

- **Automatic injection** of page objects and helpers
- **Test filtering** by environment, geography, and pipeline type
- **Metadata tagging** for test organization and reporting
- **Pre-configured test types** for common scenarios (smoke, nightly, etc.)
- **Flexible configuration** via environment variables and test options

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Your Test Specification                     │
│  import { test, smokeTest, apiTest } from '@fixtures'   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│          Test Fixtures (test-fixtures.ts)                │
│  ┌───────────────┐  ┌───────────────┐                   │
│  │  Base Options │  │   Fixtures    │                   │
│  │  - owner      │  │  - powerApps  │                   │
│  │  - env        │  │  - apiHelper  │                   │
│  │  - geo        │  │  - a11yHelper │                   │
│  │  - pipeline   │  │  - config     │                   │
│  │  - priority   │  │  - testLogger │                   │
│  │  - category   │  └───────────────┘                   │
│  └───────────────┘                                       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│            Playwright Test Runner                        │
│     (with automatic filtering and annotations)           │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Basic Test with Fixtures

```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('Basic navigation test', async ({ powerAppsPage }) => {
  // powerAppsPage is automatically injected
  await powerAppsPage.navigateToHome();
});
```

### 2. Test with Filtering

```typescript
import { smokeTest, expect } from '@fixtures/test-fixtures';

smokeTest('Login and see apps', async ({ powerAppsPage, page }) => {
  await powerAppsPage.navigateToApps();
  await expect(page).toHaveTitle(/Power Apps/);
});
```

### 3. API Test

```typescript
import { apiTest, expect } from '@fixtures/test-fixtures';

apiTest('Get apps from API', async ({ apiHelper }) => {
  const response = await apiHelper.get('/providers/Microsoft.PowerApps/apps');
  await apiHelper.validateStatusCode(response, 200);
});
```

---

## Environment Variables

Set these environment variables to control test filtering:

### Required Variables

```bash
# Environment type
TEST_ENV=local|dev|test|preview|staging|prod

# Geography/Region
TEST_GEO=us|europe|asia|china|australia|canada|uk

# Build pipeline type
BUILD_PIPELINE=local|pr|ci|nightly|smoke|regression|performance

# Test owner (optional)
OWNER="Your Team Name"
```

### Example .env Configuration

```bash
# Development environment
TEST_ENV=dev
TEST_GEO=us
BUILD_PIPELINE=local
OWNER="Platform Team"

# Other required variables
POWER_APPS_BASE_URL=https://make.powerapps.com
MS_AUTH_EMAIL=user@domain.com
# ... other auth variables
```

### CI/CD Pipeline Configuration

**For PR builds:**
```bash
TEST_ENV=test
TEST_GEO=us
BUILD_PIPELINE=pr
```

**For Nightly builds:**
```bash
TEST_ENV=test
TEST_GEO=us
BUILD_PIPELINE=nightly
```

**For Smoke tests:**
```bash
TEST_ENV=test
TEST_GEO=us
BUILD_PIPELINE=smoke
```

**For Production:**
```bash
TEST_ENV=prod
TEST_GEO=us
BUILD_PIPELINE=ci
```

---

## Test Options

### Available Options

All tests have access to these options:

```typescript
export type BaseTestOptions = {
  owner: string;              // Test owner/team
  environment: Environment;   // local, dev, test, preview, staging, prod
  geography: Geography;       // us, europe, asia, china, etc.
  buildPipeline: BuildPipeline; // local, pr, ci, nightly, smoke, etc.
  priority: Priority;         // p0, p1, p2, p3
  category: TestCategory;     // ui, api, accessibility, e2e, etc.
};
```

### Enums Reference

**Environment:**
- `Environment.LOCAL` - Local development
- `Environment.DEV` - Development environment
- `Environment.TEST` - Test environment
- `Environment.PREVIEW` - Preview environment
- `Environment.STAGING` - Staging environment
- `Environment.PROD` - Production environment

**Geography:**
- `Geography.US` - United States
- `Geography.EUROPE` - Europe
- `Geography.ASIA` - Asia
- `Geography.CHINA` - China
- `Geography.AUSTRALIA` - Australia
- `Geography.CANADA` - Canada
- `Geography.UK` - United Kingdom

**BuildPipeline:**
- `BuildPipeline.LOCAL` - Local development
- `BuildPipeline.PR` - Pull request validation
- `BuildPipeline.CI` - Continuous integration
- `BuildPipeline.NIGHTLY` - Nightly builds
- `BuildPipeline.SMOKE` - Smoke tests
- `BuildPipeline.REGRESSION` - Regression tests
- `BuildPipeline.PERFORMANCE` - Performance tests

**Priority:**
- `Priority.P0` - Critical (must always pass)
- `Priority.P1` - High priority
- `Priority.P2` - Medium priority
- `Priority.P3` - Low priority

**TestCategory:**
- `TestCategory.UI` - UI/browser tests
- `TestCategory.API` - API tests
- `TestCategory.ACCESSIBILITY` - Accessibility tests
- `TestCategory.INTEGRATION` - Integration tests
- `TestCategory.E2E` - End-to-end tests
- `TestCategory.SMOKE` - Smoke tests
- `TestCategory.REGRESSION` - Regression tests

---

## Built-in Fixtures

All tests automatically get these fixtures injected:

### 1. powerAppsPage

Pre-initialized PowerAppsPage object.

```typescript
test('Use PowerAppsPage', async ({ powerAppsPage }) => {
  await powerAppsPage.navigateToHome();
  await powerAppsPage.navigateToApps();
  await powerAppsPage.clickNewApp();
});
```

### 2. apiHelper

Pre-initialized ApiTestHelper with authentication.

```typescript
test('Use ApiTestHelper', async ({ apiHelper }) => {
  const response = await apiHelper.get('/api/endpoint');
  await apiHelper.validateStatusCode(response, 200);
  await apiHelper.validateJsonResponse(response);
});
```

### 3. a11yHelper

Pre-initialized AccessibilityTestHelper.

```typescript
test('Use AccessibilityTestHelper', async ({ a11yHelper }) => {
  const results = await a11yHelper.scanPage();
  expect(results.violations).toHaveLength(0);
});
```

### 4. config

ConfigHelper singleton instance.

```typescript
test('Use ConfigHelper', async ({ config }) => {
  const baseUrl = config.getPowerAppsBaseUrl();
  const email = config.getAuthEmail();
  const token = await config.getAuthToken();
});
```

### 5. testLogger

TestLogger utility for colored console output.

```typescript
test('Use TestLogger', async ({ testLogger }) => {
  testLogger.info('Starting test');
  testLogger.step(1, 'First step');
  testLogger.success('Test passed');
  testLogger.error('Error occurred', new Error('example'));
});
```

### 6. Standard Playwright Fixtures

You also get all standard Playwright fixtures:

```typescript
test('Standard fixtures', async ({ page, request, context, browser }) => {
  // page - Browser page
  // request - API request context
  // context - Browser context
  // browser - Browser instance
});
```

---

## Test Filtering

### Skip Functions

Skip tests that don't match criteria:

```typescript
import {
  skipIfNotEnvironment,
  skipIfNotGeography,
  skipIfNotPipeline
} from '@fixtures/test-fixtures';

test('Only in TEST environment', async ({ powerAppsPage }) => {
  skipIfNotEnvironment(Environment.TEST, Environment.DEV);
  await powerAppsPage.navigateToHome();
});

test('Only in US and Europe', async ({ powerAppsPage }) => {
  skipIfNotGeography(Geography.US, Geography.EUROPE);
  await powerAppsPage.navigateToHome();
});

test('Only in CI/Nightly', async ({ powerAppsPage }) => {
  skipIfNotPipeline(BuildPipeline.CI, BuildPipeline.NIGHTLY);
  await powerAppsPage.navigateToHome();
});
```

### Conditional Functions

Check conditions programmatically:

```typescript
import {
  onlyInEnvironment,
  onlyInGeography,
  onlyInPipeline
} from '@fixtures/test-fixtures';

test('Conditional logic', async ({ powerAppsPage }) => {
  if (onlyInEnvironment(Environment.PROD)) {
    // Production-specific logic
  } else {
    // Non-production logic
  }

  if (onlyInGeography(Geography.CHINA)) {
    // China-specific logic
  }

  if (onlyInPipeline(BuildPipeline.PERFORMANCE)) {
    // Performance test logic
  }
});
```

### Multiple Filters

Combine multiple filtering conditions:

```typescript
test('Complex filtering', async ({ powerAppsPage }) => {
  skipIfNotEnvironment(Environment.TEST, Environment.STAGING);
  skipIfNotGeography(Geography.US);
  skipIfNotPipeline(BuildPipeline.CI, BuildPipeline.NIGHTLY);

  // This test only runs in:
  // - TEST or STAGING environment
  // - US geography
  // - CI or NIGHTLY pipeline

  await powerAppsPage.navigateToHome();
});
```

---

## Pre-configured Test Types

Use these specialized test types for common scenarios:

### 1. smokeTest

Critical tests that run in smoke test suites.

```typescript
import { smokeTest } from '@fixtures/test-fixtures';

smokeTest('User can login', async ({ powerAppsPage }) => {
  // Automatically tagged as:
  // - buildPipeline: SMOKE
  // - priority: P0
  // - category: SMOKE

  await powerAppsPage.navigateToHome();
});
```

### 2. nightlyTest

Tests that run in nightly builds.

```typescript
import { nightlyTest } from '@fixtures/test-fixtures';

nightlyTest('Comprehensive regression', async ({ powerAppsPage }) => {
  // Automatically tagged as:
  // - buildPipeline: NIGHTLY
  // - priority: P1

  await powerAppsPage.navigateToApps();
});
```

### 3. criticalTest

P0 tests that must always pass.

```typescript
import { criticalTest } from '@fixtures/test-fixtures';

criticalTest('Core functionality works', async ({ powerAppsPage }) => {
  // Automatically tagged as:
  // - priority: P0

  await powerAppsPage.navigateToHome();
});
```

### 4. apiTest

API-focused tests.

```typescript
import { apiTest } from '@fixtures/test-fixtures';

apiTest('Get list of apps', async ({ apiHelper }) => {
  // Automatically tagged as:
  // - category: API

  const response = await apiHelper.get('/providers/Microsoft.PowerApps/apps');
  await apiHelper.validateStatusCode(response, 200);
});
```

### 5. a11yTest

Accessibility-focused tests.

```typescript
import { a11yTest } from '@fixtures/test-fixtures';

a11yTest('Page is WCAG compliant', async ({ a11yHelper }) => {
  // Automatically tagged as:
  // - category: ACCESSIBILITY

  const results = await a11yHelper.scanPage();
  expect(results.violations).toHaveLength(0);
});
```

### 6. e2eTest

End-to-end tests.

```typescript
import { e2eTest } from '@fixtures/test-fixtures';

e2eTest('Complete user workflow', async ({ powerAppsPage, apiHelper }) => {
  // Automatically tagged as:
  // - category: E2E
  // - priority: P1

  await powerAppsPage.navigateToHome();
  // ... complete workflow
});
```

### 7. localTest

Tests that only run locally.

```typescript
import { localTest } from '@fixtures/test-fixtures';

localTest('Debug test', async ({ powerAppsPage }) => {
  // Automatically tagged as:
  // - environment: LOCAL
  // - buildPipeline: LOCAL

  await powerAppsPage.navigateToHome();
});
```

### 8. prodTest

Tests that only run in production.

```typescript
import { prodTest } from '@fixtures/test-fixtures';

prodTest('Production health check', async ({ apiHelper }) => {
  // Automatically tagged as:
  // - environment: PROD

  const response = await apiHelper.get('/api/health');
  await apiHelper.validateStatusCode(response, 200);
});
```

---

## Examples

### Example 1: Simple UI Test

```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('Navigate to Apps page', async ({ powerAppsPage, page }) => {
  await powerAppsPage.navigateToApps();
  await expect(page).toHaveTitle(/Power Apps/);
});
```

### Example 2: Environment-Specific Test

```typescript
import { test, Environment, skipIfNotEnvironment } from '@fixtures/test-fixtures';

test('Test environment configuration', async ({ config }) => {
  skipIfNotEnvironment(Environment.TEST, Environment.STAGING);

  const baseUrl = config.getPowerAppsBaseUrl();
  expect(baseUrl).toContain('test');
});
```

### Example 3: Geography-Specific Test

```typescript
import { test, Geography, skipIfNotGeography } from '@fixtures/test-fixtures';

test('China-specific features', async ({ powerAppsPage, config }) => {
  skipIfNotGeography(Geography.CHINA);

  const baseUrl = config.getPowerAppsBaseUrl();
  expect(baseUrl).toContain('.cn');

  await powerAppsPage.navigateToHome();
});
```

### Example 4: Smoke Test Suite

```typescript
import { smokeTest, expect } from '@fixtures/test-fixtures';

smokeTest('User can access home page', async ({ powerAppsPage, page }) => {
  await powerAppsPage.navigateToHome();
  await expect(page).toBeVisible();
});

smokeTest('User can access apps', async ({ powerAppsPage, page }) => {
  await powerAppsPage.navigateToApps();
  await expect(page.locator('[data-automation-id="appList"]')).toBeVisible();
});
```

### Example 5: API Test with Helpers

```typescript
import { apiTest, expect } from '@fixtures/test-fixtures';

apiTest('CRUD operations on apps', async ({ apiHelper, testLogger }) => {
  testLogger.step(1, 'Create app');
  const createResponse = await apiHelper.post('/providers/Microsoft.PowerApps/apps', {
    displayName: 'Test App'
  });
  await apiHelper.validateStatusCode(createResponse, 201);

  const appData = await createResponse.json();
  const appId = appData.name;

  testLogger.step(2, 'Get app');
  const getResponse = await apiHelper.get(`/providers/Microsoft.PowerApps/apps/${appId}`);
  await apiHelper.validateStatusCode(getResponse, 200);

  testLogger.step(3, 'Delete app');
  const deleteResponse = await apiHelper.delete(`/providers/Microsoft.PowerApps/apps/${appId}`);
  await apiHelper.validateStatusCode(deleteResponse, 200);

  testLogger.success('CRUD test completed');
});
```

### Example 6: E2E Test with All Fixtures

```typescript
import { e2eTest, expect } from '@fixtures/test-fixtures';

e2eTest(
  'Create app, verify UI, check accessibility',
  async ({ apiHelper, powerAppsPage, a11yHelper, page, testLogger }) => {
    testLogger.info('Starting E2E test');

    // 1. Create via API
    testLogger.step(1, 'Create app via API');
    const response = await apiHelper.post('/providers/Microsoft.PowerApps/apps', {
      displayName: 'E2E Test App'
    });
    const appData = await response.json();

    // 2. Verify in UI
    testLogger.step(2, 'Verify in UI');
    await powerAppsPage.navigateToApps();
    await expect(page.locator(`text=${appData.name}`)).toBeVisible();

    // 3. Check accessibility
    testLogger.step(3, 'Check accessibility');
    const a11yResults = await a11yHelper.scanPage();
    expect(a11yResults.violations.length).toBeLessThanOrEqual(5);

    // 4. Cleanup
    testLogger.step(4, 'Cleanup');
    await apiHelper.delete(`/providers/Microsoft.PowerApps/apps/${appData.name}`);

    testLogger.success('E2E test completed');
  }
);
```

### Example 7: Test Suite with Shared Options

```typescript
import { test } from '@fixtures/test-fixtures';

test.describe('Power Apps Navigation Suite', () => {
  // Set options for all tests in this suite
  test.use({
    owner: 'UI Team',
    priority: Priority.P1,
    category: TestCategory.UI
  });

  test('Navigate to Home', async ({ powerAppsPage }) => {
    await powerAppsPage.navigateToHome();
  });

  test('Navigate to Apps', async ({ powerAppsPage }) => {
    await powerAppsPage.navigateToApps();
  });

  test('Navigate to Solutions', async ({ powerAppsPage }) => {
    await powerAppsPage.navigateToSolutions();
  });
});
```

### Example 8: Nightly Performance Test

```typescript
import { nightlyTest, BuildPipeline, skipIfNotPipeline } from '@fixtures/test-fixtures';

nightlyTest('Performance - App load time', async ({ powerAppsPage, testLogger }) => {
  skipIfNotPipeline(BuildPipeline.NIGHTLY, BuildPipeline.PERFORMANCE);

  testLogger.info('Measuring app load time');

  const startTime = Date.now();
  await powerAppsPage.navigateToApps();
  const loadTime = Date.now() - startTime;

  testLogger.info(`Load time: ${loadTime}ms`);
  expect(loadTime).toBeLessThan(5000);

  testLogger.success('Performance test passed');
});
```

### Example 9: Test with Metadata Logging

```typescript
import { test, logTestMetadata, Environment, Geography } from '@fixtures/test-fixtures';

test('Test with complete metadata', async ({ powerAppsPage, testLogger }, testInfo) => {
  logTestMetadata(testInfo, {
    owner: 'Platform Team',
    environment: Environment.TEST,
    geography: Geography.US,
    buildPipeline: BuildPipeline.CI,
    priority: Priority.P1,
    category: TestCategory.UI
  });

  await powerAppsPage.navigateToHome();
});
```

### Example 10: Conditional Test Logic

```typescript
import { test, onlyInEnvironment, onlyInGeography, Environment, Geography } from '@fixtures/test-fixtures';

test('Conditional test logic', async ({ powerAppsPage, config, testLogger }) => {
  if (onlyInEnvironment(Environment.PROD)) {
    testLogger.info('Running production-specific checks');
    // Don't modify data in production
    await powerAppsPage.navigateToHome();
  } else {
    testLogger.info('Running dev/test environment checks');
    // Can create/modify test data
    await powerAppsPage.navigateToApps();
    await powerAppsPage.clickNewApp();
  }

  if (onlyInGeography(Geography.CHINA)) {
    testLogger.info('Using China-specific endpoints');
    // Use China-specific configuration
  }
});
```

---

## Best Practices

### 1. Use Pre-configured Test Types

✅ **Good:**
```typescript
smokeTest('Critical functionality', async ({ powerAppsPage }) => {
  await powerAppsPage.navigateToHome();
});
```

❌ **Bad:**
```typescript
test('Critical functionality', async ({ powerAppsPage }) => {
  test.use({
    buildPipeline: BuildPipeline.SMOKE,
    priority: Priority.P0,
    category: TestCategory.SMOKE
  });
  await powerAppsPage.navigateToHome();
});
```

### 2. Use Fixtures Instead of Manual Initialization

✅ **Good:**
```typescript
test('API test', async ({ apiHelper }) => {
  const response = await apiHelper.get('/api/endpoint');
});
```

❌ **Bad:**
```typescript
test('API test', async ({ request }) => {
  const config = ConfigHelper.getInstance();
  const apiHelper = new ApiTestHelper(request, config);
  const response = await apiHelper.get('/api/endpoint');
});
```

### 3. Use TestLogger for Output

✅ **Good:**
```typescript
test('Test with logging', async ({ testLogger }) => {
  testLogger.step(1, 'First step');
  testLogger.success('Completed');
});
```

❌ **Bad:**
```typescript
test('Test with logging', async () => {
  console.log('First step');
  console.log('Completed');
});
```

### 4. Use Skip Functions for Filtering

✅ **Good:**
```typescript
test('Environment-specific test', async ({ powerAppsPage }) => {
  skipIfNotEnvironment(Environment.TEST);
  await powerAppsPage.navigateToHome();
});
```

❌ **Bad:**
```typescript
test('Environment-specific test', async ({ powerAppsPage }) => {
  if (process.env.TEST_ENV !== 'test') {
    test.skip();
  }
  await powerAppsPage.navigateToHome();
});
```

### 5. Use Test Suites for Shared Options

✅ **Good:**
```typescript
test.describe('Navigation Suite', () => {
  test.use({ owner: 'UI Team' });

  test('Test 1', async ({ powerAppsPage }) => { /* ... */ });
  test('Test 2', async ({ powerAppsPage }) => { /* ... */ });
});
```

❌ **Bad:**
```typescript
test('Test 1', async ({ powerAppsPage }) => {
  test.use({ owner: 'UI Team' });
  /* ... */
});

test('Test 2', async ({ powerAppsPage }) => {
  test.use({ owner: 'UI Team' });
  /* ... */
});
```

### 6. Tag Tests with Appropriate Metadata

✅ **Good:**
```typescript
criticalTest('Login functionality', async ({ powerAppsPage }) => {
  // Automatically tagged as P0
  await powerAppsPage.navigateToHome();
});
```

### 7. Use Appropriate Test Types for Different Pipelines

- **PR builds** → `smokeTest` for critical paths only
- **CI builds** → `test` with `BuildPipeline.CI`
- **Nightly builds** → `nightlyTest` for comprehensive coverage
- **Local dev** → `localTest` for debugging

### 8. Organize Tests by Category

```typescript
// API tests in api-tests.spec.ts
apiTest('Test 1', async ({ apiHelper }) => { /* ... */ });

// Accessibility tests in a11y-tests.spec.ts
a11yTest('Test 1', async ({ a11yHelper }) => { /* ... */ });

// E2E tests in e2e-tests.spec.ts
e2eTest('Test 1', async ({ powerAppsPage, apiHelper }) => { /* ... */ });
```

---

## Command Line Usage

### Run All Tests

```bash
npm test
```

### Run by Environment

```bash
TEST_ENV=test npm test
TEST_ENV=prod npm test
```

### Run by Geography

```bash
TEST_GEO=us npm test
TEST_GEO=china npm test
```

### Run by Pipeline

```bash
BUILD_PIPELINE=smoke npm test
BUILD_PIPELINE=nightly npm test
```

### Combine Filters

```bash
TEST_ENV=test TEST_GEO=us BUILD_PIPELINE=ci npm test
```

### Run Specific Test File

```bash
npm test -- tests/fixtures-examples.spec.ts
```

### Run with Specific Owner

```bash
OWNER="Platform Team" npm test
```

---

## Reporting

Test metadata is automatically added as annotations and appears in:

1. **HTML Report** - View test metadata in the Playwright HTML report
2. **JUnit XML** - Metadata included in XML output for CI/CD
3. **AI Reporter** - Metadata used for intelligent failure analysis
4. **Console Output** - Colored output shows test progress

### View Reports

```bash
# Generate and view HTML report
npm run report:show

# View test health report
node scripts/generate-report.js
```

---

## Troubleshooting

### Tests Always Skipping

**Problem:** Tests skip even though conditions should match

**Solution:** Check environment variables
```bash
echo $TEST_ENV
echo $TEST_GEO
echo $BUILD_PIPELINE
```

### Fixtures Not Available

**Problem:** `powerAppsPage is not defined`

**Solution:** Import from correct location
```typescript
import { test } from '@fixtures/test-fixtures';  // ✅ Correct
import { test } from '@playwright/test';         // ❌ Wrong
```

### Path Alias Not Working

**Problem:** `Cannot find module '@fixtures/test-fixtures'`

**Solution:** Add to tsconfig.json paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@fixtures/*": ["./src/fixtures/*"]
    }
  }
}
```

---

## Migration Guide

### From Old Tests to New Fixtures

**Before:**
```typescript
import { test, expect } from '@playwright/test';
import { PowerAppsPage } from '@pages/PowerAppsPage';

test('My test', async ({ page }) => {
  const powerAppsPage = new PowerAppsPage(page);
  await powerAppsPage.navigateToHome();
});
```

**After:**
```typescript
import { test, expect } from '@fixtures/test-fixtures';

test('My test', async ({ powerAppsPage }) => {
  await powerAppsPage.navigateToHome();
});
```

---

## Additional Resources

- [Playwright Fixtures Documentation](https://playwright.dev/docs/test-fixtures)
- [README.md](../README.md) - Main project documentation
- [CLAUDE.md](../CLAUDE.md) - Comprehensive project overview
- [Example Tests](../tests/fixtures-examples.spec.ts) - Complete examples

---

**Last Updated:** 2026-01-16
