[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ApiAssertions

# Class: ApiAssertions

Defined in: utils/api-testing.ts:312

Common API test assertions

## Constructors

### Constructor

> **new ApiAssertions**(): `ApiAssertions`

#### Returns

`ApiAssertions`

## Methods

### assertSuccess()

> `static` **assertSuccess**(`response`): `Promise`\<`void`\>

Defined in: utils/api-testing.ts:318

Assert successful response (2xx status code)

#### Parameters

##### response

`APIResponse`

API response

#### Returns

`Promise`\<`void`\>

---

### assertStatusCode()

> `static` **assertStatusCode**(`response`, `statusCode`): `Promise`\<`void`\>

Defined in: utils/api-testing.ts:328

Assert response status code

#### Parameters

##### response

`APIResponse`

API response

##### statusCode

`number`

Expected HTTP status code

#### Returns

`Promise`\<`void`\>

---

### assertHeaders()

> `static` **assertHeaders**(`response`, `headers`): `Promise`\<`void`\>

Defined in: utils/api-testing.ts:338

Assert response has expected headers

#### Parameters

##### response

`APIResponse`

API response

##### headers

`Record`\<`string`, `string`\>

Expected headers as key-value pairs

#### Returns

`Promise`\<`void`\>

---

### assertResponseTime()

> `static` **assertResponseTime**(`duration`, `maxMs`): `void`

Defined in: utils/api-testing.ts:354

Assert response time is within threshold

#### Parameters

##### duration

`number`

Actual duration in milliseconds

##### maxMs

`number`

Maximum allowed duration in milliseconds

#### Returns

`void`

---

### assertJsonStructure()

> `static` **assertJsonStructure**(`response`, `structure`): `Promise`\<`void`\>

Defined in: utils/api-testing.ts:364

Assert JSON response structure

#### Parameters

##### response

`APIResponse`

API response

##### structure

`any`

Expected structure

#### Returns

`Promise`\<`void`\>
