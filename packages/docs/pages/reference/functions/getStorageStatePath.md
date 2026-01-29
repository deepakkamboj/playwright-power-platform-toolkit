[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / getStorageStatePath

# Function: getStorageStatePath()

> **getStorageStatePath**(`email`): `string`

Defined in: utils/auth-helpers.ts:59

Get the path to the storage state file for a specific user email

Returns a user-specific storage state file path, useful when testing
with multiple accounts.

## Parameters

### email

`string`

User email address to create storage path for

## Returns

`string`

Path to the user-specific storage state file

## Example

```typescript
const storagePath = getStorageStatePath('user@example.com');
// Returns: ~/.auth/storageState-user@example.com.json
```
