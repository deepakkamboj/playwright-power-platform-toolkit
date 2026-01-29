[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / createQueryPayload

# Function: createQueryPayload()

> **createQueryPayload**(`options?`): `object`

Defined in: [utils/api-utilities.ts:201](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L201)

Create default payload for ResourceQuery API

Constructs a query payload for the Power Platform ResourceQuery API
with sensible defaults and optional customization.

## Parameters

### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

Optional query customization

## Returns

`object`

Query payload object

### query

> **query**: `object`

#### query.skip

> **skip**: `number`

#### query.top

> **top**: `number`

#### query.filter

> **filter**: `string`

#### query.orderBy

> **orderBy**: `string`

## Example

```typescript
// Get first 10 canvas apps
const payload = createQueryPayload({
  top: 10,
  filter: "type eq 'Microsoft.PowerApps/apps'",
  orderBy: 'properties/createdTime desc',
});

const response = await apiContext.post(buildResourceQueryEndpoint(), { data: payload });
```
