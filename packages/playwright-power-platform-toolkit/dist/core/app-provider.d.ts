/**
 * App Provider
 * High-level provider for launching and managing Power Platform apps
 * Implements Provider Pattern for simplified app testing
 */
import { Page, Locator } from '@playwright/test';
import { AppMetadata } from './app-launcher.interface';
import { AppType, AppLaunchMode, AppPlayerOptions, ControlOptions } from '../types';
/**
 * Configuration for launching an app
 */
export interface LaunchAppConfig {
    /** App identifier - either name or ID */
    app: string | {
        id: string;
    } | {
        name: string;
    };
    /** Type of app to launch */
    type: AppType;
    /** Launch mode (play, edit, preview) */
    mode?: AppLaunchMode;
    /** Base URL for direct ID-based launch */
    baseUrl?: string;
    /** Additional launch options */
    options?: AppPlayerOptions;
}
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
export declare class AppProvider {
    private page;
    private findAppCallback;
    private currentLauncher;
    private currentAppType;
    private launchedApps;
    constructor(page: Page, findAppCallback?: (appName: string) => Promise<Locator>);
    /**
     * Set the callback for finding apps by name
     * Required for launching apps by name
     * @param callback - Function to find app by name
     */
    setFindAppCallback(callback: (appName: string) => Promise<Locator>): void;
    /**
     * Launch an app
     * Supports launching by name or ID
     * @param config - Launch configuration
     */
    launch(config: LaunchAppConfig): Promise<void>;
    /**
     * Launch app by name
     * @param appName - Name of the app
     * @param mode - Launch mode
     * @param options - Launch options
     */
    private launchByName;
    /**
     * Launch app by ID
     * @param appId - ID of the app
     * @param baseUrl - Base URL
     * @param mode - Launch mode
     * @param options - Launch options
     */
    private launchById;
    /**
     * Get a control in the current app
     * @param options - Control options
     * @returns Locator for the control
     */
    getControl(options: ControlOptions): Locator;
    /**
     * Click a control in the current app
     * @param options - Control options
     */
    click(options: ControlOptions): Promise<void>;
    /**
     * Fill a text input control in the current app
     * @param options - Control options
     * @param value - Value to fill
     */
    fill(options: ControlOptions, value: string): Promise<void>;
    /**
     * Fill a form in the current app
     * @param formData - Key-value pairs of field names and values
     */
    fillForm(formData: Record<string, string>): Promise<void>;
    /**
     * Assert control is visible
     * @param options - Control options
     */
    assertVisible(options: ControlOptions): Promise<void>;
    /**
     * Assert control text matches
     * @param options - Control options
     * @param expectedText - Expected text
     */
    assertText(options: ControlOptions, expectedText: string): Promise<void>;
    /**
     * Close the current app
     */
    close(): Promise<void>;
    /**
     * Check if an app is currently launched and ready
     * @returns true if app is ready
     */
    isReady(): boolean;
    /**
     * Get the current app type
     * @returns Current app type or null
     */
    getCurrentAppType(): AppType | null;
    /**
     * Get the current app ID
     * @returns Current app ID or null
     */
    getCurrentAppId(): string | null;
    /**
     * Get the current app URL
     * @returns Current app URL or null
     */
    getCurrentAppUrl(): string | null;
    /**
     * Get metadata for all launched apps
     * @returns Array of app metadata
     */
    getLaunchedApps(): AppMetadata[];
    /**
     * Reset the provider state
     * Clears current launcher and app metadata
     */
    reset(): void;
    /**
     * Ensure launcher exists before operations
     * @throws Error if no launcher is available
     */
    private ensureLauncherExists;
    /**
     * Store metadata for a launched app
     * @param app - App identifier
     * @param type - App type
     */
    private storeAppMetadata;
}
