**Playwright Power Platform Toolkit v0.0.4**

***

# Playwright Power Platform Toolkit v0.0.4

Power Platform Apps Testing Library
Independent library for Canvas and Model Driven app testing
Enhanced with production-tested components from legacy library

## Enumerations

- [CanvasControlType](enumerations/CanvasControlType.md)
- [AppLaunchMode](enumerations/AppLaunchMode.md)
- [AppType](enumerations/AppType.md)
- [EndPointURL](enumerations/EndPointURL.md)
- [WCAGLevel](enumerations/WCAGLevel.md)
- [TimeOut](enumerations/TimeOut.md)

## Classes

- [AppLauncherFactory](classes/AppLauncherFactory.md)
- [AppProvider](classes/AppProvider.md)
- [BaseLocators](classes/BaseLocators.md)
- [LocatorUtils](classes/LocatorUtils.md)
- [PowerAppsPageLocators](classes/PowerAppsPageLocators.md)
- [CanvasAppPage](classes/CanvasAppPage.md)
- [ModelDrivenAppPage](classes/ModelDrivenAppPage.md)
- [PowerAppsPage](classes/PowerAppsPage.md)
- [AccessibilityTestHelper](classes/AccessibilityTestHelper.md)
- [AccessibilityAssertions](classes/AccessibilityAssertions.md)
- [ApiRecorder](classes/ApiRecorder.md)
- [ApiTestHelper](classes/ApiTestHelper.md)
- [ApiAssertions](classes/ApiAssertions.md)
- [ConfigHelper](classes/ConfigHelper.md)
- [TestLogger](classes/TestLogger.md)

## Interfaces

- [IAppLauncher](interfaces/IAppLauncher.md)
- [AppMetadata](interfaces/AppMetadata.md)
- [LaunchAppConfig](interfaces/LaunchAppConfig.md)
- [AppPlayerOptions](interfaces/AppPlayerOptions.md)
- [ControlOptions](interfaces/ControlOptions.md)
- [AssertionOptions](interfaces/AssertionOptions.md)
- [NavigationOptions](interfaces/NavigationOptions.md)
- [SearchOptions](interfaces/SearchOptions.md)
- [AppCreationOptions](interfaces/AppCreationOptions.md)
- [WaitOptions](interfaces/WaitOptions.md)
- [ApiRecorderOptions](interfaces/ApiRecorderOptions.md)
- [RecordedApiCall](interfaces/RecordedApiCall.md)
- [RecordingStatistics](interfaces/RecordingStatistics.md)
- [TestCodeOptions](interfaces/TestCodeOptions.md)
- [QueryOptions](interfaces/QueryOptions.md)
- [ApiResponseValidation](interfaces/ApiResponseValidation.md)
- [OperationResult](interfaces/OperationResult.md)
- [StorageState](interfaces/StorageState.md)
- [TokenExpirationCheck](interfaces/TokenExpirationCheck.md)

## Variables

- [CanvasAppLocators](variables/CanvasAppLocators.md)
- [ModelDrivenAppLocators](variables/ModelDrivenAppLocators.md)
- [PowerAppsPageSelectors](variables/PowerAppsPageSelectors.md)
- [AccessibilityRules](variables/AccessibilityRules.md)
- [PowerAppsApiEndpoints](variables/PowerAppsApiEndpoints.md)
- [colors](variables/colors.md)

## Functions

- [getCanvasDataTestId](functions/getCanvasDataTestId.md)
- [getCanvasControlByName](functions/getCanvasControlByName.md)
- [getCanvasScreenByName](functions/getCanvasScreenByName.md)
- [getModelDrivenDataAutomationId](functions/getModelDrivenDataAutomationId.md)
- [getModelDrivenTablePage](functions/getModelDrivenTablePage.md)
- [getModelDrivenFormField](functions/getModelDrivenFormField.md)
- [getModelDrivenNavItem](functions/getModelDrivenNavItem.md)
- [extractTokenFromStorage](functions/extractTokenFromStorage.md)
- [createAuthenticatedApiContext](functions/createAuthenticatedApiContext.md)
- [buildBapApiEndpoint](functions/buildBapApiEndpoint.md)
- [createBapApiHeaders](functions/createBapApiHeaders.md)
- [buildResourceQueryEndpoint](functions/buildResourceQueryEndpoint.md)
- [createQueryPayload](functions/createQueryPayload.md)
- [extractRequestId](functions/extractRequestId.md)
- [validateApiResponse](functions/validateApiResponse.md)
- [pollOperationStatus](functions/pollOperationStatus.md)
- [generateUniqueAppName](functions/generateUniqueAppName.md)
- [generateRandomAlphaNumeric](functions/generateRandomAlphaNumeric.md)
- [waitForElement](functions/waitForElement.md)
- [waitForElementHidden](functions/waitForElementHidden.md)
- [waitForSpinnerToDisappear](functions/waitForSpinnerToDisappear.md)
- [clickWithRetry](functions/clickWithRetry.md)
- [fillWithRetry](functions/fillWithRetry.md)
- [elementExists](functions/elementExists.md)
- [getElementCount](functions/getElementCount.md)
- [scrollIntoView](functions/scrollIntoView.md)
- [waitForNetworkIdle](functions/waitForNetworkIdle.md)
- [takeScreenshot](functions/takeScreenshot.md)
- [handleDialog](functions/handleDialog.md)
- [waitForDownload](functions/waitForDownload.md)
- [uploadFile](functions/uploadFile.md)
- [typeWithDelay](functions/typeWithDelay.md)
- [selectDropdownOption](functions/selectDropdownOption.md)
- [hoverElement](functions/hoverElement.md)
- [doubleClickElement](functions/doubleClickElement.md)
- [rightClickElement](functions/rightClickElement.md)
- [getTextContent](functions/getTextContent.md)
- [getAttributeValue](functions/getAttributeValue.md)
- [isElementEnabled](functions/isElementEnabled.md)
- [isElementDisabled](functions/isElementDisabled.md)
- [isElementChecked](functions/isElementChecked.md)
- [waitForElementCount](functions/waitForElementCount.md)
- [pressKey](functions/pressKey.md)
- [pressShortcut](functions/pressShortcut.md)
- [storageStatePath](functions/storageStatePath.md)
- [getStorageStatePath](functions/getStorageStatePath.md)
- [getAuthToken](functions/getAuthToken.md)
- [checkStorageStateExpiration](functions/checkStorageStateExpiration.md)
- [checkEnvironmentVariables](functions/checkEnvironmentVariables.md)
