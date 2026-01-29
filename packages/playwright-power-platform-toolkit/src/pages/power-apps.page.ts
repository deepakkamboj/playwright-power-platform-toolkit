/**
 * Power Apps Page Object Model
 * Main entry point for interacting with Power Apps Maker Portal
 * Handles navigation between home, apps, and solutions pages
 * Extracted and enhanced from lib/old/pages/PowerAppsPage.ts
 */

import { Page, Locator, expect } from '@playwright/test';
import { PowerAppsPageLocators } from '../locators/power-apps.locators';
import { CanvasAppPage } from './canvas-app.page';
import { ModelDrivenAppPage } from './model-driven-app.page';
import { AppType, EndPointURL, NavigationOptions, SearchOptions } from '../types';
import { waitForSpinnerToDisappear } from '../utils/app-helpers';

export class PowerAppsPage {
  readonly page: Page;
  readonly locators: PowerAppsPageLocators;
  readonly canvas: CanvasAppPage;
  readonly modelDriven: ModelDrivenAppPage;

  constructor(page: Page) {
    this.page = page;
    this.locators = new PowerAppsPageLocators(page);
    this.canvas = new CanvasAppPage(page);
    this.modelDriven = new ModelDrivenAppPage(page);
  }

  // ========================================
  // Navigation Methods
  // ========================================

  /**
   * Navigate to Power Apps home page
   * @param options - Navigation options
   */
  async navigateToHome(options: NavigationOptions = {}): Promise<void> {
    const { url = '', waitForLoad = true, timeout = 60000 } = options;

    await this.page.goto(url);

    if (waitForLoad) {
      await this.waitForHomePageLoad(timeout);
    }
  }

  /**
   * Navigate to Apps page
   * Uses direct URL navigation for reliability
   * @param options - Navigation options (url is treated as base URL, '/apps' will be appended)
   */
  async navigateToApps(options: NavigationOptions = {}): Promise<void> {
    const { url = '', waitForLoad = true, timeout = 60000 } = options;
    const appsUrl = url + EndPointURL.apps;

    await this.page.goto(appsUrl);

    if (waitForLoad) {
      await this.waitForAppsPageLoad(timeout);
    }
  }

  /**
   * Navigate to Solutions page
   * Uses direct URL navigation for reliability
   * @param options - Navigation options (url is treated as base URL, '/solutions' will be appended)
   */
  async navigateToSolutions(options: NavigationOptions = {}): Promise<void> {
    const { url = '', waitForLoad = true, timeout = 60000 } = options;
    const solutionsUrl = url + EndPointURL.solutions;

    await this.page.goto(solutionsUrl);

    if (waitForLoad) {
      await this.waitForSolutionsPageLoad(timeout);
    }
  }

  /**
   * Navigate to Apps page via menu
   * First navigates to home page, then clicks the Apps menu item
   * Use this when you want to simulate user navigation through the UI
   * @param options - Navigation options
   */
  async navigateToAppsViaMenu(options: NavigationOptions = {}): Promise<void> {
    const { url = '', waitForLoad = true, timeout = 60000 } = options;

    // First navigate to home to ensure menu is available
    await this.navigateToHome({ url, waitForLoad: true, timeout });

    // Click the Apps menu item
    const appsLink = this.page.getByRole('link', { name: 'Apps', exact: true });
    await appsLink.click();

    if (waitForLoad) {
      await this.waitForAppsPageLoad(timeout);
    }
  }

  /**
   * Navigate to Solutions page via menu
   * First navigates to home page, then clicks the Solutions menu item
   * Use this when you want to simulate user navigation through the UI
   * @param options - Navigation options
   */
  async navigateToSolutionsViaMenu(options: NavigationOptions = {}): Promise<void> {
    const { url = '', waitForLoad = true, timeout = 60000 } = options;

    // First navigate to home to ensure menu is available
    await this.navigateToHome({ url, waitForLoad: true, timeout });

    // Click the Solutions menu item
    const solutionsLink = this.page.getByRole('link', { name: 'Solutions', exact: true });
    await solutionsLink.click();

    if (waitForLoad) {
      await this.waitForSolutionsPageLoad(timeout);
    }
  }

  // ========================================
  // Wait Methods
  // ========================================

  /**
   * Wait for home page to fully load
   * Waits for multiple elements to ensure page is ready
   * @param timeout - Timeout in milliseconds
   */
  async waitForHomePageLoad(timeout: number = 60000): Promise<void> {
    // Wait for root element
    await this.locators.root.waitFor({ state: 'attached', timeout });

    // Wait for page header
    await this.locators.pageHeader.waitFor({ state: 'visible', timeout });

    // Wait for main navigation
    await this.locators.mainNavigation.waitFor({ state: 'visible', timeout });

    // Wait for main content (optional - may not exist on error pages)
    try {
      await this.locators.homePageMainContent.waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      // Main content might not be visible on first load or error pages
    }

    // Wait for any loading spinners to disappear
    await waitForSpinnerToDisappear(this.page);
  }

