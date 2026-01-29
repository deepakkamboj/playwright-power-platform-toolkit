[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / getAuthToken

# Function: getAuthToken()

> **getAuthToken**(`storagePath?`, `apiUrl?`): `string` \| `undefined`

Defined in: [utils/auth-helpers.ts:128](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L128)

Extract authentication token from storage state

Reads the storage state file and extracts the Bearer token.
Optionally filters by API URL to get a token with the correct audience.

## Parameters

### storagePath?

`string`

Optional custom path to storage state file

### apiUrl?

`string`

Optional API URL to match token audience

## Returns

`string` \| `undefined`

Bearer token string or undefined if not found

## Example

```typescript
// Get default token
const token = getAuthToken();

// Get token for specific API
const bapToken = getAuthToken(undefined, 'https://api.bap.microsoft.com');
```
