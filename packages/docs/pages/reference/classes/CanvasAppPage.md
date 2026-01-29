[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / CanvasAppPage

# Class: CanvasAppPage

Defined in: [pages/canvas-app.page.ts:9](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L9)

## Constructors

### Constructor

> **new CanvasAppPage**(`page`): `CanvasAppPage`

Defined in: [pages/canvas-app.page.ts:13](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L13)

#### Parameters

##### page

`Page`

#### Returns

`CanvasAppPage`

## Properties

### page

> `readonly` **page**: `Page`

Defined in: [pages/canvas-app.page.ts:10](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L10)

## Methods

### navigateToHome()

> **navigateToHome**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:35](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L35)

Navigate to Power Apps home page

#### Returns

`Promise`\<`void`\>

---

### waitForHomePageLoad()

> **waitForHomePageLoad**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:43](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L43)

Wait for home page to load

#### Returns

`Promise`\<`void`\>

---

### waitForStudioLoad()

> **waitForStudioLoad**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:53](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L53)

Wait for Canvas Studio to load

#### Returns

`Promise`\<`void`\>

---

### waitForLoadingComplete()

> **waitForLoadingComplete**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:64](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L64)

Wait for loading spinner to disappear

#### Returns

`Promise`\<`void`\>

---

### createBlankCanvasApp()

> **createBlankCanvasApp**(`appName?`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:79](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L79)

Create a blank Canvas app

#### Parameters

##### appName?

`string`

Optional name for the app

#### Returns

`Promise`\<`void`\>

---

### createFromTemplate()

> **createFromTemplate**(`templateName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:93](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L93)

Create Canvas app from template

#### Parameters

##### templateName

`string`

Name of the template

#### Returns

`Promise`\<`void`\>

---

### createFromData()

> **createFromData**(`dataSourceName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:104](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L104)

Create Canvas app from data

#### Parameters

##### dataSourceName

`string`

Name of the data source

#### Returns

`Promise`\<`void`\>

---

### setAppName()

> **setAppName**(`appName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:119](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L119)

Set app name

#### Parameters

##### appName

`string`

Name for the app

#### Returns

`Promise`\<`void`\>

---

### saveApp()

> **saveApp**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:130](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L130)

Save the Canvas app

#### Returns

`Promise`\<`void`\>

---

### saveAppWithName()

> **saveAppWithName**(`appName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:142](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L142)

Save app with specific name

#### Parameters

##### appName

`string`

Name to save the app as

#### Returns

`Promise`\<`void`\>

---

### waitForSaveComplete()

> **waitForSaveComplete**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:154](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L154)

Wait for save operation to complete

#### Returns

`Promise`\<`void`\>

---

### publishApp()

> **publishApp**(`comments?`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:165](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L165)

Publish the Canvas app

#### Parameters

##### comments?

`string`

Optional version comments

#### Returns

`Promise`\<`void`\>

---

### waitForPublishComplete()

> **waitForPublishComplete**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:181](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L181)

Wait for publish operation to complete

#### Returns

`Promise`\<`void`\>

---

### playApp()

> **playApp**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:191](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L191)

Play/Preview the app

#### Returns

`Promise`\<`void`\>

---

### stopPlayingApp()

> **stopPlayingApp**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:203](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L203)

Stop playing the app

#### Returns

`Promise`\<`void`\>

---

### addControl()

> **addControl**(`controlType`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:215](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L215)

Add a control to the canvas

#### Parameters

##### controlType

Type of control (e.g., 'Button', 'Label', 'TextInput')

`"SearchControl"` | `"LayoutSection"` | `"InputSection"` | `"DisplaySection"` | `"IconsSection"` | `"MediaSection"` | `"ChartsSection"` | `"AISection"` | `"ButtonControl"` | `"TextLabelControl"` | `"TextInputControl"` | `"DropdownControl"` | `"ComboboxControl"` | `"DatePickerControl"` | `"GalleryControl"` | `"FormControl"` | `"DataTableControl"` | `"IconControl"` | `"ImageControl"` | `"ShapeControl"` | `"ChartControl"`

#### Returns

`Promise`\<`void`\>

---

### addButton()

> **addButton**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:233](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L233)

