[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / buildBapApiEndpoint

# Function: buildBapApiEndpoint()

> **buildBapApiEndpoint**(`_pathQuery`): `string`

Defined in: [utils/api-utilities.ts:103](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L103)

Build BAP API invoke endpoint

Constructs the full URL for the BAP API invoke pattern.
The BAP API uses a special invoke pattern where the actual API path
is passed in the x-ms-path-query header.

## Parameters

### \_pathQuery

`string`

## Returns

`string`

Full API endpoint URL for BAP invoke pattern

## Example

```typescript
const endpoint = buildBapApiEndpoint('/providers/Microsoft.PowerApps/apps');
// Returns: https://api.bap.microsoft.com/api/invoke
```
