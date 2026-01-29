"use strict";
/**
 * App Launcher Factory
 * Creates appropriate app launcher based on app type
 * Follows Factory Design Pattern for extensibility
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLauncherFactory = void 0;
const types_1 = require("../types");
const canvas_app_page_1 = require("../pages/canvas-app.page");
const model_driven_app_page_1 = require("../pages/model-driven-app.page");
/**
 * Factory class to create app launchers
 * Supports Canvas Apps, Model Driven Apps, and extensible for future app types
 */
class AppLauncherFactory {
    /**
     * Create an app launcher for the specified app type
     * Returns a singleton instance for each page-appType combination
     * @param page - Playwright page
     * @param appType - Type of app to launch
     * @returns App launcher instance
     */
    static createLauncher(page, appType) {
        // Create unique key for caching
        const cacheKey = `${appType}-${this.getPageId(page)}`;
        // Return cached instance if exists
        if (this.launcherInstances.has(cacheKey)) {
            return this.launcherInstances.get(cacheKey);
        }
        // Create new instance based on app type
        let launcher;
        switch (appType) {
            case types_1.AppType.Canvas:
                launcher = new canvas_app_page_1.CanvasAppPage(page);
                break;
            case types_1.AppType.ModelDriven:
                launcher = new model_driven_app_page_1.ModelDrivenAppPage(page);
                break;
            case types_1.AppType.Portal:
                throw new Error('Portal app launcher not yet implemented. Coming soon!');
            default:
                throw new Error(`Unsupported app type: ${appType}`);
        }
        // Cache the instance
        this.launcherInstances.set(cacheKey, launcher);
        return launcher;
    }
    /**
     * Get launcher for Canvas Apps
     * @param page - Playwright page
     * @returns Canvas app launcher
     */
    static getCanvasLauncher(page) {
        return this.createLauncher(page, types_1.AppType.Canvas);
    }
    /**
     * Get launcher for Model Driven Apps
     * @param page - Playwright page
     * @returns Model driven app launcher
     */
    static getModelDrivenLauncher(page) {
        return this.createLauncher(page, types_1.AppType.ModelDriven);
    }
    /**
     * Clear all cached launcher instances
     * Use this when you need to reset state between tests
     */
    static clearCache() {
        this.launcherInstances.clear();
    }
    /**
     * Clear launcher cache for a specific page
     * @param page - Playwright page
     */
    static clearCacheForPage(page) {
        const pageId = this.getPageId(page);
        const keysToDelete = [];
        this.launcherInstances.forEach((_, key) => {
            if (key.endsWith(`-${pageId}`)) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach((key) => this.launcherInstances.delete(key));
    }
    /**
     * Get a unique identifier for a page
     * @param page - Playwright page
     * @returns Unique page identifier
     */
    static getPageId(page) {
        // Use page URL or a unique identifier
        return page.url() || `page-${Date.now()}`;
    }
    /**
     * Check if a launcher exists for the given page and app type
     * @param page - Playwright page
     * @param appType - Type of app
     * @returns true if launcher exists in cache
     */
    static hasLauncher(page, appType) {
        const cacheKey = `${appType}-${this.getPageId(page)}`;
        return this.launcherInstances.has(cacheKey);
    }
}
exports.AppLauncherFactory = AppLauncherFactory;
AppLauncherFactory.launcherInstances = new Map();
