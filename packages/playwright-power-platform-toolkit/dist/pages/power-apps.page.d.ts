/**
 * Power Apps Page Object Model
 * Main entry point for interacting with Power Apps Maker Portal
 * Handles navigation between home, apps, and solutions pages
 * Extracted and enhanced from lib/old/pages/PowerAppsPage.ts
 */
import { Page, Locator } from '@playwright/test';
import { PowerAppsPageLocators } from '../locators/power-apps.locators';
import { CanvasAppPage } from './canvas-app.page';
import { ModelDrivenAppPage } from './model-driven-app.page';
import { AppType, NavigationOptions, SearchOptions } from '../types';
export declare class PowerAppsPage {
    readonly page: Page;
    readonly locators: PowerAppsPageLocators;
    readonly canvas: CanvasAppPage;
    readonly modelDriven: ModelDrivenAppPage;
    constructor(page: Page);
    /**
     * Navigate to Power Apps home page
     * @param options - Navigation options
     */
    navigateToHome(options?: NavigationOptions): Promise<void>;
    /**
     * Navigate to Apps page
     * Uses direct URL navigation for reliability
     * @param options - Navigation options (url is treated as base URL, '/apps' will be appended)
     */
    navigateToApps(options?: NavigationOptions): Promise<void>;
    /**
     * Navigate to Solutions page
     * Uses direct URL navigation for reliability
     * @param options - Navigation options (url is treated as base URL, '/solutions' will be appended)
     */
    navigateToSolutions(options?: NavigationOptions): Promise<void>;
    /**
     * Navigate to Apps page via menu
     * First navigates to home page, then clicks the Apps menu item
     * Use this when you want to simulate user navigation through the UI
     * @param options - Navigation options
     */
    navigateToAppsViaMenu(options?: NavigationOptions): Promise<void>;
    /**
     * Navigate to Solutions page via menu
     * First navigates to home page, then clicks the Solutions menu item
     * Use this when you want to simulate user navigation through the UI
     * @param options - Navigation options
     */
    navigateToSolutionsViaMenu(options?: NavigationOptions): Promise<void>;
    /**
     * Wait for home page to fully load
     * Waits for multiple elements to ensure page is ready
     * @param timeout - Timeout in milliseconds
     */
    waitForHomePageLoad(timeout?: number): Promise<void>;
    /**
     * Wait for Apps page to fully load
     * @param timeout - Timeout in milliseconds
     */
    waitForAppsPageLoad(timeout?: number): Promise<void>;
    /**
     * Wait for Solutions page to fully load
     * @param timeout - Timeout in milliseconds
     */
    waitForSolutionsPageLoad(timeout?: number): Promise<void>;
    /**
     * Find an app by name in the apps list
     * Includes search and wait logic
     * @param appName - Name of the app
     * @param options - Search options
     * @returns Locator for the app
     */
    findApp(appName: string, options?: SearchOptions): Promise<Locator>;
    /**
     * Find a solution by name
     * @param solutionName - Name of the solution
     * @param options - Search options
     * @returns Locator for the solution
     */
    findSolution(solutionName: string, options?: SearchOptions): Promise<Locator>;
    /**
     * Open the default solution
     */
    openDefaultSolution(): Promise<void>;
    /**
     * Create a new app of specified type
     * @param appType - Type of app (Canvas or ModelDriven)
     * @param appName - Name for the new app
     */
    createApp(appType: AppType, appName: string): Promise<void>;
    /**
     * Delete an app by name
     * @param appType - Type of app
     * @param appName - Name of the app to delete
     */
    deleteApp(appType: AppType, appName: string): Promise<void>;
    /**
     * Open an app for editing or playing
     * @param appName - Name of the app
     * @param appType - Type of app
     * @param mode - 'edit' or 'play'
     */
    openApp(appName: string, appType: AppType, mode?: 'edit' | 'play'): Promise<void>;
    /**
     * Open Model Driven app in new window
     * @param appName - Name of the app
     * @returns New page object
     */
    openModelDrivenAppInNewWindow(appName: string): Promise<Page>;
    /**
     * Dismiss teaching bubble if present
     */
    dismissTeachingBubble(): Promise<void>;
    /**
     * Check if current page is an environment error page
     * @returns True if error page is detected
     */
    isEnvironmentErrorPage(): Promise<boolean>;
    /**
     * Check if currently on home page
     */
    isHomePage(): Promise<boolean>;
    /**
     * Check if currently on apps page
     */
    isAppsPage(): Promise<boolean>;
    /**
     * Check if currently on solutions page
     */
    isSolutionsPage(): Promise<boolean>;
    /**
     * Take screenshot
     * @param fileName - Name for the screenshot file
     */
    takeScreenshot(fileName: string): Promise<void>;
    /**
     * Sign out from Power Apps
     */
    signOut(): Promise<void>;
    /**
     * Search for apps in the apps list
     * @param query - Search query
     */
    searchApps(query: string): Promise<void>;
    /**
     * Search for solutions
     * @param query - Search query
     */
    searchSolutions(query: string): Promise<void>;
    /**
     * Verify home page loaded successfully
     */
    verifyHomePageLoaded(): Promise<void>;
    /**
     * Verify apps page loaded successfully
     */
    verifyAppsPageLoaded(): Promise<void>;
    /**
     * Verify solutions page loaded successfully
     */
    verifySolutionsPageLoaded(): Promise<void>;
    /**
     * Verify app exists in the list
     * @param appName - Name of the app
     */
    verifyAppExists(appName: string): Promise<void>;
    /**
     * Verify solution exists in the list
     * @param solutionName - Name of the solution
     */
    verifySolutionExists(solutionName: string): Promise<void>;
}
