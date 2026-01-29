[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / PowerAppsApiEndpoints

# Variable: PowerAppsApiEndpoints

> `const` **PowerAppsApiEndpoints**: `object`

Defined in: [utils/api-testing.ts:14](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-testing.ts#L14)

Power Apps API endpoints

## Type Declaration

### Apps

> **Apps**: `string` = `'/api/apps'`

Power Apps API endpoint

### Solutions

> **Solutions**: `string` = `'/api/solutions'`

Solutions API endpoint

### Environments

> **Environments**: `string` = `'/api/environments'`

Environments API endpoint

### Connectors

> **Connectors**: `string` = `'/api/connectors'`

Connectors API endpoint

### Flows

> **Flows**: `string` = `'/api/flows'`

Flows API endpoint

### Dataverse

> **Dataverse**: `object`

Dataverse endpoints

#### Dataverse.Tables

> **Tables**: `string` = `'/api/data/v9.2/EntityDefinitions'`

Entity definitions endpoint

#### Dataverse.Records()

> **Records**: (`tableName`) => `string`

Get records endpoint for a table

##### Parameters

###### tableName

`string`

Logical name of the table

##### Returns

`string`

Records endpoint URL

#### Dataverse.Metadata

> **Metadata**: `string` = `'/api/data/v9.2/$metadata'`

Metadata endpoint
