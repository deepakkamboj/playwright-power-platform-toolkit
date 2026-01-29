/**
 * App Launcher Factory
 * Creates appropriate app launcher based on app type
 * Follows Factory Design Pattern for extensibility
 */
import { Page } from '@playwright/test';
import { IAppLauncher } from './app-launcher.interface';
import { AppType } from '../types';
/**
 * Factory class to create app launchers
 * Supports Canvas Apps, Model Driven Apps, and extensible for future app types
 */
export declare class AppLauncherFactory {
    private static launcherInstances;
    /**
     * Create an app launcher for the specified app type
     * Returns a singleton instance for each page-appType combination
     * @param page - Playwright page
     * @param appType - Type of app to launch
     * @returns App launcher instance
     */
    static createLauncher(page: Page, appType: AppType): IAppLauncher;
    /**
     * Get launcher for Canvas Apps
     * @param page - Playwright page
     * @returns Canvas app launcher
     */
    static getCanvasLauncher(page: Page): IAppLauncher;
    /**
     * Get launcher for Model Driven Apps
     * @param page - Playwright page
     * @returns Model driven app launcher
     */
    static getModelDrivenLauncher(page: Page): IAppLauncher;
    /**
     * Clear all cached launcher instances
     * Use this when you need to reset state between tests
     */
    static clearCache(): void;
    /**
     * Clear launcher cache for a specific page
     * @param page - Playwright page
     */
    static clearCacheForPage(page: Page): void;
    /**
     * Get a unique identifier for a page
     * @param page - Playwright page
     * @returns Unique page identifier
     */
    private static getPageId;
    /**
     * Check if a launcher exists for the given page and app type
     * @param page - Playwright page
     * @param appType - Type of app
     * @returns true if launcher exists in cache
     */
    static hasLauncher(page: Page, appType: AppType): boolean;
}
