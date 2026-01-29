[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / extractTokenFromStorage

# Function: extractTokenFromStorage()

> **extractTokenFromStorage**(`apiUrl?`): `string`

Defined in: [utils/api-utilities.ts:37](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L37)

Extract authentication token from storage state

Retrieves the Bearer token from the stored authentication state.
Optionally filters by API URL to get a token with the correct audience.

## Parameters

### apiUrl?

`string`

Optional API URL to match token audience

## Returns

`string`

Bearer token string

## Throws

If no authentication token is found

## Example

```typescript
// Extract token for general use
const token = extractTokenFromStorage();

// Extract token for specific API audience
const bapToken = extractTokenFromStorage('https://api.bap.microsoft.com');
```
