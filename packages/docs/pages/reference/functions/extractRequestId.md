[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / extractRequestId

# Function: extractRequestId()

> **extractRequestId**(`headers`): `string` \| `undefined`

Defined in: utils/api-utilities.ts:232

Extract request tracking ID from response headers

Searches for request tracking IDs in common Microsoft API header names.
These IDs are useful for troubleshooting and correlating requests.

## Parameters

### headers

Response headers object

## Returns

`string` \| `undefined`

Request ID or undefined if not found

## Example

```typescript
const response = await apiContext.get('/api/endpoint');
const headers = response.headers();
const requestId = extractRequestId(headers);

if (!response.ok()) {
  console.error(`Request failed. Correlation ID: ${requestId}`);
}
```
