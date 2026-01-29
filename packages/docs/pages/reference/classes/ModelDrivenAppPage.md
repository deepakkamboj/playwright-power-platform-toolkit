[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / ModelDrivenAppPage

# Class: ModelDrivenAppPage

Defined in: pages/model-driven-app.page.ts:9

## Constructors

### Constructor

> **new ModelDrivenAppPage**(`page`): `ModelDrivenAppPage`

Defined in: pages/model-driven-app.page.ts:12

#### Parameters

##### page

`Page`

#### Returns

`ModelDrivenAppPage`

## Properties

### page

> `readonly` **page**: `Page`

Defined in: pages/model-driven-app.page.ts:10

## Methods

### navigateToHome()

> **navigateToHome**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:23

Navigate to Power Apps home page

#### Returns

`Promise`\<`void`\>

***

### waitForHomePageLoad()

> **waitForHomePageLoad**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:31

Wait for home page to load

#### Returns

`Promise`\<`void`\>

***

### waitForDesignerLoad()

> **waitForDesignerLoad**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:41

Wait for App Designer to load

#### Returns

`Promise`\<`void`\>

***

### waitForLoadingComplete()

> **waitForLoadingComplete**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:51

Wait for loading spinner to disappear

#### Returns

`Promise`\<`void`\>

***

### waitForRuntimeLoad()

> **waitForRuntimeLoad**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:61

Wait for app runtime to load

#### Returns

`Promise`\<`void`\>

***

### createBlankModelDrivenApp()

> **createBlankModelDrivenApp**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:76

Create a blank Model Driven app

#### Parameters

##### appName

`string`

Name for the app

#### Returns

`Promise`\<`void`\>

***

### createFromSolution()

> **createFromSolution**(`solutionName`, `appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:88

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

***

### filterByModelDrivenApps()

> **filterByModelDrivenApps**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:99

Filter apps by Model Driven type

#### Returns

`Promise`\<`void`\>

***

### setAppName()

> **setAppName**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:112

Set app name

#### Parameters

##### appName

`string`

Name for the app

#### Returns

`Promise`\<`void`\>

***

### saveApp()

> **saveApp**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:122

Save the Model Driven app

#### Returns

`Promise`\<`void`\>

***

### publishApp()

> **publishApp**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:130

Publish the Model Driven app

#### Returns

`Promise`\<`void`\>

***

### waitForPublishComplete()

> **waitForPublishComplete**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:142

Wait for publish operation to complete

#### Returns

`Promise`\<`void`\>

***

### playApp()

> **playApp**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:152

Play/Open the app in runtime

#### Returns

`Promise`\<`void`\>

***

### validateApp()

> **validateApp**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:166

Validate the app

#### Returns

`Promise`\<`void`\>

***

### addTableBasedPage()

> **addTableBasedPage**(`tableName`, `forms`, `views`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:183

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

***

### addDashboardPage()

> **addDashboardPage**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:225

Add a dashboard page

#### Returns

`Promise`\<`void`\>

***

### addCustomPage()

> **addCustomPage**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:235

Add a custom page

#### Returns

`Promise`\<`void`\>

***

### deletePage()

> **deletePage**(`pageName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:246

Delete a page

#### Parameters

##### pageName

`string`

Name of the page to delete

#### Returns

`Promise`\<`void`\>

***

### addNavigationGroup()

> **addNavigationGroup**(`groupName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:261

Add navigation group

#### Parameters

##### groupName

`string`

Name for the group

#### Returns

`Promise`\<`void`\>

***

### addNavigationSubArea()

> **addNavigationSubArea**(`groupName`, `subAreaTitle`, `tableName?`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:274

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

***

### addTable()

> **addTable**(`tableName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:309

Add table to the app

#### Parameters

##### tableName

`string`

Name of the table

#### Returns

`Promise`\<`void`\>

***

### createNewTable()

> **createNewTable**(`displayName`, `pluralName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:322

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

***

### openSettings()

> **openSettings**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:347

Open app settings

#### Returns

`Promise`\<`void`\>

***

### setAppDescription()

> **setAppDescription**(`description`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:356

Set app description

#### Parameters

##### description

`string`

Description for the app

#### Returns

`Promise`\<`void`\>

***

### enableMobile()

> **enableMobile**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:365

Enable mobile for the app

#### Returns

`Promise`\<`void`\>

***

### enableOfflineMode()

> **enableOfflineMode**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:375

Enable offline mode

#### Returns

`Promise`\<`void`\>

***

### navigateToRuntimeItem()

> **navigateToRuntimeItem**(`itemName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:390

Navigate to a navigation item in runtime

#### Parameters

##### itemName

`string`

Name of the navigation item

#### Returns

`Promise`\<`void`\>

***

### expandNavigationGroup()

> **expandNavigationGroup**(`groupName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:399

Expand navigation group in runtime

#### Parameters

##### groupName

`string`

Name of the group

#### Returns

`Promise`\<`void`\>

***

### createNewRecord()

> **createNewRecord**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:406

Create new record in runtime

#### Returns

`Promise`\<`void`\>

***

### saveRecord()

> **saveRecord**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:416

Save record in runtime

#### Returns

`Promise`\<`void`\>

***

### fillFormField()

> **fillFormField**(`fieldName`, `value`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:426

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

***

### clickCommandButton()

> **clickCommandButton**(`buttonLabel`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:437

Click command bar button in runtime

#### Parameters

##### buttonLabel

`string`

Label of the button

#### Returns

`Promise`\<`void`\>

***

### switchFormTab()

> **switchFormTab**(`tabName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:445

Switch form tab in runtime

#### Parameters

##### tabName

`string`

Name of the tab

#### Returns

`Promise`\<`void`\>

***

### shareApp()

> **shareApp**(`userEmail`, `securityRole`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:458

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

***

### searchApp()

> **searchApp**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:485

Search for an app by name

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

***

### openAppForEdit()

> **openAppForEdit**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:495

Open an existing app for editing

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

***

### openAppForPlay()

> **openAppForPlay**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:508

Open an existing app in play mode

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

***

### deleteApp()

> **deleteApp**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:519

Delete an app

#### Parameters

##### appName

`string`

Name of the app to delete

#### Returns

`Promise`\<`void`\>

***

### verifyAppExists()

> **verifyAppExists**(`appName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:539

Verify app exists in the list

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

***

### verifyAppPublished()

> **verifyAppPublished**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:547

Verify app is published

#### Returns

`Promise`\<`void`\>

***

### verifyPageExists()

> **verifyPageExists**(`pageName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:557

Verify page exists in designer

#### Parameters

##### pageName

`string`

Name of the page

#### Returns

`Promise`\<`void`\>

***

### verifyNavigationItemExists()

> **verifyNavigationItemExists**(`itemName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:567

Verify navigation item exists

#### Parameters

##### itemName

`string`

Name of the navigation item

#### Returns

`Promise`\<`void`\>

***

### verifyTableAdded()

> **verifyTableAdded**(`tableName`): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:577

Verify table is added to app

#### Parameters

##### tableName

`string`

Name of the table

#### Returns

`Promise`\<`void`\>

***

### verifyNoValidationErrors()

> **verifyNoValidationErrors**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:587

Verify validation has no errors

#### Returns

`Promise`\<`void`\>

***

### verifyRuntimeLoaded()

> **verifyRuntimeLoaded**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:595

Verify runtime loaded successfully

#### Returns

`Promise`\<`void`\>

***

### verifyRecordSaved()

> **verifyRecordSaved**(): `Promise`\<`void`\>

Defined in: pages/model-driven-app.page.ts:607

Verify record saved in runtime

#### Returns

`Promise`\<`void`\>
