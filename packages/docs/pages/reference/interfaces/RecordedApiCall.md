[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / RecordedApiCall

# Interface: RecordedApiCall

Defined in: [utils/api-recorder.ts:40](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L40)

Recorded API call data

## Properties

### id

> **id**: `string`

Defined in: [utils/api-recorder.ts:42](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L42)

Unique identifier for this call

---

### timestamp

> **timestamp**: `number`

Defined in: [utils/api-recorder.ts:44](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L44)

Request timestamp

---

### method

> **method**: `string`

Defined in: [utils/api-recorder.ts:46](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L46)

HTTP method

---

### url

> **url**: `string`

Defined in: [utils/api-recorder.ts:48](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L48)

Request URL

---

### requestHeaders?

> `optional` **requestHeaders**: `Record`\<`string`, `string`\>

Defined in: [utils/api-recorder.ts:50](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L50)

Request headers (if enabled)

---

### requestBody?

> `optional` **requestBody**: `any`

Defined in: [utils/api-recorder.ts:52](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L52)

Request body (if enabled)

---

### status?

> `optional` **status**: `number`

Defined in: [utils/api-recorder.ts:54](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L54)

Response status code

---

### statusText?

> `optional` **statusText**: `string`

Defined in: [utils/api-recorder.ts:56](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L56)

Response status text

---

### responseHeaders?

> `optional` **responseHeaders**: `Record`\<`string`, `string`\>

Defined in: [utils/api-recorder.ts:58](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L58)

Response headers (if enabled)

---

### responseBody?

> `optional` **responseBody**: `any`

Defined in: [utils/api-recorder.ts:60](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L60)

Response body (if enabled)

---

### contentType?

> `optional` **contentType**: `string`

Defined in: [utils/api-recorder.ts:62](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L62)

Response content type

---

### duration?

> `optional` **duration**: `number`

Defined in: [utils/api-recorder.ts:64](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L64)

Request duration in milliseconds

---

### error?

> `optional` **error**: `string`

Defined in: [utils/api-recorder.ts:66](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L66)

Error message if request failed
