[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / PowerAppsPage

# Class: PowerAppsPage

Defined in: [pages/power-apps.page.ts:15](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L15)

## Constructors

### Constructor

> **new PowerAppsPage**(`page`): `PowerAppsPage`

Defined in: [pages/power-apps.page.ts:21](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L21)

#### Parameters

##### page

`Page`

#### Returns

`PowerAppsPage`

## Properties

### page

> `readonly` **page**: `Page`

Defined in: [pages/power-apps.page.ts:16](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L16)

---

### locators

> `readonly` **locators**: [`PowerAppsPageLocators`](PowerAppsPageLocators.md)

Defined in: [pages/power-apps.page.ts:17](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L17)

---

### canvas

> `readonly` **canvas**: [`CanvasAppPage`](CanvasAppPage.md)

Defined in: [pages/power-apps.page.ts:18](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L18)

---

### modelDriven

> `readonly` **modelDriven**: [`ModelDrivenAppPage`](ModelDrivenAppPage.md)

Defined in: [pages/power-apps.page.ts:19](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L19)

## Methods

### navigateToHome()

> **navigateToHome**(`options`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:36](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L36)

Navigate to Power Apps home page

#### Parameters

##### options

[`NavigationOptions`](../interfaces/NavigationOptions.md) = `{}`

Navigation options

#### Returns

`Promise`\<`void`\>

---

### navigateToApps()

> **navigateToApps**(`options`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:51](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L51)

Navigate to Apps page
Uses direct URL navigation for reliability

#### Parameters

##### options

[`NavigationOptions`](../interfaces/NavigationOptions.md) = `{}`

Navigation options (url is treated as base URL, '/apps' will be appended)

#### Returns

`Promise`\<`void`\>

---

### navigateToSolutions()

> **navigateToSolutions**(`options`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:67](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L67)

Navigate to Solutions page
Uses direct URL navigation for reliability

#### Parameters

##### options

[`NavigationOptions`](../interfaces/NavigationOptions.md) = `{}`

Navigation options (url is treated as base URL, '/solutions' will be appended)

#### Returns

`Promise`\<`void`\>

---

### navigateToAppsViaMenu()

> **navigateToAppsViaMenu**(`options`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:84](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L84)

Navigate to Apps page via menu
First navigates to home page, then clicks the Apps menu item
Use this when you want to simulate user navigation through the UI

#### Parameters

##### options

[`NavigationOptions`](../interfaces/NavigationOptions.md) = `{}`

Navigation options

#### Returns

`Promise`\<`void`\>

---

### navigateToSolutionsViaMenu()

> **navigateToSolutionsViaMenu**(`options`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:105](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L105)

Navigate to Solutions page via menu
First navigates to home page, then clicks the Solutions menu item
Use this when you want to simulate user navigation through the UI

#### Parameters

##### options

[`NavigationOptions`](../interfaces/NavigationOptions.md) = `{}`

Navigation options

#### Returns

`Promise`\<`void`\>

---

### waitForHomePageLoad()

> **waitForHomePageLoad**(`timeout`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:129](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L129)

Wait for home page to fully load
Waits for multiple elements to ensure page is ready

#### Parameters

##### timeout

`number` = `60000`

Timeout in milliseconds

#### Returns

`Promise`\<`void`\>

---

### waitForAppsPageLoad()

> **waitForAppsPageLoad**(`timeout`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:154](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L154)

Wait for Apps page to fully load

#### Parameters

##### timeout

`number` = `60000`

Timeout in milliseconds

#### Returns

`Promise`\<`void`\>

---

### waitForSolutionsPageLoad()

> **waitForSolutionsPageLoad**(`timeout`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:175](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L175)

Wait for Solutions page to fully load

#### Parameters

##### timeout

`number` = `60000`

Timeout in milliseconds

#### Returns

`Promise`\<`void`\>

---

### findApp()

> **findApp**(`appName`, `options`): `Promise`\<`Locator`\>

Defined in: [pages/power-apps.page.ts:200](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L200)

Find an app by name in the apps list
Includes search and wait logic

#### Parameters

##### appName

`string`

Name of the app

##### options

[`SearchOptions`](../interfaces/SearchOptions.md) = `{}`

Search options

#### Returns

`Promise`\<`Locator`\>

Locator for the app

---

### findSolution()

> **findSolution**(`solutionName`, `options`): `Promise`\<`Locator`\>

Defined in: [pages/power-apps.page.ts:231](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L231)

Find a solution by name

#### Parameters

##### solutionName

`string`

Name of the solution

##### options

[`SearchOptions`](../interfaces/SearchOptions.md) = `{}`

Search options

#### Returns

`Promise`\<`Locator`\>

Locator for the solution

---

### openDefaultSolution()

> **openDefaultSolution**(): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:259](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L259)

