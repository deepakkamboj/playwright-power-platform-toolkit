[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / validateApiResponse

# Function: validateApiResponse()

> **validateApiResponse**(`response`): `Promise`\<[`ApiResponseValidation`](../interfaces/ApiResponseValidation.md)\>

Defined in: utils/api-utilities.ts:282

Validate API response and extract common fields

Validates an API response and extracts commonly needed fields including
status code, headers, request ID, and parsed response data.

## Parameters

### response

`any`

Playwright APIResponse object

## Returns

`Promise`\<[`ApiResponseValidation`](../interfaces/ApiResponseValidation.md)\>

Response validation result with extracted fields

## Example

```typescript
const response = await apiContext.get('/api/apps');
const validation = await validateApiResponse(response);

if (validation.success) {
  console.log(`Found ${validation.data.value.length} apps`);
} else {
  console.error(`Request failed with status ${validation.status}`);
  console.error(`Correlation ID: ${validation.requestId}`);
}
```
