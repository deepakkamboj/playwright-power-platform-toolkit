[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / checkStorageStateExpiration

# Function: checkStorageStateExpiration()

> **checkStorageStateExpiration**(`storagePath?`): [`TokenExpirationCheck`](../interfaces/TokenExpirationCheck.md)

Defined in: [utils/auth-helpers.ts:218](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L218)

Check storage state token expiration

Reads the storage state file and checks if authentication tokens have expired.

## Parameters

### storagePath?

`string`

Optional custom path to storage state file

## Returns

[`TokenExpirationCheck`](../interfaces/TokenExpirationCheck.md)

Token expiration check result

## Example

```typescript
const check = checkStorageStateExpiration();

if (check.expired) {
  console.log('Token expired, please re-authenticate');
} else if (check.expiresOn) {
  const expiryDate = new Date(check.expiresOn * 1000);
  console.log(`Token expires at: ${expiryDate}`);
}
```
