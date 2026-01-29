[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ApiTestHelper

# Class: ApiTestHelper

Defined in: [utils/api-testing.ts:62](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L62)

API Test Helper for Power Apps and Power Platform

## Example

```typescript
import { test, request } from '@playwright/test';
import { ApiTestHelper } from '@playwright-power-platform/toolkit';

test('API test', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://yourorg.crm.dynamics.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apiHelper = new ApiTestHelper(apiContext);
  const response = await apiHelper.getDataverseRecords('accounts');
  await apiHelper.assertStatus(response, 200);
});
```

## Constructors

### Constructor

> **new ApiTestHelper**(`request`, `baseUrl?`): `ApiTestHelper`

Defined in: [utils/api-testing.ts:72](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L72)

Create a new API test helper

#### Parameters

##### request

`APIRequestContext`

Playwright API request context

##### baseUrl?

`string`

Optional base URL (defaults to ConfigHelper.getBaseUrl())

#### Returns

`ApiTestHelper`

## Methods

### get()

> **get**(`endpoint`, `options?`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:91](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L91)

Make a GET request to Power Apps API

#### Parameters

##### endpoint

`string`

API endpoint path

##### options?

Optional query parameters

###### params?

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`APIResponse`\>

API response

#### Example

```typescript
const response = await apiHelper.get('/api/apps', {
  params: { $top: '10' },
});
```

---

### post()

> **post**(`endpoint`, `data`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:103](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L103)

Make a POST request to Power Apps API

#### Parameters

##### endpoint

`string`

API endpoint path

##### data

`any`

Request body data

#### Returns

`Promise`\<`APIResponse`\>

API response

---

### patch()

> **patch**(`endpoint`, `data`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:115](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L115)

Make a PATCH request to Power Apps API

#### Parameters

##### endpoint

`string`

API endpoint path

##### data

`any`

Request body data

#### Returns

`Promise`\<`APIResponse`\>

API response

---

### delete()

> **delete**(`endpoint`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:126](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L126)

Make a DELETE request to Power Apps API

#### Parameters

##### endpoint

`string`

API endpoint path

#### Returns

`Promise`\<`APIResponse`\>

API response

---

### assertStatus()

> **assertStatus**(`response`, `expectedStatus`): `Promise`\<`void`\>

Defined in: [utils/api-testing.ts:151](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L151)

Assert API response status

#### Parameters

##### response

`APIResponse`

API response

##### expectedStatus

`number`

Expected HTTP status code

#### Returns

`Promise`\<`void`\>

---

### assertResponseContains()

> **assertResponseContains**(`response`, `expectedData`): `Promise`\<`void`\>

Defined in: [utils/api-testing.ts:161](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L161)

Assert API response contains data

#### Parameters

##### response

`APIResponse`

API response

##### expectedData

`any`

Expected data object

#### Returns

`Promise`\<`void`\>

---

### getDataverseRecords()

> **getDataverseRecords**(`tableName`, `options?`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:185](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L185)

Get Dataverse table records with OData query options

#### Parameters

##### tableName

`string`

Logical name of the table (e.g., 'accounts', 'contacts')

##### options?

OData query options

###### select?

`string`[]

Fields to select

###### filter?

`string`

OData filter expression

###### top?

`number`

Number of records to return

#### Returns

`Promise`\<`APIResponse`\>

API response

#### Example

```typescript
const response = await apiHelper.getDataverseRecords('accounts', {
  select: ['name', 'accountid'],
  filter: "name eq 'Contoso'",
  top: 10,
});
```

---

### createDataverseRecord()

> **createDataverseRecord**(`tableName`, `data`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:223](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L223)

Create a Dataverse record

#### Parameters

##### tableName

`string`

Logical name of the table

##### data

`any`

Record data

#### Returns

`Promise`\<`APIResponse`\>

API response

#### Example

```typescript
const response = await apiHelper.createDataverseRecord('accounts', {
  name: 'Contoso Ltd',
  telephone1: '555-0100',
});
```

---

### updateDataverseRecord()

> **updateDataverseRecord**(`tableName`, `recordId`, `data`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:235](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L235)

Update a Dataverse record

#### Parameters

##### tableName

`string`

Logical name of the table

##### recordId

`string`

ID of the record to update

##### data

`any`

Updated record data

#### Returns

`Promise`\<`APIResponse`\>

API response

---

### deleteDataverseRecord()

> **deleteDataverseRecord**(`tableName`, `recordId`): `Promise`\<`APIResponse`\>

Defined in: [utils/api-testing.ts:251](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L251)

Delete a Dataverse record

#### Parameters

##### tableName

`string`

Logical name of the table

##### recordId

`string`

ID of the record to delete

#### Returns

`Promise`\<`APIResponse`\>

API response

---

### validateSchema()

> **validateSchema**(`response`, `schema`): `Promise`\<`void`\>

Defined in: [utils/api-testing.ts:262](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L262)

Validate response schema

#### Parameters

##### response

`APIResponse`

API response

##### schema

Expected schema with required fields

###### required?

`string`[]

#### Returns

`Promise`\<`void`\>

---

### measureResponseTime()

> **measureResponseTime**(`apiCall`): `Promise`\<\{ `response`: `APIResponse`; `duration`: `number`; \}\>

Defined in: [utils/api-testing.ts:287](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L287)

Measure API response time

#### Parameters

##### apiCall

() => `Promise`\<`APIResponse`\>

Function that makes the API call

#### Returns

`Promise`\<\{ `response`: `APIResponse`; `duration`: `number`; \}\>

Response and duration in milliseconds

#### Example

```typescript
const { response, duration } = await apiHelper.measureResponseTime(() =>
  apiHelper.getDataverseRecords('accounts')
);
console.log(`API call took ${duration}ms`);
```

---

### assertPerformance()

> **assertPerformance**(`duration`, `maxDuration`): `void`

Defined in: [utils/api-testing.ts:304](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L304)

Assert API performance is within threshold

#### Parameters

##### duration

`number`

Actual duration in milliseconds

##### maxDuration

`number`

Maximum allowed duration in milliseconds

#### Returns

`void`
