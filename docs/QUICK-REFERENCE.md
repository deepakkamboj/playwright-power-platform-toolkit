# Quick Reference - Cheat Sheet

> **Navigation:** [📚 Docs Home](README.md) | [🚀 Quick Start](QUICKSTART.md) | [🧪 API & A11y Guide](API-ACCESSIBILITY-GUIDE.md) | [🏠 Main README](../README.md)

Quick reference for common patterns, code snippets, and helper functions.

## API Testing Quick Reference

### Setup

```typescript
import {
  ApiTestHelper,
  PowerAppsApiEndpoints,
  ApiAssertions,
} from '@your-org/playwright-power-apps-pom';

const apiHelper = new ApiTestHelper(request, {
  baseURL: process.env.POWER_APPS_URL,
  authToken: process.env.AUTH_TOKEN,
});
```

### Common Operations

| Operation          | Code                                                                           |
| ------------------ | ------------------------------------------------------------------------------ |
| **GET request**    | `await apiHelper.get(endpoint)`                                                |
| **POST request**   | `await apiHelper.post(endpoint, data)`                                         |
| **PATCH request**  | `await apiHelper.patch(endpoint, data)`                                        |
| **DELETE request** | `await apiHelper.delete(endpoint)`                                             |
| **Assert success** | `await ApiAssertions.assertSuccess(response)`                                  |
| **Assert status**  | `await ApiAssertions.assertStatusCode(response, 200)`                          |
| **Measure time**   | `const { response, duration } = await apiHelper.measureResponseTime(endpoint)` |

### Dataverse Operations

| Operation         | Code                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| **Query records** | `await apiHelper.getDataverseRecords('contacts', { filter, select, top })` |
| **Create record** | `await apiHelper.createDataverseRecord('contacts', data)`                  |
| **Update record** | `await apiHelper.updateDataverseRecord('contacts', id, data)`              |
| **Delete record** | `await apiHelper.deleteDataverseRecord('contacts', id)`                    |

### API Endpoints

| Endpoint          | Constant                                  |
| ----------------- | ----------------------------------------- |
| List apps         | `PowerAppsApiEndpoints.Apps.List`         |
| Create app        | `PowerAppsApiEndpoints.Apps.Create`       |
| Update app        | `PowerAppsApiEndpoints.Apps.Update`       |
| Delete app        | `PowerAppsApiEndpoints.Apps.Delete`       |
| List solutions    | `PowerAppsApiEndpoints.Solutions.List`    |
| Export solution   | `PowerAppsApiEndpoints.Solutions.Export`  |
| Dataverse records | `PowerAppsApiEndpoints.Dataverse.Records` |

---

## Accessibility Testing Quick Reference

### Setup

```typescript
import {
  AccessibilityTestHelper,
  AccessibilityAssertions,
  WCAGLevel,
  AccessibilityRules,
} from '@your-org/playwright-power-apps-pom';

const a11yHelper = new AccessibilityTestHelper(page);
```

### Common Operations

| Operation                | Code                                                                     |
| ------------------------ | ------------------------------------------------------------------------ |
| **Scan page (WCAG AA)**  | `const results = await a11yHelper.scanPage({ wcagLevel: WCAGLevel.AA })` |
| **Scan element**         | `const results = await a11yHelper.scanElement(selector, { wcagLevel })`  |
| **Assert no violations** | `await a11yHelper.assertNoViolations(results)`                           |
| **Assert no critical**   | `await a11yHelper.assertNoCriticalViolations(results)`                   |
| **Test tab order**       | `await a11yHelper.testTabOrder([selector1, selector2])`                  |
| **Test keyboard nav**    | `await a11yHelper.testKeyboardNavigation([selectors])`                   |
| **Check ARIA label**     | `await a11yHelper.assertAriaLabel(locator, 'Expected')`                  |
| **Check color contrast** | `await a11yHelper.checkColorContrast(selector)`                          |
| **Generate report**      | `const report = a11yHelper.generateReport(results)`                      |
| **Save report**          | `await a11yHelper.saveReport(results, 'path.txt')`                       |

### WCAG Levels

| Level   | Enum            | Description                       |
| ------- | --------------- | --------------------------------- |
| **A**   | `WCAGLevel.A`   | Basic accessibility               |
| **AA**  | `WCAGLevel.AA`  | Standard compliance (recommended) |
| **AAA** | `WCAGLevel.AAA` | Enhanced accessibility            |

### Accessibility Rules

| Rule               | Constant                              | Checks              |
| ------------------ | ------------------------------------- | ------------------- |
| **Color contrast** | `AccessibilityRules.ColorContrast`    | Text readability    |
| **ARIA roles**     | `AccessibilityRules.AriaRoles`        | Proper roles        |
| **ARIA required**  | `AccessibilityRules.AriaRequired`     | Required attributes |
| **Image alt**      | `AccessibilityRules.ImageAlt`         | Image alt text      |
| **Form labels**    | `AccessibilityRules.LabelAssociation` | Form field labels   |
| **Heading order**  | `AccessibilityRules.HeadingOrder`     | H1-H6 hierarchy     |
| **Link names**     | `AccessibilityRules.LinkName`         | Link text           |
| **Landmarks**      | `AccessibilityRules.Landmarks`        | Page structure      |

