/**
 * Model Driven App Page Object Model
 * Provides methods for creating, editing, and testing Model Driven Apps
 */
import { Page } from '@playwright/test';
export declare class ModelDrivenAppPage {
    readonly page: Page;
    constructor(page: Page);
    /**
     * Navigate to Power Apps home page
     */
    navigateToHome(): Promise<void>;
    /**
     * Wait for home page to load
     */
    waitForHomePageLoad(): Promise<void>;
    /**
     * Wait for App Designer to load
     */
    waitForDesignerLoad(): Promise<void>;
    /**
     * Wait for loading spinner to disappear
     */
    waitForLoadingComplete(): Promise<void>;
    /**
     * Wait for app runtime to load
     */
    waitForRuntimeLoad(): Promise<void>;
    /**
     * Create a blank Model Driven app
     * @param appName - Name for the app
     */
    createBlankModelDrivenApp(appName: string): Promise<void>;
    /**
     * Create Model Driven app from solution
     * @param solutionName - Name of the solution
     * @param appName - Name for the app
     */
    createFromSolution(solutionName: string, appName: string): Promise<void>;
    /**
     * Filter apps by Model Driven type
     */
    filterByModelDrivenApps(): Promise<void>;
    /**
     * Set app name
     * @param appName - Name for the app
     */
    setAppName(appName: string): Promise<void>;
    /**
     * Save the Model Driven app
     */
    saveApp(): Promise<void>;
    /**
     * Publish the Model Driven app
     */
    publishApp(): Promise<void>;
    /**
     * Wait for publish operation to complete
     */
    waitForPublishComplete(): Promise<void>;
    /**
     * Play/Open the app in runtime
     */
    playApp(): Promise<void>;
    /**
     * Validate the app
     */
    validateApp(): Promise<void>;
    /**
     * Add a table-based page
     * @param tableName - Name of the table
     * @param forms - Array of form names to include
     * @param views - Array of view names to include
     */
    addTableBasedPage(tableName: string, forms?: string[], views?: string[]): Promise<void>;
    /**
     * Add a dashboard page
     */
    addDashboardPage(): Promise<void>;
    /**
     * Add a custom page
     */
    addCustomPage(): Promise<void>;
    /**
     * Delete a page
     * @param pageName - Name of the page to delete
     */
    deletePage(pageName: string): Promise<void>;
    /**
     * Add navigation group
     * @param groupName - Name for the group
     */
    addNavigationGroup(groupName: string): Promise<void>;
    /**
     * Add navigation subarea
     * @param groupName - Parent group name
     * @param subAreaTitle - Title for the subarea
     * @param tableName - Optional table to link to
     */
    addNavigationSubArea(groupName: string, subAreaTitle: string, tableName?: string): Promise<void>;
    /**
     * Add table to the app
     * @param tableName - Name of the table
     */
    addTable(tableName: string): Promise<void>;
    /**
     * Create a new table
     * @param displayName - Display name for the table
     * @param pluralName - Plural name for the table
     */
    createNewTable(displayName: string, pluralName: string): Promise<void>;
    /**
     * Open app settings
     */
    openSettings(): Promise<void>;
    /**
     * Set app description
     * @param description - Description for the app
     */
    setAppDescription(description: string): Promise<void>;
    /**
     * Enable mobile for the app
     */
    enableMobile(): Promise<void>;
    /**
     * Enable offline mode
     */
    enableOfflineMode(): Promise<void>;
    /**
     * Navigate to a navigation item in runtime
     * @param itemName - Name of the navigation item
     */
    navigateToRuntimeItem(itemName: string): Promise<void>;
    /**
     * Expand navigation group in runtime
     * @param groupName - Name of the group
     */
    expandNavigationGroup(groupName: string): Promise<void>;
    /**
     * Create new record in runtime
     */
    createNewRecord(): Promise<void>;
    /**
     * Save record in runtime
     */
    saveRecord(): Promise<void>;
    /**
     * Fill form field in runtime
     * @param fieldName - Name of the field
     * @param value - Value to fill
     */
    fillFormField(fieldName: string, value: string): Promise<void>;
    /**
     * Click command bar button in runtime
     * @param buttonLabel - Label of the button
     */
    clickCommandButton(buttonLabel: string): Promise<void>;
    /**
     * Switch form tab in runtime
     * @param tabName - Name of the tab
     */
    switchFormTab(tabName: string): Promise<void>;
    /**
     * Share app with a user
     * @param userEmail - Email of the user
     * @param securityRole - Security role to assign
     */
    shareApp(userEmail: string, securityRole: string): Promise<void>;
    /**
     * Search for an app by name
     * @param appName - Name of the app
     */
    searchApp(appName: string): Promise<void>;
    /**
     * Open an existing app for editing
     * @param appName - Name of the app
     */
    openAppForEdit(appName: string): Promise<void>;
    /**
     * Open an existing app in play mode
     * @param appName - Name of the app
     */
    openAppForPlay(appName: string): Promise<void>;
    /**
     * Delete an app
     * @param appName - Name of the app to delete
     */
    deleteApp(appName: string): Promise<void>;
    /**
     * Verify app exists in the list
     * @param appName - Name of the app
     */
    verifyAppExists(appName: string): Promise<void>;
    /**
     * Verify app is published
     */
    verifyAppPublished(): Promise<void>;
    /**
     * Verify page exists in designer
     * @param pageName - Name of the page
     */
    verifyPageExists(pageName: string): Promise<void>;
    /**
     * Verify navigation item exists
     * @param itemName - Name of the navigation item
     */
    verifyNavigationItemExists(itemName: string): Promise<void>;
    /**
     * Verify table is added to app
     * @param tableName - Name of the table
     */
    verifyTableAdded(tableName: string): Promise<void>;
    /**
     * Verify validation has no errors
     */
    verifyNoValidationErrors(): Promise<void>;
    /**
     * Verify runtime loaded successfully
     */
    verifyRuntimeLoaded(): Promise<void>;
    /**
     * Verify record saved in runtime
     */
    verifyRecordSaved(): Promise<void>;
}
