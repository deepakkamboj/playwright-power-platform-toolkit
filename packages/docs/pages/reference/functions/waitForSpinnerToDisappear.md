[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / waitForSpinnerToDisappear

# Function: waitForSpinnerToDisappear()

> **waitForSpinnerToDisappear**(`page`, `spinnerSelector`, `timeout`): `Promise`\<`void`\>

Defined in: utils/app-helpers.ts:70

Wait for spinner/loading indicator to disappear

## Parameters

### page

`Page`

Playwright page object

### spinnerSelector

`string` = `'[role="progressbar"][aria-label="Loading"]'`

Spinner selector (default: common spinner)

### timeout

`number` = `60000`

Timeout in milliseconds (default: 60000)

## Returns

`Promise`\<`void`\>
