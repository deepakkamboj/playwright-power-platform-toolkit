[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / createAuthenticatedApiContext

# Function: createAuthenticatedApiContext()

> **createAuthenticatedApiContext**(`token`, `baseUrl?`): `Promise`\<`APIRequestContext`\>

Defined in: utils/api-utilities.ts:73

Create an authenticated API request context

Creates a Playwright APIRequestContext with authentication headers
and common configuration for Power Platform APIs.

## Parameters

### token

`string`

Bearer token for authentication

### baseUrl?

`string`

Optional base URL for the API

## Returns

`Promise`\<`APIRequestContext`\>

Playwright APIRequestContext configured with authentication

## Example

```typescript
const token = extractTokenFromStorage();
const apiContext = await createAuthenticatedApiContext(
  token,
  'https://api.bap.microsoft.com'
);

const response = await apiContext.get('/api/endpoint');
await apiContext.dispose();
```