Add a button control

#### Returns

`Promise`\<`void`\>

---

### addTextLabel()

> **addTextLabel**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:240](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L240)

Add a text label control

#### Returns

`Promise`\<`void`\>

---

### addTextInput()

> **addTextInput**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:247](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L247)

Add a text input control

#### Returns

`Promise`\<`void`\>

---

### addGallery()

> **addGallery**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:254](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L254)

Add a gallery control

#### Returns

`Promise`\<`void`\>

---

### selectControl()

> **selectControl**(`controlName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:262](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L262)

Select a control by name

#### Parameters

##### controlName

`string`

Name of the control

#### Returns

`Promise`\<`void`\>

---

### deleteSelectedControl()

> **deleteSelectedControl**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:270](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L270)

Delete selected control

#### Returns

`Promise`\<`void`\>

---

### setControlProperty()

> **setControlProperty**(`propertyName`, `value`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:283](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L283)

Set control property

#### Parameters

##### propertyName

`string`

Name of the property

##### value

`string`

Value to set

#### Returns

`Promise`\<`void`\>

---

### setControlText()

> **setControlText**(`text`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:296](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L296)

Set control text property

#### Parameters

##### text

`string`

Text value

#### Returns

`Promise`\<`void`\>

---

### setFormula()

> **setFormula**(`propertyName`, `formula`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:307](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L307)

Set formula for a property

#### Parameters

##### propertyName

`string`

Name of the property

##### formula

`string`

Formula to set

#### Returns

`Promise`\<`void`\>

---

### addDataSource()

> **addDataSource**(`dataSourceName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:327](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L327)

Add data source to the app

#### Parameters

##### dataSourceName

`string`

Name of the data source

#### Returns

`Promise`\<`void`\>

---

### addScreen()

> **addScreen**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:353](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L353)

Add a new screen

#### Returns

`Promise`\<`void`\>

---

### selectScreen()

> **selectScreen**(`screenName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:362](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L362)

Select a screen by name

#### Parameters

##### screenName

`string`

Name of the screen

#### Returns

`Promise`\<`void`\>

---

### deleteScreen()

> **deleteScreen**(`screenName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:371](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L371)

Delete a screen

#### Parameters

##### screenName

`string`

Name of the screen to delete

#### Returns

`Promise`\<`void`\>

---

### searchApp()

> **searchApp**(`appName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:386](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L386)

Search for an app by name

#### Parameters

##### appName

`string`

Name of the app to search for

#### Returns

`Promise`\<`void`\>

---

### openApp()

> **openApp**(`appName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:396](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L396)

Open an existing app

#### Parameters

##### appName

`string`

Name of the app to open

#### Returns

`Promise`\<`void`\>

---

### deleteApp()

> **deleteApp**(`appName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:406](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L406)

Delete an app

#### Parameters

##### appName

`string`

Name of the app to delete

#### Returns

`Promise`\<`void`\>

---

### shareApp()

> **shareApp**(`userEmail`, `permission`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:425](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L425)

Share app with a user

#### Parameters

##### userEmail

`string`

Email of the user to share with

##### permission

Permission level ('CanEdit' or 'CanView')

`"CanEdit"` | `"CanView"`

#### Returns

`Promise`\<`void`\>

---

### verifyAppExists()

> **verifyAppExists**(`appName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:451](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L451)

Verify app exists in the list

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

---

### verifyAppSaved()

> **verifyAppSaved**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:459](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L459)

Verify app is saved

#### Returns

`Promise`\<`void`\>

---

### verifyAppPublished()

> **verifyAppPublished**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:466](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L466)

Verify app is published

#### Returns

`Promise`\<`void`\>

---

### verifyControlExists()

> **verifyControlExists**(`controlName`): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:474](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L474)

Verify control exists on canvas

#### Parameters

##### controlName

`string`

Name of the control

#### Returns

`Promise`\<`void`\>

---

### verifyErrorDisplayed()

> **verifyErrorDisplayed**(): `Promise`\<`void`\>

Defined in: [pages/canvas-app.page.ts:482](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/canvas-app.page.ts#L482)

Verify error message is displayed

#### Returns

`Promise`\<`void`\>
