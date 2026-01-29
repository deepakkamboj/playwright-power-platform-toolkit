[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / RecordedApiCall

# Interface: RecordedApiCall

Defined in: utils/api-recorder.ts:40

Recorded API call data

## Properties

### id

> **id**: `string`

Defined in: utils/api-recorder.ts:42

Unique identifier for this call

---

### timestamp

> **timestamp**: `number`

Defined in: utils/api-recorder.ts:44

Request timestamp

---

### method

> **method**: `string`

Defined in: utils/api-recorder.ts:46

HTTP method

---

### url

> **url**: `string`

Defined in: utils/api-recorder.ts:48

Request URL

---

### requestHeaders?

> `optional` **requestHeaders**: `Record`\<`string`, `string`\>

Defined in: utils/api-recorder.ts:50

Request headers (if enabled)

---

### requestBody?

> `optional` **requestBody**: `any`

Defined in: utils/api-recorder.ts:52

Request body (if enabled)

---

### status?

> `optional` **status**: `number`

Defined in: utils/api-recorder.ts:54

Response status code

---

### statusText?

> `optional` **statusText**: `string`

Defined in: utils/api-recorder.ts:56

Response status text

---

### responseHeaders?

> `optional` **responseHeaders**: `Record`\<`string`, `string`\>

Defined in: utils/api-recorder.ts:58

Response headers (if enabled)

---

### responseBody?

> `optional` **responseBody**: `any`

Defined in: utils/api-recorder.ts:60

Response body (if enabled)

---

### contentType?

> `optional` **contentType**: `string`

Defined in: utils/api-recorder.ts:62

Response content type

---

### duration?

> `optional` **duration**: `number`

Defined in: utils/api-recorder.ts:64

Request duration in milliseconds

---

### error?

> `optional` **error**: `string`

Defined in: utils/api-recorder.ts:66

Error message if request failed