Open the default solution

#### Returns

`Promise`\<`void`\>

---

### createApp()

> **createApp**(`appType`, `appName`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:275](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L275)

Create a new app of specified type

#### Parameters

##### appType

[`AppType`](../enumerations/AppType.md)

Type of app (Canvas or ModelDriven)

##### appName

`string`

Name for the new app

#### Returns

`Promise`\<`void`\>

---

### deleteApp()

> **deleteApp**(`appType`, `appName`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:301](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L301)

Delete an app by name

#### Parameters

##### appType

[`AppType`](../enumerations/AppType.md)

Type of app

##### appName

`string`

Name of the app to delete

#### Returns

`Promise`\<`void`\>

---

### openApp()

> **openApp**(`appName`, `appType`, `mode`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:327](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L327)

Open an app for editing or playing

#### Parameters

##### appName

`string`

Name of the app

##### appType

[`AppType`](../enumerations/AppType.md)

Type of app

##### mode

'edit' or 'play'

`"play"` | `"edit"`

#### Returns

`Promise`\<`void`\>

---

### openModelDrivenAppInNewWindow()

> **openModelDrivenAppInNewWindow**(`appName`): `Promise`\<`Page`\>

Defined in: [pages/power-apps.page.ts:362](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L362)

Open Model Driven app in new window

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`Page`\>

New page object

---

### dismissTeachingBubble()

> **dismissTeachingBubble**(): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:381](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L381)

Dismiss teaching bubble if present

#### Returns

`Promise`\<`void`\>

---

### isEnvironmentErrorPage()

> **isEnvironmentErrorPage**(): `Promise`\<`boolean`\>

Defined in: [pages/power-apps.page.ts:402](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L402)

Check if current page is an environment error page

#### Returns

`Promise`\<`boolean`\>

True if error page is detected

---

### isHomePage()

> **isHomePage**(): `Promise`\<`boolean`\>

Defined in: [pages/power-apps.page.ts:410](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L410)

Check if currently on home page

#### Returns

`Promise`\<`boolean`\>

---

### isAppsPage()

> **isAppsPage**(): `Promise`\<`boolean`\>

Defined in: [pages/power-apps.page.ts:417](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L417)

Check if currently on apps page

#### Returns

`Promise`\<`boolean`\>

---

### isSolutionsPage()

> **isSolutionsPage**(): `Promise`\<`boolean`\>

Defined in: [pages/power-apps.page.ts:424](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L424)

Check if currently on solutions page

#### Returns

`Promise`\<`boolean`\>

---

### takeScreenshot()

> **takeScreenshot**(`fileName`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:432](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L432)

Take screenshot

#### Parameters

##### fileName

`string`

Name for the screenshot file

#### Returns

`Promise`\<`void`\>

---

### signOut()

> **signOut**(): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:442](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L442)

Sign out from Power Apps

#### Returns

`Promise`\<`void`\>

---

### searchApps()

> **searchApps**(`query`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:466](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L466)

Search for apps in the apps list

#### Parameters

##### query

`string`

Search query

#### Returns

`Promise`\<`void`\>

---

### searchSolutions()

> **searchSolutions**(`query`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:480](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L480)

Search for solutions

#### Parameters

##### query

`string`

Search query

#### Returns

`Promise`\<`void`\>

---

### verifyHomePageLoaded()

> **verifyHomePageLoaded**(): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:497](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L497)

Verify home page loaded successfully

#### Returns

`Promise`\<`void`\>

---

### verifyAppsPageLoaded()

> **verifyAppsPageLoaded**(): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:506](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L506)

Verify apps page loaded successfully

#### Returns

`Promise`\<`void`\>

---

### verifySolutionsPageLoaded()

> **verifySolutionsPageLoaded**(): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:515](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L515)

Verify solutions page loaded successfully

#### Returns

`Promise`\<`void`\>

---

### verifyAppExists()

> **verifyAppExists**(`appName`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:525](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L525)

Verify app exists in the list

#### Parameters

##### appName

`string`

Name of the app

#### Returns

`Promise`\<`void`\>

---

### verifySolutionExists()

> **verifySolutionExists**(`solutionName`): `Promise`\<`void`\>

Defined in: [pages/power-apps.page.ts:534](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/pages/power-apps.page.ts#L534)

Verify solution exists in the list

#### Parameters

##### solutionName

`string`

Name of the solution

#### Returns

`Promise`\<`void`\>
