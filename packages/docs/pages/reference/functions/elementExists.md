[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / elementExists

# Function: elementExists()

> **elementExists**(`page`, `selector`, `timeout`): `Promise`\<`boolean`\>

Defined in: utils/app-helpers.ts:138

Check if element exists without throwing error

## Parameters

### page

`Page`

Playwright page object

### selector

`string`

Element selector

### timeout

`number` = `5000`

Timeout in milliseconds (default: 5000)

## Returns

`Promise`\<`boolean`\>

True if element exists, false otherwise
