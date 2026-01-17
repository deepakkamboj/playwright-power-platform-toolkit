# API & Accessibility Testing Guide

> **Navigation:** [📚 Docs Home](README.md) | [🚀 Quick Start](QUICKSTART.md) | [📖 Quick Reference](QUICK-REFERENCE.md) | [🏠 Main README](../README.md)

Comprehensive guide to API testing and accessibility testing features in the Playwright Power Apps Testing Library.

## Table of Contents

- [API Testing](#api-testing)
  - [Power Apps API](#power-apps-api)
  - [Dataverse API](#dataverse-api)
  - [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)
  - [WCAG Compliance](#wcag-compliance)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Screen Reader Support](#screen-reader-support)

---

## API Testing

The library provides comprehensive utilities for testing Power Apps and Dataverse REST APIs.

### Setup

```typescript
import { test } from '@playwright/test';
import {
  ApiTestHelper,
  PowerAppsApiEndpoints,
  ApiAssertions,
} from '@your-org/playwright-power-apps-pom';

let apiHelper: ApiTestHelper;

test.beforeEach(async ({ request }) => {
  apiHelper = new ApiTestHelper(request, {
    baseURL: process.env.POWER_APPS_URL,
    authToken: process.env.POWER_APPS_AUTH_TOKEN,
  });
});
```

### Power Apps API

#### List All Apps

```typescript
test('Get all apps', async () => {
  const response = await apiHelper.get(PowerAppsApiEndpoints.Apps.List);
  await ApiAssertions.assertSuccess(response);

  const apps = await response.json();
  console.log(`Found ${apps.value.length} apps`);
});
```

#### Create App

```typescript
test('Create new app', async () => {
  const newApp = {
    displayName: 'My Test App',
    description: 'Created via API',
    properties: {
      appType: 'Canvas',
    },
  };

  const response = await apiHelper.post(PowerAppsApiEndpoints.Apps.Create, newApp);

  await ApiAssertions.assertStatusCode(response, 201);
  const created = await response.json();
  console.log(`Created app with ID: ${created.id}`);
});
```

#### Update App

```typescript
test('Update app', async () => {
  const appId = 'your-app-id';
  const updates = {
    description: 'Updated description',
  };

  const response = await apiHelper.patch(
    PowerAppsApiEndpoints.Apps.Update.replace('{appId}', appId),
    updates
  );

  await ApiAssertions.assertSuccess(response);
});
```

#### Delete App

```typescript
test('Delete app', async () => {
  const appId = 'your-app-id';
  const response = await apiHelper.delete(
    PowerAppsApiEndpoints.Apps.Delete.replace('{appId}', appId)
  );

  await ApiAssertions.assertStatusCode(response, 204);
});
```

### Dataverse API

#### Query Records

```typescript
test('Query contacts', async () => {
  // Basic query
  const response = await apiHelper.getDataverseRecords('contacts');

  // Query with filters
  const filtered = await apiHelper.getDataverseRecords('contacts', {
    filter: "firstname eq 'John'",
    select: ['firstname', 'lastname', 'emailaddress1'],
    top: 10,
    orderBy: ['lastname asc'],
  });

  await ApiAssertions.assertSuccess(filtered);
  const data = await filtered.json();
  console.log(`Found ${data.value.length} matching contacts`);
});
```

#### Create Record

```typescript
test('Create contact', async () => {
  const newContact = {
    firstname: 'Jane',
    lastname: 'Doe',
    emailaddress1: 'jane.doe@example.com',
    telephone1: '555-0123',
  };

  const response = await apiHelper.createDataverseRecord('contacts', newContact);
  await ApiAssertions.assertStatusCode(response, 204);

  // Extract record ID from response headers
  const recordId = response.headers()['odata-entityid'];
  console.log(`Created contact: ${recordId}`);
});
```

#### Update Record

```typescript
test('Update contact', async () => {
  const contactId = 'your-contact-id';
  const updates = {
    telephone1: '555-9999',
    mobilephone: '555-8888',
  };

  const response = await apiHelper.updateDataverseRecord('contacts', contactId, updates);

  await ApiAssertions.assertStatusCode(response, 204);
});
```

#### Delete Record

```typescript
test('Delete contact', async () => {
  const contactId = 'your-contact-id';
  const response = await apiHelper.deleteDataverseRecord('contacts', contactId);
  await ApiAssertions.assertStatusCode(response, 204);
});
```

### Performance Testing

#### Measure Response Time

```typescript
test('API performance', async () => {
  const { response, duration } = await apiHelper.measureResponseTime(
    PowerAppsApiEndpoints.Apps.List
  );

  console.log(`Response time: ${duration}ms`);
  await ApiAssertions.assertSuccess(response);
  await ApiAssertions.assertResponseTime(response, 3000); // Max 3 seconds
});
```

#### Load Testing

```typescript
test('Concurrent requests', async () => {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(apiHelper.get(PowerAppsApiEndpoints.Apps.List));
  }

  const startTime = Date.now();
  const responses = await Promise.all(promises);
  const duration = Date.now() - startTime;

  console.log(`10 concurrent requests completed in ${duration}ms`);

  for (const response of responses) {
    await ApiAssertions.assertSuccess(response);
  }
});
```

#### Custom Headers & Validation

```typescript
test('Custom headers', async () => {
  const response = await apiHelper.get(PowerAppsApiEndpoints.Apps.List, {
    headers: {
      Prefer: 'odata.include-annotations="*"',
    },
  });

  await ApiAssertions.assertHeaders(response, {
    'content-type': /application\/json/,
    'odata-version': '4.0',
  });
});
```

---

## Accessibility Testing

Test WCAG compliance and ensure your Power Apps are accessible to all users.

### Setup

```typescript
import { test, expect } from '@playwright/test';
import {
  AccessibilityTestHelper,
  AccessibilityAssertions,
  WCAGLevel,
  AccessibilityRules,
} from '@your-org/playwright-power-apps-pom';

let a11yHelper: AccessibilityTestHelper;

test.beforeEach(async ({ page }) => {
  a11yHelper = new AccessibilityTestHelper(page);
  await page.goto('/');
});
```

### WCAG Compliance

#### Full Page Scan

```typescript
test('WCAG 2 AA compliance', async () => {
  const results = await a11yHelper.scanPage({
    wcagLevel: WCAGLevel.AA,
  });

  // No violations allowed
  await a11yHelper.assertNoViolations(results);

  // Generate report
  const report = a11yHelper.generateReport(results);
  console.log(report);
});
```

#### Allow Minor Warnings

```typescript
test('Critical violations only', async () => {
  const results = await a11yHelper.scanPage();

  // Allow warnings, but fail on critical/serious issues
  await a11yHelper.assertNoCriticalViolations(results);
});
```

#### Component-Specific Scan

```typescript
test('Scan specific component', async () => {
  const results = await a11yHelper.scanElement('[data-automationid="AppsList"]', {
    wcagLevel: WCAGLevel.AA,
  });

  await a11yHelper.assertNoViolations(results);
});
```

#### Specific Rules

```typescript
test('Color contrast only', async () => {
  const results = await a11yHelper.scanPage({
    rules: [AccessibilityRules.ColorContrast],
  });

  await a11yHelper.assertNoViolations(results);
});

test('ARIA validation', async () => {
  const results = await a11yHelper.scanPage({
    rules: [
      AccessibilityRules.AriaRoles,
      AccessibilityRules.AriaRequired,
      AccessibilityRules.AriaValid,
    ],
  });

  await a11yHelper.assertNoViolations(results);
});
```

### Keyboard Navigation

#### Test Tab Order

```typescript
test('Tab order', async ({ page }) => {
  await page.goto('/apps');

  const expectedTabOrder = [
    '[data-automationid="NewAppButton"]',
    '[data-automationid="SearchBox"]',
    '[data-automationid="FilterDropdown"]',
  ];

  await a11yHelper.testTabOrder(expectedTabOrder);
});
```

#### Test Keyboard Accessibility

```typescript
test('Elements are keyboard accessible', async ({ page }) => {
  const elements = ['button[name="New app"]', 'input[type="text"]', 'a[href="/solutions"]'];

  await a11yHelper.testKeyboardNavigation(elements);
});
```

#### Keyboard Shortcuts

```typescript
test('Keyboard shortcuts work', async ({ page }) => {
  await page.goto('/apps');

  // Test Ctrl+F for search
  await a11yHelper.testKeyboardShortcut('Control+f', async () => {
    await expect(page.locator('[role="searchbox"]')).toBeFocused();
  });

  // Test Escape to close
  await a11yHelper.testKeyboardShortcut('Escape', async () => {
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
```

### Screen Reader Support

#### ARIA Labels

```typescript
test('ARIA labels present', async ({ page }) => {
  await page.goto('/apps');

  const button = page.locator('[data-automationid="NewAppButton"]');
  await a11yHelper.assertAriaLabel(button, 'Create new app');
});
```

#### Accessible Names

```typescript
test('Elements have accessible names', async ({ page }) => {
  await page.goto('/apps');

  const searchBox = page.locator('[data-automationid="SearchBox"]');
  await a11yHelper.assertAccessibleName(searchBox, 'Search');
});
```

#### Custom Assertions

```typescript
test('Custom accessibility checks', async ({ page }) => {
  await page.goto('/apps');

  const mainButton = page.locator('button:has-text("Create")');

  // Keyboard accessible
  await AccessibilityAssertions.assertKeyboardAccessible(mainButton);

  // Has ARIA role
  await AccessibilityAssertions.assertAriaRole(mainButton, 'button');

  // Has screen reader text
  await AccessibilityAssertions.assertScreenReaderText(mainButton);
});
```

### Common Checks

#### Form Labels

```typescript
test('Form fields are labeled', async () => {
  await a11yHelper.assertFormFieldsLabeled();
});
```

#### Image Alt Text

```typescript
test('Images have alt text', async () => {
  await a11yHelper.assertImagesHaveAltText();
});
```

#### Heading Hierarchy

```typescript
test('Heading structure is correct', async () => {
  await a11yHelper.assertHeadingHierarchy();
});
```

#### Color Contrast

```typescript
test('Color contrast meets standards', async ({ page }) => {
  await page.goto('/apps');
  await a11yHelper.checkColorContrast('body');
});
```

### Reporting

#### Generate Text Report

```typescript
test('Generate accessibility report', async () => {
  const results = await a11yHelper.scanPage();

  const report = a11yHelper.generateReport(results);
  console.log(report);
});
```

#### Save to File

```typescript
test('Save accessibility report', async () => {
  const results = await a11yHelper.scanPage({
    wcagLevel: WCAGLevel.AA,
  });

  await a11yHelper.saveReport(results, 'test-results/a11y-report.txt');
});
```

---

## Best Practices

### API Testing

1. **Use environment variables** for URLs and tokens
2. **Test error scenarios** (404, 401, 500, etc.)
3. **Validate response schemas** with `assertJsonStructure()`
4. **Monitor performance** with `measureResponseTime()`
5. **Clean up test data** in `afterEach` hooks

### Accessibility Testing

1. **Run scans early** in development
2. **Test at multiple WCAG levels** (A, AA, AAA)
3. **Focus on critical paths** first
4. **Test keyboard navigation** for all interactive elements
5. **Validate ARIA** attributes and roles
6. **Check color contrast** for text readability
7. **Save reports** for compliance documentation

### Combined Testing

```typescript
test('Full E2E validation', async ({ page, request }) => {
  // 1. API Test - Create app
  const apiHelper = new ApiTestHelper(request, {
    /* config */
  });
  const createResponse = await apiHelper.post(PowerAppsApiEndpoints.Apps.Create, {
    displayName: 'Accessible App',
  });
  await ApiAssertions.assertSuccess(createResponse);

  // 2. UI Test - Verify in UI
  const powerAppsPage = new PowerAppsPage(page);
  await powerAppsPage.navigateToApps();
  await expect(powerAppsPage.findApp('Accessible App')).toBeVisible();

  // 3. Accessibility Test - Verify WCAG compliance
  const a11yHelper = new AccessibilityTestHelper(page);
  const results = await a11yHelper.scanPage({ wcagLevel: WCAGLevel.AA });
  await a11yHelper.assertNoViolations(results);

  // 4. Cleanup via API
  const appId = (await createResponse.json()).id;
  await apiHelper.delete(PowerAppsApiEndpoints.Apps.Delete.replace('{appId}', appId));
});
```

---

## Example Test Files

Explore complete working examples:

- 🧪 **[API Testing Examples](../tests/examples/api-testing-examples.spec.ts)** - Power Apps & Dataverse API tests
- ♿ **[Accessibility Testing Examples](../tests/examples/accessibility-examples.spec.ts)** - WCAG compliance tests
- 🎯 **[UI Testing Examples](../tests/powerapps-page.spec.ts)** - PowerAppsPage POM tests

## Additional Resources

- 📚 **[Documentation Index](README.md)** - All documentation
- 📖 **[Quick Reference](QUICK-REFERENCE.md)** - Code snippets and cheat sheets
- 🚀 **[Quick Start](QUICKSTART.md)** - Get started quickly
- 🏠 **[Main README](../README.md)** - Complete library documentation

### External Links

- 🌐 [Power Apps REST API Documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview)
- 🔌 [Dataverse Web API](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/perform-operations-web-api)
- ♿ [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- 🎨 [Axe Accessibility Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

---

> **Next:** Check out the [Quick Reference](QUICK-REFERENCE.md) for handy code snippets! 📖

- [axe-core Accessibility Engine](https://github.com/dequelabs/axe-core)
