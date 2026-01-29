[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ModelDrivenAppPage

# Class: ModelDrivenAppPage

Defined in: [pages/model-driven-app.page.ts:9](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L9)

## Constructors

### Constructor

> **new ModelDrivenAppPage**(`page`): `ModelDrivenAppPage`

Defined in: [pages/model-driven-app.page.ts:12](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L12)

#### Parameters

##### page

`Page`

#### Returns

`ModelDrivenAppPage`

## Properties

### page

> `readonly` **page**: `Page`

Defined in: [pages/model-driven-app.page.ts:10](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L10)

---

### appType

> `readonly` **appType**: `"ModelDriven"` = `'ModelDriven'`

Defined in: [pages/model-driven-app.page.ts:617](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L617)

## Methods

### navigateToHome()

> **navigateToHome**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:23](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L23)

Navigate to Power Apps home page

#### Returns

`Promise`\<`void`\>

---

### waitForHomePageLoad()

> **waitForHomePageLoad**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:31](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L31)

Wait for home page to load

#### Returns

`Promise`\<`void`\>

---

### waitForDesignerLoad()

> **waitForDesignerLoad**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:41](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L41)

Wait for App Designer to load

#### Returns

`Promise`\<`void`\>

---

### waitForLoadingComplete()

> **waitForLoadingComplete**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:51](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L51)

Wait for loading spinner to disappear

#### Returns

`Promise`\<`void`\>

---

### waitForRuntimeLoad()

> **waitForRuntimeLoad**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:61](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L61)

Wait for app runtime to load

#### Returns

`Promise`\<`void`\>

---

### createBlankModelDrivenApp()

> **createBlankModelDrivenApp**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:76](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L76)

Create a blank Model Driven app

#### Parameters

##### appName

`string`

Name for the app

#### Returns

`Promise`\<`void`\>

---

### createFromSolution()

> **createFromSolution**(`solutionName`, `appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:88](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L88)

Create Model Driven app from solution

#### Parameters

##### solutionName

`string`

Name of the solution

##### appName

`string`

Name for the app

#### Returns

`Promise`\<`void`\>

---

### filterByModelDrivenApps()

> **filterByModelDrivenApps**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:99](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L99)

Filter apps by Model Driven type

#### Returns

`Promise`\<`void`\>

---

### setAppName()

> **setAppName**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:112](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L112)

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

Defined in: [pages/model-driven-app.page.ts:122](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L122)

Save the Model Driven app

#### Returns

`Promise`\<`void`\>

---

### publishApp()

> **publishApp**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:130](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L130)

Publish the Model Driven app

#### Returns

`Promise`\<`void`\>

---

### waitForPublishComplete()

> **waitForPublishComplete**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:142](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L142)

Wait for publish operation to complete

#### Returns

`Promise`\<`void`\>

---

### playApp()

> **playApp**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:152](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L152)

Play/Open the app in runtime

#### Returns

`Promise`\<`void`\>

---

### validateApp()

> **validateApp**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:166](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L166)

Validate the app

#### Returns

`Promise`\<`void`\>

---

### addTableBasedPage()

> **addTableBasedPage**(`tableName`, `forms`, `views`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:183](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L183)

Add a table-based page

#### Parameters

##### tableName

`string`

Name of the table

##### forms

`string`[] = `[]`

Array of form names to include

##### views

`string`[] = `[]`

Array of view names to include

#### Returns

`Promise`\<`void`\>

---

### addDashboardPage()

> **addDashboardPage**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:225](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L225)

Add a dashboard page

#### Returns

`Promise`\<`void`\>

---

### addCustomPage()

> **addCustomPage**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:235](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L235)

Add a custom page

#### Returns

`Promise`\<`void`\>

---

### deletePage()

> **deletePage**(`pageName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:246](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L246)

Delete a page

#### Parameters

##### pageName

`string`

Name of the page to delete

#### Returns

`Promise`\<`void`\>

---

### addNavigationGroup()

> **addNavigationGroup**(`groupName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:261](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L261)

Add navigation group

#### Parameters

##### groupName

`string`

Name for the group

#### Returns

`Promise`\<`void`\>

---

### addNavigationSubArea()

> **addNavigationSubArea**(`groupName`, `subAreaTitle`, `tableName?`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:274](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L274)

Add navigation subarea

#### Parameters

##### groupName

`string`

Parent group name

##### subAreaTitle

`string`

Title for the subarea

##### tableName?

`string`

Optional table to link to

#### Returns

`Promise`\<`void`\>

---

### addTable()

> **addTable**(`tableName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:309](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L309)

