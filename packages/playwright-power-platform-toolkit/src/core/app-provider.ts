/**
 * App Provider
 * High-level provider for launching and managing Power Platform apps
 * Implements Provider Pattern for simplified app testing
 */

import { Page, Locator } from '@playwright/test';
import { AppLauncherFactory } from './app-launcher.factory';
import { IAppLauncher, AppMetadata } from './app-launcher.interface';
import { AppType, AppLaunchMode, AppPlayerOptions, ControlOptions } from '../types';

/**
 * Configuration for launching an app
 */
export interface LaunchAppConfig {
  /** App identifier - either name or ID */
  app: string | { id: string } | { name: string };
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
export class AppProvider {
  private page: Page;
  private findAppCallback: ((appName: string) => Promise<Locator>) | null = null;
  private currentLauncher: IAppLauncher | null = null;
  private currentAppType: AppType | null = null;
  private launchedApps: Map<string, AppMetadata> = new Map();

  constructor(page: Page, findAppCallback?: (appName: string) => Promise<Locator>) {
    this.page = page;
    this.findAppCallback = findAppCallback || null;
  }

  /**
   * Set the callback for finding apps by name
   * Required for launching apps by name
   * @param callback - Function to find app by name
   */
  setFindAppCallback(callback: (appName: string) => Promise<Locator>): void {
    this.findAppCallback = callback;
  }

  /**
   * Launch an app
   * Supports launching by name or ID
   * @param config - Launch configuration
   */
  async launch(config: LaunchAppConfig): Promise<void> {
    const { app, type, mode = AppLaunchMode.Play, baseUrl, options = {} } = config;

    // Create launcher for the app type
    this.currentLauncher = AppLauncherFactory.createLauncher(this.page, type);
    this.currentAppType = type;

    // Determine if launching by name or ID
    if (typeof app === 'string') {
      // Simple string - treat as name
      if (!app || app.trim() === '') {
        throw new Error('App name is empty or not set. Please provide a valid app name.');
      }
      await this.launchByName(app, mode, options);
    } else if ('id' in app) {
      // Launch by ID
      if (!baseUrl) {
        throw new Error('baseUrl is required when launching by ID');
      }
      if (!app.id || app.id.trim() === '') {
        throw new Error(
          'App ID is empty or not set. Please provide a valid app ID or set the appropriate environment variable (CANVAS_APP_ID or MODEL_APP_ID).'
        );
      }
      await this.launchById(app.id, baseUrl, mode, options);
    } else if ('name' in app) {
      // Launch by name
      if (!app.name || app.name.trim() === '') {
        throw new Error('App name is empty or not set. Please provide a valid app name.');
      }
      await this.launchByName(app.name, mode, options);
    } else {
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
  private async launchByName(
    appName: string,
    mode: AppLaunchMode,
    options: AppPlayerOptions
  ): Promise<void> {
    if (!this.findAppCallback) {
      throw new Error(
        'findAppCallback not set. Call setFindAppCallback() or pass it in constructor'
      );
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
  private async launchById(
    appId: string,
    baseUrl: string,
    mode: AppLaunchMode,
    options: AppPlayerOptions
  ): Promise<void> {
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
  getControl(options: ControlOptions): Locator {
    this.ensureLauncherExists();
    return this.currentLauncher!.getControl(options);
  }

  /**
   * Click a control in the current app
   * @param options - Control options
   */
  async click(options: ControlOptions): Promise<void> {
    this.ensureLauncherExists();
    await this.currentLauncher!.clickControl(options);
  }

  /**
   * Fill a text input control in the current app
   * @param options - Control options
   * @param value - Value to fill
   */
  async fill(options: ControlOptions, value: string): Promise<void> {
    this.ensureLauncherExists();
    await this.currentLauncher!.fillControl(options, value);
  }

  /**
   * Fill a form in the current app
   * @param formData - Key-value pairs of field names and values
   */
  async fillForm(formData: Record<string, string>): Promise<void> {
    this.ensureLauncherExists();
    await this.currentLauncher!.fillForm(formData);
  }

  /**
   * Assert control is visible
   * @param options - Control options
   */
  async assertVisible(options: ControlOptions): Promise<void> {
    this.ensureLauncherExists();
    await this.currentLauncher!.assertControlVisible(options);
  }

  /**
   * Assert control text matches
   * @param options - Control options
   * @param expectedText - Expected text
   */
  async assertText(options: ControlOptions, expectedText: string): Promise<void> {
    this.ensureLauncherExists();
    await this.currentLauncher!.assertControlText(options, expectedText);
  }

  /**
   * Close the current app
   */
  async close(): Promise<void> {
    this.ensureLauncherExists();
    await this.currentLauncher!.closeApp();
    this.currentLauncher = null;
    this.currentAppType = null;
  }

  /**
   * Check if an app is currently launched and ready
   * @returns true if app is ready
   */
  isReady(): boolean {
    return this.currentLauncher?.isAppReady() ?? false;
  }

  /**
   * Get the current app type
   * @returns Current app type or null
   */
  getCurrentAppType(): AppType | null {
    return this.currentAppType;
  }

  /**
   * Get the current app ID
   * @returns Current app ID or null
   */
  getCurrentAppId(): string | null {
    return this.currentLauncher?.getAppId() ?? null;
  }

  /**
   * Get the current app URL
   * @returns Current app URL or null
   */
  getCurrentAppUrl(): string | null {
    return this.currentLauncher?.getAppUrl() ?? null;
  }

  /**
   * Get metadata for all launched apps
   * @returns Array of app metadata
   */
  getLaunchedApps(): AppMetadata[] {
    return Array.from(this.launchedApps.values());
  }

  /**
   * Reset the provider state
   * Clears current launcher and app metadata
   */
  reset(): void {
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
  private ensureLauncherExists(): void {
    if (!this.currentLauncher) {
      throw new Error('No app is currently launched. Call launch() first.');
    }
  }

  /**
   * Store metadata for a launched app
   * @param app - App identifier
   * @param type - App type
   */
  private storeAppMetadata(app: string | { id: string } | { name: string }, type: AppType): void {
    const appId = this.currentLauncher?.getAppId() || 'unknown';
    const appName = typeof app === 'string' ? app : 'name' in app ? app.name : `app-${appId}`;

    const metadata: AppMetadata = {
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
