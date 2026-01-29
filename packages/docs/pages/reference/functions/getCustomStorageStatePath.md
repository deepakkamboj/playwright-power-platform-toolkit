[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / getCustomStorageStatePath

# Function: getCustomStorageStatePath()

> **getCustomStorageStatePath**(`email`): `string`

Defined in: [utils/auth-helpers.ts:59](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L59)

Get a custom path to the storage state file for a specific user email

Returns a user-specific storage state file path in the ~/.auth directory.
This is an alternative to the default playwright-ms-auth storage location.

## Parameters

### email

`string`

User email address to create storage path for

## Returns

`string`

Path to the user-specific storage state file

## Example

```typescript
const storagePath = getCustomStorageStatePath('user@example.com');
// Returns: ~/.auth/storageState-user@example.com.json
```
