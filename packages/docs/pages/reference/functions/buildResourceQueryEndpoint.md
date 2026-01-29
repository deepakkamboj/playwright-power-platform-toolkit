[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / buildResourceQueryEndpoint

# Function: buildResourceQueryEndpoint()

> **buildResourceQueryEndpoint**(): `string`

Defined in: utils/api-utilities.ts:154

Build ResourceQuery API endpoint

Constructs the URL for the Power Platform ResourceQuery API.
This API is used for querying resources like apps, flows, and connections.

## Returns

`string`

ResourceQuery API endpoint URL

## Example

```typescript
const endpoint = buildResourceQueryEndpoint();
// Returns: https://make.powerapps.com/api/resourcequery
```
