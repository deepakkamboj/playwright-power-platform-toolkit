[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / storageStatePath

# Function: storageStatePath()

> **storageStatePath**(`customPath?`): `string`

Defined in: utils/auth-helpers.ts:28

Get the path to the storage state file

Returns the default location for the Playwright storage state file
which contains authentication cookies and tokens.

## Parameters

### customPath?

`string`

Optional custom path for storage state

## Returns

`string`

Path to the storage state file

## Example

```typescript
const storagePath = storageStatePath();
// Returns: ~/.auth/storageState.json
```
