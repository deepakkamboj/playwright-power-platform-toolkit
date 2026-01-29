[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ApiRecorderOptions

# Interface: ApiRecorderOptions

Defined in: [utils/api-recorder.ts:20](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L20)

Configuration options for API recording

## Properties

### urlFilter?

> `optional` **urlFilter**: `RegExp`

Defined in: [utils/api-recorder.ts:22](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L22)

URL filter pattern (RegExp) to match API endpoints

---

### resourceTypes?

> `optional` **resourceTypes**: `string`[]

Defined in: [utils/api-recorder.ts:24](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L24)

Resource types to record (default: ['xhr', 'fetch'])

---

### includeRequestHeaders?

> `optional` **includeRequestHeaders**: `boolean`

Defined in: [utils/api-recorder.ts:26](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L26)

Include request headers in recording

---

### includeResponseHeaders?

> `optional` **includeResponseHeaders**: `boolean`

Defined in: [utils/api-recorder.ts:28](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L28)

Include response headers in recording

---

### includeRequestBody?

> `optional` **includeRequestBody**: `boolean`

Defined in: [utils/api-recorder.ts:30](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L30)

Include request body in recording

---

### includeResponseBody?

> `optional` **includeResponseBody**: `boolean`

Defined in: [utils/api-recorder.ts:32](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L32)

Include response body in recording

---

### maxResponseBodySize?

> `optional` **maxResponseBodySize**: `number`

Defined in: [utils/api-recorder.ts:34](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L34)

Maximum response body size to record in bytes (default: 500KB)
