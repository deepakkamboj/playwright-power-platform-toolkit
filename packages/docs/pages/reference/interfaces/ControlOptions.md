[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ControlOptions

# Interface: ControlOptions

Defined in: [types/index.ts:84](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/types/index.ts#L84)

Control Locator Options

## Properties

### name

> **name**: `string`

Defined in: [types/index.ts:86](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/types/index.ts#L86)

Control name (aria-label or name attribute)

---

### type?

> `optional` **type**: [`CanvasControlType`](../enumerations/CanvasControlType.md)

Defined in: [types/index.ts:88](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/types/index.ts#L88)

Control type (Button, TextInput, etc.)

---

### timeout?

> `optional` **timeout**: `number`

Defined in: [types/index.ts:90](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/types/index.ts#L90)

Timeout in milliseconds (default: 10000)

---

### exact?

> `optional` **exact**: `boolean`

Defined in: [types/index.ts:92](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/types/index.ts#L92)

Exact text match (default: false)