  /**
   * Wait for Apps page to fully load
   * @param timeout - Timeout in milliseconds
   */
  async waitForAppsPageLoad(timeout: number = 60000): Promise<void> {
    // Wait for page container
    await this.locators.appsPageMainContainer.waitFor({ state: 'visible', timeout });

    // Wait for sidebar
    await this.locators.sidebar.waitFor({ state: 'visible', timeout });

    // Wait for command bar
    await this.locators.commandBar.waitFor({ state: 'visible', timeout });

    // Wait for app list grid
    await this.locators.appListGrid.waitFor({ state: 'visible', timeout });

    // Wait for loading to complete
    await waitForSpinnerToDisappear(this.page);
  }

  /**
   * Wait for Solutions page to fully load
   * @param timeout - Timeout in milliseconds
   */
  async waitForSolutionsPageLoad(timeout: number = 60000): Promise<void> {
    // Wait for solutions sidebar
    await this.locators.solutionsSidebar.waitFor({ state: 'visible', timeout });

    // Wait for command bar
    await this.locators.solutionsCommandBar.waitFor({ state: 'visible', timeout });

    // Wait for solutions list
    await this.locators.solutionsListContainer.waitFor({ state: 'visible', timeout });

    // Wait for loading to complete
    await waitForSpinnerToDisappear(this.page);
  }

  // ========================================
  // App Finding Methods
  // ========================================

  /**
   * Find an app by name in the apps list
   * Includes search and wait logic
   * @param appName - Name of the app
   * @param options - Search options
   * @returns Locator for the app
   */
  async findApp(appName: string, options: SearchOptions = {}): Promise<Locator> {
    const { timeout = 30000 } = options;

    // Ensure we're on apps page
    if (!(await this.isAppsPage())) {
      await this.navigateToApps();
    }

    // Search for the app if search box is available
    const searchBox = this.locators.solutionsSearchBox;
    if ((await searchBox.count()) > 0) {
      await searchBox.fill(appName);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
    }

    // Get the app locator
    const appLocator = this.locators.getAppByName(appName);

    // Wait for app to be visible
    await appLocator.waitFor({ state: 'visible', timeout });

    return appLocator;
  }

  /**
   * Find a solution by name
   * @param solutionName - Name of the solution
   * @param options - Search options
   * @returns Locator for the solution
   */
  async findSolution(solutionName: string, options: SearchOptions = {}): Promise<Locator> {
    const { timeout = 30000 } = options;

    // Ensure we're on solutions page
    if (!(await this.isSolutionsPage())) {
      await this.navigateToSolutions();
    }

    // Search for the solution
    const searchBox = this.locators.solutionsSearchBox;
    if ((await searchBox.count()) > 0) {
      await searchBox.fill(solutionName);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
    }

    // Get the solution locator
    const solutionLocator = this.locators.getSolutionByName(solutionName);

    // Wait for solution to be visible
    await solutionLocator.waitFor({ state: 'visible', timeout });

    return solutionLocator;
  }

