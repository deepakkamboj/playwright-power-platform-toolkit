[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / clickWithRetry

# Function: clickWithRetry()

> **clickWithRetry**(`page`, `selector`, `retries`): `Promise`\<`void`\>

Defined in: [utils/app-helpers.ts:89](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/app-helpers.ts#L89)

Click element with retry logic

## Parameters

### page

`Page`

Playwright page object

### selector

`string`

Element selector

### retries

`number` = `3`

Number of retries (default: 3)

## Returns

`Promise`\<`void`\>
