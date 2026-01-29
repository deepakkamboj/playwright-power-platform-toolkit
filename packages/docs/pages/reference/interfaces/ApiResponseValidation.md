[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ApiResponseValidation

# Interface: ApiResponseValidation

Defined in: [utils/api-utilities.ts:245](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L245)

API response validation result

## Properties

### success

> **success**: `boolean`

Defined in: [utils/api-utilities.ts:247](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L247)

Whether the response was successful (2xx status)

---

### status

> **status**: `number`

Defined in: [utils/api-utilities.ts:249](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L249)

HTTP status code

---

### requestId?

> `optional` **requestId**: `string`

Defined in: [utils/api-utilities.ts:251](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L251)

Request tracking ID if available

---

### contentType?

> `optional` **contentType**: `string`

Defined in: [utils/api-utilities.ts:253](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L253)

Content-Type header value

---

### headers

> **headers**: `object`

Defined in: [utils/api-utilities.ts:255](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L255)

All response headers

#### Index Signature

\[`key`: `string`\]: `string`

---

### data

> **data**: `any`

Defined in: [utils/api-utilities.ts:257](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L257)

Parsed response data (if JSON)