  /**
   * Open the default solution
   */
  async openDefaultSolution(): Promise<void> {
    await this.navigateToSolutions();
    const defaultSolution = await this.findSolution('Common Data Services Default Solution');
    await defaultSolution.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ========================================
  // App Creation Methods
  // ========================================

  /**
   * Create a new app of specified type
   * @param appType - Type of app (Canvas or ModelDriven)
   * @param appName - Name for the new app
   */
  async createApp(appType: AppType, appName: string): Promise<void> {
    // Ensure we're on apps page
    if (!(await this.isAppsPage())) {
      await this.navigateToApps();
    }

    // Click New App button
    await this.locators.newAppButton.click();

    // Select app type
    if (appType === AppType.Canvas) {
      await this.locators.canvasAppButton.click();
      await this.canvas.waitForStudioLoad();
      await this.canvas.setAppName(appName);
    } else if (appType === AppType.ModelDriven) {
      await this.locators.modelAppButton.click();
      await this.modelDriven.waitForDesignerLoad();
      await this.modelDriven.setAppName(appName);
    }
  }

  /**
   * Delete an app by name
   * @param appType - Type of app
   * @param appName - Name of the app to delete
   */
  async deleteApp(appType: AppType, appName: string): Promise<void> {
    // Find the app
    const appLocator = await this.findApp(appName);

    // Hover to show context menu
    await appLocator.hover();

    // Click more options
    await appLocator.locator('[data-icon-name="More"]').click();

    // Click delete
    await this.locators.deleteAppButton.click();

    // Confirm deletion
    await this.locators.dialogAcceptButton.click();

    // Wait for deletion to complete
    await waitForSpinnerToDisappear(this.page);
  }

  /**
   * Open an app for editing or playing
   * @param appName - Name of the app
   * @param appType - Type of app
   * @param mode - 'edit' or 'play'
   */
  async openApp(appName: string, appType: AppType, mode: 'edit' | 'play' = 'edit'): Promise<void> {
    const appLocator = await this.findApp(appName);

    if (mode === 'edit') {
      // Right-click or hover to show menu
      await appLocator.hover();
      await appLocator.locator('[data-icon-name="More"]').click();
      await this.locators.editAppButton.click();

      // Wait for designer to load
      if (appType === AppType.Canvas) {
        await this.canvas.waitForStudioLoad();
      } else if (appType === AppType.ModelDriven) {
        await this.modelDriven.waitForDesignerLoad();
      }
    } else {
      // Click to play
      await appLocator.click();

      if (appType === AppType.ModelDriven) {
        // Model driven apps open in new window/tab
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          appLocator.click(),
        ]);
        await newPage.waitForLoadState();
      }
    }
  }

  /**
   * Open Model Driven app in new window
   * @param appName - Name of the app
   * @returns New page object
   */
  async openModelDrivenAppInNewWindow(appName: string): Promise<Page> {
    const appLocator = await this.findApp(appName);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      appLocator.click(),
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }

  // ========================================
  // Utility Methods
  // ========================================

  /**
   * Dismiss teaching bubble if present
   */
  async dismissTeachingBubble(): Promise<void> {
    const teachingBubble = this.locators.teachingBubble;

    if ((await teachingBubble.count()) > 0) {
      const closeButton = this.locators.teachingBubbleCloseButton;
      if ((await closeButton.count()) > 0) {
        await closeButton.click();
      } else {
        // Try primary button
        const primaryButton = this.locators.teachingBubblePrimaryButton;
        if ((await primaryButton.count()) > 0) {
          await primaryButton.click();
        }
      }
    }
  }

  /**
   * Check if current page is an environment error page
   * @returns True if error page is detected
   */
  async isEnvironmentErrorPage(): Promise<boolean> {
    const errorContainer = this.locators.errorPageContainer;
    return (await errorContainer.count()) > 0;
  }

  /**
   * Check if currently on home page
   */
  async isHomePage(): Promise<boolean> {
    return this.page.url().includes('/home') || this.page.url().endsWith('/');
  }

  /**
   * Check if currently on apps page
   */
  async isAppsPage(): Promise<boolean> {
    return this.page.url().includes('/apps');
  }

  /**
   * Check if currently on solutions page
   */
  async isSolutionsPage(): Promise<boolean> {
    return this.page.url().includes('/solutions');
  }

  /**
   * Take screenshot
   * @param fileName - Name for the screenshot file
   */
  async takeScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${fileName}.png`,
      fullPage: true,
    });
  }

  /**
   * Sign out from Power Apps
   */
  async signOut(): Promise<void> {
    // Click user menu
    await this.locators.meInitialsButton.click();

    // Click sign out
    const signOutButton = this.locators.signOutButton;
    if ((await signOutButton.count()) > 0) {
      await signOutButton.click();
    } else {
      await this.locators.signOutLink.click();
    }

    // Wait for sign out to complete
    await this.page.waitForURL(/.*login.*/);
  }

  // ========================================
  // Search Methods
  // ========================================

  /**
   * Search for apps in the apps list
   * @param query - Search query
   */
  async searchApps(query: string): Promise<void> {
    await this.navigateToApps();

    const searchBox = this.locators.solutionsSearchBox;
    await searchBox.fill(query);
    await this.page.keyboard.press('Enter');

    await waitForSpinnerToDisappear(this.page);
  }

  /**
   * Search for solutions
   * @param query - Search query
   */
  async searchSolutions(query: string): Promise<void> {
    await this.navigateToSolutions();

    const searchBox = this.locators.solutionsSearchBox;
    await searchBox.fill(query);
    await this.page.keyboard.press('Enter');

    await waitForSpinnerToDisappear(this.page);
  }

  // ========================================
  // Verification Methods
  // ========================================

  /**
   * Verify home page loaded successfully
   */
  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.locators.root).toBeVisible();
    await expect(this.locators.pageHeader).toBeVisible();
    await expect(this.locators.mainNavigation).toBeVisible();
  }

  /**
   * Verify apps page loaded successfully
   */
  async verifyAppsPageLoaded(): Promise<void> {
    await expect(this.locators.appsPageMainContainer).toBeVisible();
    await expect(this.locators.sidebar).toBeVisible();
    await expect(this.locators.commandBar).toBeVisible();
  }

  /**
   * Verify solutions page loaded successfully
   */
  async verifySolutionsPageLoaded(): Promise<void> {
    await expect(this.locators.solutionsSidebar).toBeVisible();
    await expect(this.locators.solutionsCommandBar).toBeVisible();
    await expect(this.locators.solutionsListContainer).toBeVisible();
  }

  /**
   * Verify app exists in the list
   * @param appName - Name of the app
   */
  async verifyAppExists(appName: string): Promise<void> {
    const appLocator = await this.findApp(appName);
    await expect(appLocator).toBeVisible();
  }

  /**
   * Verify solution exists in the list
   * @param solutionName - Name of the solution
   */
  async verifySolutionExists(solutionName: string): Promise<void> {
    const solutionLocator = await this.findSolution(solutionName);
    await expect(solutionLocator).toBeVisible();
  }
}
