"use strict";
/**
 * App Provider
 * High-level provider for launching and managing Power Platform apps
 * Implements Provider Pattern for simplified app testing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = void 0;
const app_launcher_factory_1 = require("./app-launcher.factory");
const types_1 = require("../types");
/**
 * App Provider - High-level API for app testing
 * Provides simplified interface for customers to launch and test their apps
 *
 * @example
 * ```typescript
 * const provider = new AppProvider(page, findAppCallback);
 *
 * // Launch by name
 * await provider.launch({
 *   app: { name: 'My Sales App' },
 *   type: AppType.Canvas,
 *   mode: AppLaunchMode.Play
 * });
 *
 * // Launch by ID
 * await provider.launch({
 *   app: { id: 'abc-123-def' },
 *   type: AppType.ModelDriven,
 *   mode: AppLaunchMode.Edit,
 *   baseUrl: 'https://make.powerapps.com'
 * });
 *
 * // Interact with app
 * await provider.click({ name: 'Submit', type: CanvasControlType.Button });
 * await provider.fill({ name: 'Email' }, 'test@example.com');
 * ```
 */
class AppProvider {
    constructor(page, findAppCallback) {
        this.findAppCallback = null;
        this.currentLauncher = null;
        this.currentAppType = null;
        this.launchedApps = new Map();
        this.page = page;
        this.findAppCallback = findAppCallback || null;
    }
    /**
     * Set the callback for finding apps by name
     * Required for launching apps by name
     * @param callback - Function to find app by name
     */
    setFindAppCallback(callback) {
        this.findAppCallback = callback;
    }
    /**
     * Launch an app
     * Supports launching by name or ID
     * @param config - Launch configuration
     */
    async launch(config) {
        const { app, type, mode = types_1.AppLaunchMode.Play, baseUrl, options = {} } = config;
        // Create launcher for the app type
        this.currentLauncher = app_launcher_factory_1.AppLauncherFactory.createLauncher(this.page, type);
        this.currentAppType = type;
        // Determine if launching by name or ID
        if (typeof app === 'string') {
            // Simple string - treat as name
            await this.launchByName(app, mode, options);
        }
        else if ('id' in app) {
            // Launch by ID
            if (!baseUrl) {
                throw new Error('baseUrl is required when launching by ID');
            }
            await this.launchById(app.id, baseUrl, mode, options);
        }
        else if ('name' in app) {
            // Launch by name
            await this.launchByName(app.name, mode, options);
        }
        else {
            throw new Error('Invalid app identifier. Use string, { id: "..." }, or { name: "..." }');
        }
        // Store metadata
        this.storeAppMetadata(app, type);
    }
    /**
     * Launch app by name
     * @param appName - Name of the app
     * @param mode - Launch mode
     * @param options - Launch options
     */
    async launchByName(appName, mode, options) {
        if (!this.findAppCallback) {
            throw new Error('findAppCallback not set. Call setFindAppCallback() or pass it in constructor');
        }
        if (!this.currentLauncher) {
            throw new Error('No launcher available. This should not happen.');
        }
        await this.currentLauncher.launchByName(appName, this.findAppCallback, mode, options);
    }
    /**
     * Launch app by ID
     * @param appId - ID of the app
     * @param baseUrl - Base URL
     * @param mode - Launch mode
     * @param options - Launch options
     */
    async launchById(appId, baseUrl, mode, options) {
        if (!this.currentLauncher) {
            throw new Error('No launcher available. This should not happen.');
        }
        await this.currentLauncher.launchById(appId, baseUrl, mode, options);
    }
    /**
     * Get a control in the current app
     * @param options - Control options
     * @returns Locator for the control
     */
    getControl(options) {
        this.ensureLauncherExists();
        return this.currentLauncher.getControl(options);
    }
    /**
     * Click a control in the current app
     * @param options - Control options
     */
    async click(options) {
        this.ensureLauncherExists();
        await this.currentLauncher.clickControl(options);
    }
    /**
     * Fill a text input control in the current app
     * @param options - Control options
     * @param value - Value to fill
     */
    async fill(options, value) {
        this.ensureLauncherExists();
        await this.currentLauncher.fillControl(options, value);
    }
    /**
     * Fill a form in the current app
     * @param formData - Key-value pairs of field names and values
     */
    async fillForm(formData) {
        this.ensureLauncherExists();
        await this.currentLauncher.fillForm(formData);
    }
    /**
     * Assert control is visible
     * @param options - Control options
     */
    async assertVisible(options) {
        this.ensureLauncherExists();
        await this.currentLauncher.assertControlVisible(options);
    }
    /**
     * Assert control text matches
     * @param options - Control options
     * @param expectedText - Expected text
     */
    async assertText(options, expectedText) {
        this.ensureLauncherExists();
        await this.currentLauncher.assertControlText(options, expectedText);
    }
    /**
     * Close the current app
     */
    async close() {
        this.ensureLauncherExists();
        await this.currentLauncher.closeApp();
        this.currentLauncher = null;
        this.currentAppType = null;
    }
    /**
     * Check if an app is currently launched and ready
     * @returns true if app is ready
     */
    isReady() {
        return this.currentLauncher?.isAppReady() ?? false;
    }
    /**
     * Get the current app type
     * @returns Current app type or null
     */
    getCurrentAppType() {
        return this.currentAppType;
    }
    /**
     * Get the current app ID
     * @returns Current app ID or null
     */
    getCurrentAppId() {
        return this.currentLauncher?.getAppId() ?? null;
    }
    /**
     * Get the current app URL
     * @returns Current app URL or null
     */
    getCurrentAppUrl() {
        return this.currentLauncher?.getAppUrl() ?? null;
    }
    /**
     * Get metadata for all launched apps
     * @returns Array of app metadata
     */
    getLaunchedApps() {
        return Array.from(this.launchedApps.values());
    }
    /**
     * Reset the provider state
     * Clears current launcher and app metadata
     */
    reset() {
        if (this.currentLauncher) {
            this.currentLauncher.reset();
        }
        this.currentLauncher = null;
        this.currentAppType = null;
        this.launchedApps.clear();
    }
    /**
     * Ensure launcher exists before operations
     * @throws Error if no launcher is available
     */
    ensureLauncherExists() {
        if (!this.currentLauncher) {
            throw new Error('No app is currently launched. Call launch() first.');
        }
    }
    /**
     * Store metadata for a launched app
     * @param app - App identifier
     * @param type - App type
     */
    storeAppMetadata(app, type) {
        const appId = this.currentLauncher?.getAppId() || 'unknown';
        const appName = typeof app === 'string' ? app : 'name' in app ? app.name : `app-${appId}`;
        const metadata = {
            id: appId,
            name: appName,
            type: type,
            url: this.currentLauncher?.getAppUrl() || null,
            isReady: this.currentLauncher?.isAppReady() || false,
            launchedAt: new Date(),
        };
        this.launchedApps.set(appId, metadata);
    }
}
exports.AppProvider = AppProvider;