### Custom Assertions

| Assertion               | Code                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| **Keyboard accessible** | `await AccessibilityAssertions.assertKeyboardAccessible(locator)` |
| **ARIA role**           | `await AccessibilityAssertions.assertAriaRole(locator, 'button')` |
| **Screen reader text**  | `await AccessibilityAssertions.assertScreenReaderText(locator)`   |
| **Not in tab order**    | `await AccessibilityAssertions.assertNotInTabOrder(locator)`      |

---

## Combined Testing Pattern

```typescript
test('Complete E2E test', async ({ page, request }) => {
  // 1. API Setup
  const apiHelper = new ApiTestHelper(request, { baseURL, authToken });
  const response = await apiHelper.post(PowerAppsApiEndpoints.Apps.Create, appData);

  // 2. UI Validation
  const powerAppsPage = new PowerAppsPage(page);
  await powerAppsPage.navigateToApps();
  await expect(powerAppsPage.findApp('Test App')).toBeVisible();

  // 3. Accessibility Check
  const a11yHelper = new AccessibilityTestHelper(page);
  const results = await a11yHelper.scanPage({ wcagLevel: WCAGLevel.AA });
  await a11yHelper.assertNoViolations(results);

  // 4. Cleanup
  const appId = (await response.json()).id;
  await apiHelper.delete(PowerAppsApiEndpoints.Apps.Delete.replace('{appId}', appId));
});
```

---

## Environment Variables

```env
# Power Apps API
POWER_APPS_URL=https://api.powerapps.com/providers/Microsoft.PowerApps
POWER_APPS_AUTH_TOKEN=Bearer xxx

# Dataverse API
DATAVERSE_URL=https://your-org.crm.dynamics.com/api/data/v9.2
DATAVERSE_AUTH_TOKEN=Bearer xxx

# Authentication
MS_AUTH_EMAIL=user@domain.com
MS_USER_PASSWORD=password
AZURE_TENANT_ID=your-tenant-id
```

---

## Common Patterns

### API Testing Pattern

```typescript
test('API CRUD operations', async ({ request }) => {
  const api = new ApiTestHelper(request, config);

  // Create
  const create = await api.post(endpoint, data);
  await ApiAssertions.assertStatusCode(create, 201);

  // Read
  const read = await api.get(endpoint);
  await ApiAssertions.assertSuccess(read);

  // Update
  const update = await api.patch(endpoint, updates);
  await ApiAssertions.assertSuccess(update);

  // Delete
  const del = await api.delete(endpoint);
  await ApiAssertions.assertStatusCode(del, 204);
});
```

### Accessibility Testing Pattern

```typescript
test('Full accessibility check', async ({ page }) => {
  const a11y = new AccessibilityTestHelper(page);

  // Navigate
  await page.goto('/apps');

  // Scan for violations
  const results = await a11y.scanPage({ wcagLevel: WCAGLevel.AA });

  // Keyboard navigation
  await a11y.testTabOrder([selector1, selector2]);

  // ARIA validation
  const button = page.locator('button');
  await a11y.assertAriaLabel(button, 'Expected label');

  // Assert compliance
  await a11y.assertNoViolations(results);

  // Save report
  await a11y.saveReport(results, 'a11y-report.txt');
});
```

### Performance Testing Pattern

```typescript
test('API performance', async ({ request }) => {
  const api = new ApiTestHelper(request, config);

  // Single request
  const { response, duration } = await api.measureResponseTime(endpoint);
  expect(duration).toBeLessThan(3000);

  // Concurrent requests
  const promises = Array(10)
    .fill(null)
    .map(() => api.get(endpoint));
  const start = Date.now();
  await Promise.all(promises);
  const totalTime = Date.now() - start;

  console.log(`10 concurrent requests: ${totalTime}ms`);
  expect(totalTime).toBeLessThan(15000);
});
```

---

## Troubleshooting

| Issue                        | Solution                                         |
| ---------------------------- | ------------------------------------------------ |
| **401 Unauthorized**         | Check `AUTH_TOKEN` in `.env`                     |
| **404 Not Found**            | Verify `baseURL` is correct                      |
| **Timeout on API**           | Increase timeout in request config               |
| **Accessibility violations** | Review report with `generateReport()`            |
| **False positives in a11y**  | Use `disableRules` option to skip specific rules |
| **Color contrast fails**     | May need to disable for custom-themed apps       |

---

## Additional Resources

- 📚 **[Documentation Index](README.md)** - All documentation
- 🚀 **[Quick Start Guide](QUICKSTART.md)** - Get started quickly
- 🧪 **[API & Accessibility Guide](API-ACCESSIBILITY-GUIDE.md)** - Detailed feature documentation
- 🏠 **[Main README](../README.md)** - Complete library documentation
- 🔍 **[Example Tests](../tests/examples/)** - More code examples

---

> **Tip:** Bookmark this page for quick access to common code patterns! 🔖

- **Example Tests**: `tests/examples/`
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Power Apps API**: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview
