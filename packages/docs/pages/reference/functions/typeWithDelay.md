[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / typeWithDelay

# Function: typeWithDelay()

> **typeWithDelay**(`page`, `selector`, `text`, `delay`): `Promise`\<`void`\>

Defined in: [utils/app-helpers.ts:246](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/app-helpers.ts#L246)

Clear and type with delay (for better stability)

## Parameters

### page

`Page`

Playwright page object

### selector

`string`

Input selector

### text

`string`

Text to type

### delay

`number` = `50`

Delay between keystrokes in ms (default: 50)

## Returns

`Promise`\<`void`\>
