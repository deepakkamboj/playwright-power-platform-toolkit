[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / AppProvider

# Class: AppProvider

Defined in: [core/app-provider.ts:56](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L56)

App Provider - High-level API for app testing
Provides simplified interface for customers to launch and test their apps

## Example

```typescript
const provider = new AppProvider(page, findAppCallback);

// Launch by name
await provider.launch({
  app: { name: 'My Sales App' },
  type: AppType.Canvas,
  mode: AppLaunchMode.Play,
});

// Launch by ID
await provider.launch({
  app: { id: 'abc-123-def' },
  type: AppType.ModelDriven,
  mode: AppLaunchMode.Edit,
  baseUrl: 'https://make.powerapps.com',
});

// Interact with app
await provider.click({ name: 'Submit', type: CanvasControlType.Button });
await provider.fill({ name: 'Email' }, 'test@example.com');
```

## Constructors

### Constructor

> **new AppProvider**(`page`, `findAppCallback?`): `AppProvider`

Defined in: [core/app-provider.ts:63](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L63)

#### Parameters

##### page

`Page`

##### findAppCallback?

(`appName`) => `Promise`\<`Locator`\>

#### Returns

`AppProvider`

## Methods

### setFindAppCallback()

> **setFindAppCallback**(`callback`): `void`

Defined in: [core/app-provider.ts:73](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L73)

Set the callback for finding apps by name
Required for launching apps by name

#### Parameters

##### callback

(`appName`) => `Promise`\<`Locator`\>

Function to find app by name

#### Returns

`void`

---

### launch()

> **launch**(`config`): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:82](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L82)

Launch an app
Supports launching by name or ID

#### Parameters

##### config

[`LaunchAppConfig`](../interfaces/LaunchAppConfig.md)

Launch configuration

#### Returns

`Promise`\<`void`\>

---

### getControl()

> **getControl**(`options`): `Locator`

Defined in: [core/app-provider.ts:170](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L170)

Get a control in the current app

#### Parameters

##### options

[`ControlOptions`](../interfaces/ControlOptions.md)

Control options

#### Returns

`Locator`

Locator for the control

---

### click()

> **click**(`options`): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:179](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L179)

Click a control in the current app

#### Parameters

##### options

[`ControlOptions`](../interfaces/ControlOptions.md)

Control options

#### Returns

`Promise`\<`void`\>

---

### fill()

> **fill**(`options`, `value`): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:189](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L189)

Fill a text input control in the current app

#### Parameters

##### options

[`ControlOptions`](../interfaces/ControlOptions.md)

Control options

##### value

`string`

Value to fill

#### Returns

`Promise`\<`void`\>

---

### fillForm()

> **fillForm**(`formData`): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:198](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L198)

Fill a form in the current app

#### Parameters

##### formData

`Record`\<`string`, `string`\>

Key-value pairs of field names and values

#### Returns

`Promise`\<`void`\>

---

### assertVisible()

> **assertVisible**(`options`): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:207](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L207)

Assert control is visible

#### Parameters

##### options

[`ControlOptions`](../interfaces/ControlOptions.md)

Control options

#### Returns

`Promise`\<`void`\>

---

### assertText()

> **assertText**(`options`, `expectedText`): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:217](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L217)

Assert control text matches

#### Parameters

##### options

[`ControlOptions`](../interfaces/ControlOptions.md)

Control options

##### expectedText

`string`

Expected text

#### Returns

`Promise`\<`void`\>

---

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [core/app-provider.ts:225](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L225)

Close the current app

#### Returns

`Promise`\<`void`\>

---

### isReady()

> **isReady**(): `boolean`

Defined in: [core/app-provider.ts:236](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L236)

Check if an app is currently launched and ready

#### Returns

`boolean`

true if app is ready

---

### getCurrentAppType()

> **getCurrentAppType**(): [`AppType`](../enumerations/AppType.md) \| `null`

Defined in: [core/app-provider.ts:244](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L244)

Get the current app type

#### Returns

[`AppType`](../enumerations/AppType.md) \| `null`

Current app type or null

---

### getCurrentAppId()

> **getCurrentAppId**(): `string` \| `null`

Defined in: [core/app-provider.ts:252](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L252)

Get the current app ID

#### Returns

`string` \| `null`

Current app ID or null

---

### getCurrentAppUrl()

> **getCurrentAppUrl**(): `string` \| `null`

Defined in: [core/app-provider.ts:260](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L260)

Get the current app URL

#### Returns

`string` \| `null`

Current app URL or null

---

### getLaunchedApps()

> **getLaunchedApps**(): [`AppMetadata`](../interfaces/AppMetadata.md)[]

Defined in: [core/app-provider.ts:268](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L268)

Get metadata for all launched apps

#### Returns

[`AppMetadata`](../interfaces/AppMetadata.md)[]

Array of app metadata

---

### reset()

> **reset**(): `void`

Defined in: [core/app-provider.ts:276](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L276)

Reset the provider state
Clears current launcher and app metadata

#### Returns

`void`
