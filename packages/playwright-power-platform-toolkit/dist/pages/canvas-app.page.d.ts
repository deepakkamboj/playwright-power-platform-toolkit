/**
 * Canvas App Page Object Model
 * Provides methods for creating, editing, and testing Canvas Apps
 */
import { Page } from '@playwright/test';
import { CanvasAppLocators } from '../locators/canvas-app.locators';
export declare class CanvasAppPage {
    readonly page: Page;
    private studioFrame;
    constructor(page: Page);
    /**
     * Get the Canvas Studio iframe
     * Canvas Studio runs in an iframe, so we need to access it
     */
    private getStudioFrame;
    /**
     * Navigate to Power Apps home page
     */
    navigateToHome(): Promise<void>;
    /**
     * Wait for home page to load
     */
    waitForHomePageLoad(): Promise<void>;
    /**
     * Wait for Canvas Studio to load
     */
    waitForStudioLoad(): Promise<void>;
    /**
     * Wait for loading spinner to disappear
     */
    waitForLoadingComplete(): Promise<void>;
    /**
     * Create a blank Canvas app
     * @param appName - Optional name for the app
     */
    createBlankCanvasApp(appName?: string): Promise<void>;
    /**
     * Create Canvas app from template
     * @param templateName - Name of the template
     */
    createFromTemplate(templateName: string): Promise<void>;
    /**
     * Create Canvas app from data
     * @param dataSourceName - Name of the data source
     */
    createFromData(dataSourceName: string): Promise<void>;
    /**
     * Set app name
     * @param appName - Name for the app
     */
    setAppName(appName: string): Promise<void>;
    /**
     * Save the Canvas app
     */
    saveApp(): Promise<void>;
    /**
     * Save app with specific name
     * @param appName - Name to save the app as
     */
    saveAppWithName(appName: string): Promise<void>;
    /**
     * Wait for save operation to complete
     */
    waitForSaveComplete(): Promise<void>;
    /**
     * Publish the Canvas app
     * @param comments - Optional version comments
     */
    publishApp(comments?: string): Promise<void>;
    /**
     * Wait for publish operation to complete
     */
    waitForPublishComplete(): Promise<void>;
    /**
     * Play/Preview the app
     */
    playApp(): Promise<void>;
    /**
     * Stop playing the app
     */
    stopPlayingApp(): Promise<void>;
    /**
     * Add a control to the canvas
     * @param controlType - Type of control (e.g., 'Button', 'Label', 'TextInput')
     */
    addControl(controlType: keyof typeof CanvasAppLocators.Studio.Insert): Promise<void>;
    /**
     * Add a button control
     */
    addButton(): Promise<void>;
    /**
     * Add a text label control
     */
    addTextLabel(): Promise<void>;
    /**
     * Add a text input control
     */
    addTextInput(): Promise<void>;
    /**
     * Add a gallery control
     */
    addGallery(): Promise<void>;
    /**
     * Select a control by name
     * @param controlName - Name of the control
     */
    selectControl(controlName: string): Promise<void>;
    /**
     * Delete selected control
     */
    deleteSelectedControl(): Promise<void>;
    /**
     * Set control property
     * @param propertyName - Name of the property
     * @param value - Value to set
     */
    setControlProperty(propertyName: string, value: string): Promise<void>;
    /**
     * Set control text property
     * @param text - Text value
     */
    setControlText(text: string): Promise<void>;
    /**
     * Set formula for a property
     * @param propertyName - Name of the property
     * @param formula - Formula to set
     */
    setFormula(propertyName: string, formula: string): Promise<void>;
    /**
     * Add data source to the app
     * @param dataSourceName - Name of the data source
     */
    addDataSource(dataSourceName: string): Promise<void>;
    /**
     * Add a new screen
     */
    addScreen(): Promise<void>;
    /**
     * Select a screen by name
     * @param screenName - Name of the screen
     */
    selectScreen(screenName: string): Promise<void>;
    /**
     * Delete a screen
     * @param screenName - Name of the screen to delete
     */
    deleteScreen(screenName: string): Promise<void>;
    /**
     * Search for an app by name
     * @param appName - Name of the app to search for
     */
    searchApp(appName: string): Promise<void>;
    /**
     * Open an existing app
     * @param appName - Name of the app to open
     */
    openApp(appName: string): Promise<void>;
    /**
     * Delete an app
     * @param appName - Name of the app to delete
     */
    deleteApp(appName: string): Promise<void>;
    /**
     * Share app with a user
     * @param userEmail - Email of the user to share with
     * @param permission - Permission level ('CanEdit' or 'CanView')
     */
    shareApp(userEmail: string, permission?: 'CanEdit' | 'CanView'): Promise<void>;
    /**
     * Verify app exists in the list
     * @param appName - Name of the app
     */
    verifyAppExists(appName: string): Promise<void>;
    /**
     * Verify app is saved
     */
    verifyAppSaved(): Promise<void>;
    /**
     * Verify app is published
     */
    verifyAppPublished(): Promise<void>;
    /**
     * Verify control exists on canvas
     * @param controlName - Name of the control
     */
    verifyControlExists(controlName: string): Promise<void>;
    /**
     * Verify error message is displayed
     */
    verifyErrorDisplayed(): Promise<void>;
}
