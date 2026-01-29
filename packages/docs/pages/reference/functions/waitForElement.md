[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / waitForElement

# Function: waitForElement()

> **waitForElement**(`page`, `selector`, `timeout`): `Promise`\<`Locator`\>

Defined in: [utils/app-helpers.ts:39](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/app-helpers.ts#L39)

Wait for element to be visible with custom timeout

## Parameters

### page

`Page`

Playwright page object

### selector

`string`

Element selector

### timeout

`number` = `30000`

Timeout in milliseconds (default: 30000)

## Returns

`Promise`\<`Locator`\>
