[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / ApiResponseValidation

# Interface: ApiResponseValidation

Defined in: utils/api-utilities.ts:245

API response validation result

## Properties

### success

> **success**: `boolean`

Defined in: utils/api-utilities.ts:247

Whether the response was successful (2xx status)

***

### status

> **status**: `number`

Defined in: utils/api-utilities.ts:249

HTTP status code

***

### requestId?

> `optional` **requestId**: `string`

Defined in: utils/api-utilities.ts:251

Request tracking ID if available

***

### contentType?

> `optional` **contentType**: `string`

Defined in: utils/api-utilities.ts:253

Content-Type header value

***

### headers

> **headers**: `object`

Defined in: utils/api-utilities.ts:255

All response headers

#### Index Signature

\[`key`: `string`\]: `string`

***

### data

> **data**: `any`

Defined in: utils/api-utilities.ts:257

Parsed response data (if JSON)