Add table to the app

#### Parameters

##### tableName

`string`

Name of the table

#### Returns

`Promise`\<`void`\>

---

### createNewTable()

> **createNewTable**(`displayName`, `pluralName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:322](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L322)

Create a new table

#### Parameters

##### displayName

`string`

Display name for the table

##### pluralName

`string`

Plural name for the table

#### Returns

`Promise`\<`void`\>

---

### openSettings()

> **openSettings**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:347](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L347)

Open app settings

#### Returns

`Promise`\<`void`\>

---

### setAppDescription()

> **setAppDescription**(`description`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:356](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L356)

Set app description

#### Parameters

##### description

`string`

Description for the app

#### Returns

`Promise`\<`void`\>

---

### enableMobile()

> **enableMobile**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:365](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L365)

Enable mobile for the app

#### Returns

`Promise`\<`void`\>

---

### enableOfflineMode()

> **enableOfflineMode**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:375](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L375)

Enable offline mode

#### Returns

`Promise`\<`void`\>

---

### navigateToRuntimeItem()

> **navigateToRuntimeItem**(`itemName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:390](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L390)

Navigate to a navigation item in runtime

#### Parameters

##### itemName

`string`

Name of the navigation item

#### Returns

`Promise`\<`void`\>

---

### expandNavigationGroup()

> **expandNavigationGroup**(`groupName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:399](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L399)

Expand navigation group in runtime

#### Parameters

##### groupName

`string`

Name of the group

#### Returns

`Promise`\<`void`\>

---

### createNewRecord()

> **createNewRecord**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:406](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L406)

Create new record in runtime

#### Returns

`Promise`\<`void`\>

---

### saveRecord()

> **saveRecord**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:416](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L416)

Save record in runtime

#### Returns

`Promise`\<`void`\>

---

### fillFormField()

> **fillFormField**(`fieldName`, `value`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:426](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L426)

Fill form field in runtime

#### Parameters

##### fieldName

`string`

Name of the field

##### value

`string`

Value to fill

#### Returns

`Promise`\<`void`\>

---

### clickCommandButton()

> **clickCommandButton**(`buttonLabel`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:437](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L437)

Click command bar button in runtime

#### Parameters

##### buttonLabel

`string`

Label of the button

#### Returns

`Promise`\<`void`\>

---

### switchFormTab()

> **switchFormTab**(`tabName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:445](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L445)

Switch form tab in runtime

#### Parameters

##### tabName

`string`

Name of the tab

#### Returns

`Promise`\<`void`\>

---

### shareApp()

> **shareApp**(`userEmail`, `securityRole`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:458](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L458)

Share app with a user

#### Parameters

##### userEmail

`string`

Email of the user

##### securityRole

`string`

Security role to assign

#### Returns

`Promise`\<`void`\>

---

### searchApp()

> **searchApp**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:485](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L485)

Search for an app by name

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

---

### openAppForEdit()

> **openAppForEdit**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:495](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L495)

Open an existing app for editing

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

---

### openAppForPlay()

> **openAppForPlay**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:508](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L508)

Open an existing app in play mode

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

---

### deleteApp()

> **deleteApp**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:519](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L519)

Delete an app

#### Parameters

##### appName

`string`

Name of the app to delete

#### Returns

`Promise`\<`void`\>

---

### verifyAppExists()

> **verifyAppExists**(`appName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:539](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L539)

Verify app exists in the list

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

---

### verifyAppPublished()

> **verifyAppPublished**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:547](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L547)

Verify app is published

#### Returns

`Promise`\<`void`\>

---

### verifyPageExists()

> **verifyPageExists**(`pageName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:557](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L557)

Verify page exists in designer

#### Parameters

##### pageName

`string`

Name of the page

#### Returns

`Promise`\<`void`\>

---

### verifyNavigationItemExists()

