[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / createBapApiHeaders

# Function: createBapApiHeaders()

> **createBapApiHeaders**(`pathQuery`, `token`): `object`

Defined in: utils/api-utilities.ts:131

Create headers for BAP API invoke pattern

Creates the required headers for BAP API requests using the invoke pattern.
The x-ms-path-query header contains the actual API path and query parameters.

## Parameters

### pathQuery

`string`

The x-ms-path-query value (API path and query params)

### token

`string`

Bearer authentication token

## Returns

`object`

Headers object for BAP API request

### authorization

> **authorization**: `string`

### x-ms-user-agent

> **x-ms-user-agent**: `string` = `'Playwright-Test/1.0.0'`

### x-ms-path-query

> **x-ms-path-query**: `string` = `pathQuery`

### accept

> **accept**: `string` = `'application/json'`

## Example

```typescript
const token = extractTokenFromStorage();
const headers = createBapApiHeaders('/providers/Microsoft.PowerApps/apps?$top=10', token);

const response = await fetch(buildBapApiEndpoint(), {
  headers,
});
```
