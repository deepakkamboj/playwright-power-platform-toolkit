"use strict";
/**
 * Canvas App Page Object Model
 * Provides methods for creating, editing, and testing Canvas Apps
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasAppPage = void 0;
const test_1 = require("@playwright/test");
const canvas_app_locators_1 = require("../locators/canvas-app.locators");
class CanvasAppPage {
    constructor(page) {
        this.studioFrame = null;
        this.page = page;
    }
    /**
     * Get the Canvas Studio iframe
     * Canvas Studio runs in an iframe, so we need to access it
     */
    async getStudioFrame() {
        if (!this.studioFrame) {
            this.studioFrame = this.page.frameLocator(canvas_app_locators_1.CanvasAppLocators.Studio.StudioFrame);
        }
        return this.studioFrame;
    }
    // ========================================
    // Navigation Methods
    // ========================================
    /**
     * Navigate to Power Apps home page
     */
    async navigateToHome() {
        await this.page.goto('');
        await this.waitForHomePageLoad();
    }
    /**
     * Wait for home page to load
     */
    async waitForHomePageLoad() {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.AppsGrid).waitFor({
            state: 'visible',
            timeout: 60000,
        });
    }
    /**
     * Wait for Canvas Studio to load
     */
    async waitForStudioLoad() {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Canvas.CanvasArea).waitFor({
            state: 'visible',
            timeout: 90000,
        });
    }
    /**
     * Wait for loading spinner to disappear
     */
    async waitForLoadingComplete() {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Common.LoadingSpinner).waitFor({
            state: 'hidden',
            timeout: 60000,
        });
    }
    // ========================================
    // App Creation Methods
    // ========================================
    /**
     * Create a blank Canvas app
     * @param appName - Optional name for the app
     */
    async createBlankCanvasApp(appName) {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.CreateButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.BlankAppOption).click();
        await this.waitForStudioLoad();
        if (appName) {
            await this.setAppName(appName);
        }
    }
    /**
     * Create Canvas app from template
     * @param templateName - Name of the template
     */
    async createFromTemplate(templateName) {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.CreateButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.TemplateAppOption).click();
        // Template selection logic would go here
        await this.waitForStudioLoad();
    }
    /**
     * Create Canvas app from data
     * @param dataSourceName - Name of the data source
     */
    async createFromData(dataSourceName) {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.CreateButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.DataAppOption).click();
        // Data source selection logic would go here
        await this.waitForStudioLoad();
    }
    // ========================================
    // App Management Methods
    // ========================================
    /**
     * Set app name
     * @param appName - Name for the app
     */
    async setAppName(appName) {
        const frame = await this.getStudioFrame();
        const nameInput = frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.CommandBar.AppName);
        await nameInput.click();
        await nameInput.fill(appName);
        await nameInput.press('Enter');
    }
    /**
     * Save the Canvas app
     */
    async saveApp() {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.CommandBar.SaveButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.Dialog).waitFor({ state: 'visible' });
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.SaveButton).click();
        await this.waitForSaveComplete();
    }
    /**
     * Save app with specific name
     * @param appName - Name to save the app as
     */
    async saveAppWithName(appName) {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.CommandBar.SaveButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.Dialog).waitFor({ state: 'visible' });
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.AppNameInput).fill(appName);
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.SaveButton).click();
        await this.waitForSaveComplete();
    }
    /**
     * Wait for save operation to complete
     */
    async waitForSaveComplete() {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.SuccessMessage).waitFor({
            state: 'visible',
            timeout: 30000,
        });
    }
    /**
     * Publish the Canvas app
     * @param comments - Optional version comments
     */
    async publishApp(comments) {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.CommandBar.PublishButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.PublishDialog.Dialog).waitFor({ state: 'visible' });
        if (comments) {
            await this.page.locator(canvas_app_locators_1.CanvasAppLocators.PublishDialog.VersionComments).fill(comments);
        }
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.PublishDialog.PublishButton).click();
        await this.waitForPublishComplete();
    }
    /**
     * Wait for publish operation to complete
     */
    async waitForPublishComplete() {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.PublishDialog.SuccessMessage).waitFor({
            state: 'visible',
            timeout: 60000,
        });
    }
    /**
     * Play/Preview the app
     */
    async playApp() {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.CommandBar.PlayButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.PlayMode.PlayWindow).waitFor({
            state: 'visible',
            timeout: 30000,
        });
    }
    /**
     * Stop playing the app
     */
    async stopPlayingApp() {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.PlayMode.StopButton).click();
    }
    // ========================================
    // Control Management Methods
    // ========================================
    /**
     * Add a control to the canvas
     * @param controlType - Type of control (e.g., 'Button', 'Label', 'TextInput')
     */
    async addControl(controlType) {
        const frame = await this.getStudioFrame();
        // Open Insert panel
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.LeftNav.InsertTab).click();
        // Click the control
        const controlSelector = canvas_app_locators_1.CanvasAppLocators.Studio.Insert[controlType];
        if (controlSelector) {
            await frame.locator(controlSelector).click();
        }
        else {
            throw new Error(`Unknown control type: ${controlType}`);
        }
    }
    /**
     * Add a button control
     */
    async addButton() {
        await this.addControl('ButtonControl');
    }
    /**
     * Add a text label control
     */
    async addTextLabel() {
        await this.addControl('TextLabelControl');
    }
    /**
     * Add a text input control
     */
    async addTextInput() {
        await this.addControl('TextInputControl');
    }
    /**
     * Add a gallery control
     */
    async addGallery() {
        await this.addControl('GalleryControl');
    }
    /**
     * Select a control by name
     * @param controlName - Name of the control
     */
    async selectControl(controlName) {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Canvas.Control(controlName)).click();
    }
    /**
     * Delete selected control
     */
    async deleteSelectedControl() {
        await this.page.keyboard.press('Delete');
    }
    // ========================================
    // Property Management Methods
    // ========================================
    /**
     * Set control property
     * @param propertyName - Name of the property
     * @param value - Value to set
     */
    async setControlProperty(propertyName, value) {
        const frame = await this.getStudioFrame();
        const propertyInput = frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Properties.PropertyItem(propertyName));
        await propertyInput.fill(value);
        await propertyInput.press('Enter');
    }
    /**
     * Set control text property
     * @param text - Text value
     */
    async setControlText(text) {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Properties.Text).fill(text);
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Properties.Text).press('Enter');
    }
    /**
     * Set formula for a property
     * @param propertyName - Name of the property
     * @param formula - Formula to set
     */
    async setFormula(propertyName, formula) {
        const frame = await this.getStudioFrame();
        // Select property from dropdown
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.FormulaBar.PropertyDropdown).click();
        await frame.locator(`option:has-text("${propertyName}")`).click();
        // Enter formula
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.FormulaBar.FormulaInput).fill(formula);
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.FormulaBar.FormulaInput).press('Enter');
    }
    // ========================================
    // Data Source Methods
    // ========================================
    /**
     * Add data source to the app
     * @param dataSourceName - Name of the data source
     */
    async addDataSource(dataSourceName) {
        const frame = await this.getStudioFrame();
        // Open Data panel
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.LeftNav.DataTab).click();
        // Click Add data
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Data.AddDataButton).click();
        // Search for data source
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Data.SearchDataSource).fill(dataSourceName);
        // Select data source
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Data.DataSourceItem(dataSourceName)).click();
        // Connect
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Data.ConnectButton).click();
    }
    // ========================================
    // Screen Management Methods
    // ========================================
    /**
     * Add a new screen
     */
    async addScreen() {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Screens.AddScreenButton).click();
    }
    /**
     * Select a screen by name
     * @param screenName - Name of the screen
     */
    async selectScreen(screenName) {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Screens.ScreenItem(screenName)).click();
    }
    /**
     * Delete a screen
     * @param screenName - Name of the screen to delete
     */
    async deleteScreen(screenName) {
        const frame = await this.getStudioFrame();
        await this.selectScreen(screenName);
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Screens.ScreenMenu).click();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Screens.DeleteScreen).click();
    }
    // ========================================
    // App Search and Selection Methods
    // ========================================
    /**
     * Search for an app by name
     * @param appName - Name of the app to search for
     */
    async searchApp(appName) {
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.SearchBox).fill(appName);
        await this.page.keyboard.press('Enter');
        await this.waitForLoadingComplete();
    }
    /**
     * Open an existing app
     * @param appName - Name of the app to open
     */
    async openApp(appName) {
        await this.searchApp(appName);
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.AppCard(appName)).click();
        await this.waitForStudioLoad();
    }
    /**
     * Delete an app
     * @param appName - Name of the app to delete
     */
    async deleteApp(appName) {
        await this.searchApp(appName);
        const appCard = this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.AppCard(appName));
        await appCard.hover();
        await appCard.locator(canvas_app_locators_1.CanvasAppLocators.Details.MoreButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.Details.DeleteButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.DeleteDialog.Dialog).waitFor({ state: 'visible' });
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.DeleteDialog.DeleteButton).click();
    }
    // ========================================
    // Share Methods
    // ========================================
    /**
     * Share app with a user
     * @param userEmail - Email of the user to share with
     * @param permission - Permission level ('CanEdit' or 'CanView')
     */
    async shareApp(userEmail, permission = 'CanView') {
        const frame = await this.getStudioFrame();
        await frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.CommandBar.ShareButton).click();
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.ShareDialog.Dialog).waitFor({ state: 'visible' });
        // Search for user
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.ShareDialog.SearchUsers).fill(userEmail);
        await this.page.keyboard.press('Enter');
        // Set permission
        await this.page
            .locator(canvas_app_locators_1.CanvasAppLocators.ShareDialog.PermissionDropdown)
            .selectOption(permission);
        // Share
        await this.page.locator(canvas_app_locators_1.CanvasAppLocators.ShareDialog.ShareButton).click();
    }
    // ========================================
    // Verification Methods
    // ========================================
    /**
     * Verify app exists in the list
     * @param appName - Name of the app
     */
    async verifyAppExists(appName) {
        await this.searchApp(appName);
        await (0, test_1.expect)(this.page.locator(canvas_app_locators_1.CanvasAppLocators.Home.AppCard(appName))).toBeVisible();
    }
    /**
     * Verify app is saved
     */
    async verifyAppSaved() {
        await (0, test_1.expect)(this.page.locator(canvas_app_locators_1.CanvasAppLocators.SaveDialog.SuccessMessage)).toBeVisible();
    }
    /**
     * Verify app is published
     */
    async verifyAppPublished() {
        await (0, test_1.expect)(this.page.locator(canvas_app_locators_1.CanvasAppLocators.PublishDialog.SuccessMessage)).toBeVisible();
    }
    /**
     * Verify control exists on canvas
     * @param controlName - Name of the control
     */
    async verifyControlExists(controlName) {
        const frame = await this.getStudioFrame();
        await (0, test_1.expect)(frame.locator(canvas_app_locators_1.CanvasAppLocators.Studio.Canvas.Control(controlName))).toBeVisible();
    }
    /**
     * Verify error message is displayed
     */
    async verifyErrorDisplayed() {
        await (0, test_1.expect)(this.page.locator(canvas_app_locators_1.CanvasAppLocators.Common.ErrorBanner)).toBeVisible();
    }
}
exports.CanvasAppPage = CanvasAppPage;