> **verifyNavigationItemExists**(`itemName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:567](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L567)

Verify navigation item exists

#### Parameters

##### itemName

`string`

Name of the navigation item

#### Returns

`Promise`\<`void`\>

---

### verifyTableAdded()

> **verifyTableAdded**(`tableName`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:577](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L577)

Verify table is added to app

#### Parameters

##### tableName

`string`

Name of the table

#### Returns

`Promise`\<`void`\>

---

### verifyNoValidationErrors()

> **verifyNoValidationErrors**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:587](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L587)

Verify validation has no errors

#### Returns

`Promise`\<`void`\>

---

### verifyRuntimeLoaded()

> **verifyRuntimeLoaded**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:595](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L595)

Verify runtime loaded successfully

#### Returns

`Promise`\<`void`\>

---

### verifyRecordSaved()

> **verifyRecordSaved**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:607](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L607)

Verify record saved in runtime

#### Returns

`Promise`\<`void`\>

---

### launchById()

> **launchById**(`appId`, `baseUrl`, `_mode`, `_options?`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:625](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L625)

Launch app by ID (IAppLauncher interface)

#### Parameters

##### appId

`string`

##### baseUrl

`string`

##### \_mode

`any`

##### \_options?

`any`

#### Returns

`Promise`\<`void`\>

---

### launchByName()

> **launchByName**(`appName`, `findAppCallback`, `_mode`, `_options?`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:642](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L642)

Launch app by name (IAppLauncher interface)

#### Parameters

##### appName

`string`

##### findAppCallback

(`appName`) => `Promise`\<`any`\>

##### \_mode

`any`

##### \_options?

`any`

#### Returns

`Promise`\<`void`\>

---

### waitForAppLoad()

> **waitForAppLoad**(`_options?`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:657](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L657)

Wait for app to load (IAppLauncher interface)

#### Parameters

##### \_options?

`any`

#### Returns

`Promise`\<`void`\>

---

### isAppReady()

> **isAppReady**(): `boolean`

Defined in: [pages/model-driven-app.page.ts:665](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L665)

Check if app is ready (IAppLauncher interface)

#### Returns

`boolean`

---

### getAppId()

> **getAppId**(): `string` \| `null`

Defined in: [pages/model-driven-app.page.ts:672](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L672)

Get app ID (IAppLauncher interface)

#### Returns

`string` \| `null`

---

### getAppUrl()

> **getAppUrl**(): `string` \| `null`

Defined in: [pages/model-driven-app.page.ts:679](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L679)

Get app URL (IAppLauncher interface)

#### Returns

`string` \| `null`

---

### getControl()

> **getControl**(`options`): `any`

Defined in: [pages/model-driven-app.page.ts:686](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L686)

Get control (IAppLauncher interface)

#### Parameters

##### options

`any`

#### Returns

`any`

---

### clickControl()

> **clickControl**(`options`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:696](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L696)

Click control (IAppLauncher interface)

#### Parameters

##### options

`any`

#### Returns

`Promise`\<`void`\>

---

### fillControl()

> **fillControl**(`options`, `value`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:704](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L704)

Fill control (IAppLauncher interface)

#### Parameters

##### options

`any`

##### value

`string`

#### Returns

`Promise`\<`void`\>

---

### fillForm()

> **fillForm**(`formData`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:712](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L712)

Fill form (IAppLauncher interface)

#### Parameters

##### formData

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`void`\>

---

### assertControlVisible()

> **assertControlVisible**(`options`, `_assertOptions?`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:721](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L721)

Assert control visible (IAppLauncher interface)

#### Parameters

##### options

`any`

##### \_assertOptions?

`any`

#### Returns

`Promise`\<`void`\>

---

### assertControlText()

> **assertControlText**(`options`, `expectedText`, `_assertOptions?`): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:729](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L729)

Assert control text (IAppLauncher interface)

#### Parameters

##### options

`any`

##### expectedText

`string`

##### \_assertOptions?

`any`

#### Returns

`Promise`\<`void`\>

---

### closeApp()

> **closeApp**(): `Promise`\<`void`\>

Defined in: [pages/model-driven-app.page.ts:741](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L741)

Close app (IAppLauncher interface)

#### Returns

`Promise`\<`void`\>

---

### reset()

> **reset**(): `void`

Defined in: [pages/model-driven-app.page.ts:750](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/model-driven-app.page.ts#L750)

Reset launcher state (IAppLauncher interface)

#### Returns

`void`
