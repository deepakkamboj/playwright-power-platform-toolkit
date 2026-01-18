/*!
 * Power Apps Page Object Model - Refactored with Best Practices
 * Follows Playwright recommended patterns for Page Object Model
 * Supports Canvas Apps, Model-Driven Apps, and Power Platform portal
 */

import { expect, Locator, Page } from '@playwright/test';
import { PowerAppsPageLocators } from '@locators/PowerAppsPageLocators';
import {
  TimeOut,
  waitForCondition,
  randomAlphaNumeric,
  safeFill,
  dismissTeachingBubbleIfPresent,
} from '@utils/CommonUtils';
import { ConfigHelper, navigateToUrl } from '@utils/ConfigHelper';
import { TestLogger } from '@utils/TestLogger';

export enum AppType {
  Canvas = 'Canvas',
  ModelDriven = 'Model-driven',
  Portal = 'Portal',
}

export enum EndPointURL {
  home = '/home',
  apps = '/apps',
  solutions = '/solutions',
  connectionEndPoint = '/connections',
  tablesEndPoint = '/entities',
  appEndPoints = '/apps',
  discoverAll = '/discover',
  cards = '/cards',
  chatBot = '/bot/create',
  aiBuilderHub = '/aibuilder/hub',
  websites = '/websites',
}

/**
 * Power Apps Page Object - Main page for Power Apps portal
 * Works with Canvas Apps, Model-Driven Apps, and other Power Platform applications
 * Uses composition pattern for locators and actions
 */
export class PowerAppsPage {
  readonly page: Page;
  readonly locators: PowerAppsPageLocators;

  // Naming prefixes for apps
  private readonly canvasAppPrefix = 'TestCanvas-';
  private readonly modelAppPrefix = 'TestModel-';

  constructor(page: Page) {
    this.page = page;
    this.locators = new PowerAppsPageLocators(page);
  }

  // ============ Navigation Methods ============

  /**
   * Navigate to Power Apps home page
   * Power Apps will redirect to: /environments/{environmentId}/home
   * @param baseUrl - Optional base URL to navigate to. If not provided, uses ConfigHelper.getBaseUrl()
   */
  async navigateToHome(baseUrl?: string): Promise<void> {
    //const url = ConfigHelper.buildUrl('/home');
    const url = baseUrl || ConfigHelper.getBaseUrl();
    await navigateToUrl(this.page, url);
    await this.waitForHomePageLoad();
  }

  /**
   * Navigate to Apps page
   * First tries menu navigation, falls back to URL navigation
   * URL: /environments/{environmentId}/apps
   * @param baseUrl - Optional base URL to navigate to. If not provided, uses ConfigHelper base URL
   */
  async navigateToApps(baseUrl?: string): Promise<void> {
    await this.navigateToHome(baseUrl);

    try {
      // Try clicking the Apps menu item
      const appsMenuItem = this.page.getByRole('menuitem', { name: 'Apps, press right arrow to' });
      if (await appsMenuItem.isVisible({ timeout: TimeOut.OptionalElementTimeout })) {
        await appsMenuItem.click();
        TestLogger.debug('Navigated to Apps page using menu');
        await this.waitForAppsPageLoad();
        return;
      }
    } catch (e) {
      TestLogger.debug('Apps menu item not found, using URL navigation');
    }

    // Fallback to URL navigation
    const appsUrl = baseUrl ? `${baseUrl}/apps` : ConfigHelper.buildUrl('/apps');
    await navigateToUrl(this.page, appsUrl);
    await this.waitForAppsPageLoad();
  }

  /**
   * Navigate to Solutions page
   * First tries menu navigation, falls back to URL navigation
   * URL: /environments/{environmentId}/solutions
   * @param baseUrl - Optional base URL to navigate to. If not provided, uses ConfigHelper base URL
   */
  async navigateToSolutions(baseUrl?: string): Promise<void> {
    await this.navigateToHome(baseUrl);

    try {
      // Try clicking the Solutions menu item
      const solutionsMenuItem = this.page.getByRole('menuitem', {
        name: 'Solutions, press right arrow',
      });
      if (await solutionsMenuItem.isVisible({ timeout: TimeOut.OptionalElementTimeout })) {
        await solutionsMenuItem.click();
        TestLogger.debug('Navigated to Solutions page using menu');
        await this.waitForSolutionsPageLoad();
        return;
      }
    } catch (e) {
      TestLogger.debug('Solutions menu item not found, using URL navigation');
    }

    // Fallback to URL navigation
    const solutionsUrl = baseUrl ? `${baseUrl}/solutions` : ConfigHelper.buildUrl('/solutions');
    await navigateToUrl(this.page, solutionsUrl);
    await this.waitForSolutionsPageLoad();
  }

  // ============ Wait Methods ============

  /**
   * Wait for home page to fully load
   */
  async waitForHomePageLoad(): Promise<void> {
    // First check if we're on an error page
    await this.assertNotOnErrorPage();

    // Wait for page to be in stable state first
    await this.locators.root.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.pageHeader.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.sidebar.waitFor({ timeout: TimeOut.OneMinuteTimeOut });

    // Wait for page title (with error handling for navigation)
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const title = await this.page.title();
        if (title === 'Power Apps | Home') {
          TestLogger.debug('Home page loaded with correct title');
          break;
        }
      } catch (error) {
        // Ignore navigation errors and retry
      }
      await this.page.waitForTimeout(1000);
      retries++;
    }

    if (retries >= maxRetries) {
      try {
        const title = await this.page.title();
        TestLogger.debug(`Warning: Page title is "${title}" instead of "Power Apps | Home"`);
      } catch {
        TestLogger.debug('Warning: Could not get page title');
      }
    }

    await this.waitForMainContentAreaToLoad();
  }

  /**
   * Wait for main content area to fully load
   * Waits for key sections: header, plans, apps, and learning
   */
  async waitForMainContentAreaToLoad(): Promise<void> {
    await this.locators.homePageMainContainer.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.homePageMainContent.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.homePageContainer.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.homePageHeaderRegion.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.homePageAppsSection.waitFor({ timeout: TimeOut.OneMinuteTimeOut });

    // Plans and Learning sections are optional - don't fail if not present
    await this.locators.homePagePlansSection
      .waitFor({ timeout: TimeOut.OptionalElementTimeout })
      .catch(() => TestLogger.debug('Plans section not found'));
    await this.locators.homePageLearningSection
      .waitFor({ timeout: TimeOut.OptionalElementTimeout })
      .catch(() => TestLogger.debug('Learning section not found'));
  }

  /**
   * Check if environment error page is displayed
   * This indicates a problem with the environment configuration
   * @returns true if error page is present
   */
  async isEnvironmentErrorPage(): Promise<boolean> {
    try {
      const errorPage = await this.locators.errorPageContainer.isVisible({
        timeout: TimeOut.OptionalElementTimeout,
      });
      if (errorPage) {
        TestLogger.error('❌ Environment Error Detected!');
        TestLogger.error('Error: "Sorry, there\'s been a disconnect"');
        TestLogger.error('Message: "We can\'t find the page you\'re looking for"');
        TestLogger.error('This usually indicates:');
        TestLogger.error('  1. Invalid environment ID in URL');
        TestLogger.error('  2. User does not have access to this environment');
        TestLogger.error('  3. Environment does not exist or has been deleted');
        TestLogger.error('Current URL: ' + this.page.url());
      }
      return errorPage;
    } catch {
      return false;
    }
  }

  /**
   * Assert that we are not on an error page
   * Throws error if environment error page is detected
   */
  async assertNotOnErrorPage(): Promise<void> {
    const isError = await this.isEnvironmentErrorPage();
    if (isError) {
      throw new Error(
        'Environment error page detected. Please verify environment ID and user permissions. URL: ' +
          this.page.url()
      );
    }
  }

  /**
   * Wait for Apps page to fully load
   * Waits for all required elements on the Apps page
   */
  async waitForAppsPageLoad(): Promise<void> {
    await this.locators.root.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.pageHeader.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.sidebar.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.appsPageMainContainer.waitFor({
      state: 'attached',
      timeout: TimeOut.OneMinuteTimeOut,
    });
    await this.locators.appsPageCommandBar.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.appsPageContainer.waitFor({
      state: 'attached',
      timeout: TimeOut.OneMinuteTimeOut,
    });
    await this.locators.appListsGridContainer.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
  }

  /**
   * Wait for Solutions page to fully load
   * Waits for all required elements on the Solutions page
   */
  async waitForSolutionsPageLoad(): Promise<void> {
    await this.locators.root.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.pageHeader.waitFor({ timeout: TimeOut.OneMinuteTimeOut });

    // Try to wait for sidebar, but it may not always be present
    try {
      await this.locators.solutionsSidebar
        .first()
        .waitFor({ timeout: TimeOut.OptionalElementTimeout });
    } catch (e) {
      TestLogger.debug('Solutions sidebar not found, continuing...');
    }

    // Wait for component types list or command bar to ensure page is loaded
    const foundElement = await Promise.race([
      this.locators.solutionsComponentTypesList
        .first()
        .waitFor({ timeout: TimeOut.OneMinuteTimeOut })
        .then(() => 'list'),
      this.locators.solutionsCommandBar
        .first()
        .waitFor({ timeout: TimeOut.OneMinuteTimeOut })
        .then(() => 'command'),
    ]).catch(() => null);

    if (!foundElement) {
      TestLogger.debug('Warning: Neither component list nor command bar found on Solutions page');
    }
  }

  // ============ App Management Methods ============

  /**
   * Create a new app
   * @param appType - Type of app to create
   * @returns App name
   */
  async createApp(appType: AppType): Promise<string> {
    await this.navigateToApps();

    // Click New App button
    await this.locators.newAppButton.waitFor({ timeout: TimeOut.TwoMinutesTimeout });
    await this.locators.newAppButton.click();

    // Select app type
    switch (appType) {
      case AppType.Canvas:
        await this.locators.canvasAppButton.click();
        return await this.createCanvasApp();
      case AppType.ModelDriven:
        await this.locators.modelAppButton.click();
        return await this.createModelDrivenApp();
      case AppType.Portal:
        throw new Error('Portal app creation not implemented');
      default:
        throw new Error(`Unknown app type: ${appType}`);
    }
  }

  /**
   * Create a Canvas app
   */
  private async createCanvasApp(customName?: string): Promise<string> {
    await this.locators.modalFocusTrapZone.waitFor();

    const appName = customName || `${this.canvasAppPrefix}${randomAlphaNumeric()}`;
    const nameInput = this.page.getByTestId('canvas-app-create-text');

    await safeFill(nameInput, appName);
    await nameInput.press('Tab');

    await this.page.getByTestId('canvas-app-create-button').click();

    return appName;
  }

  /**
   * Create a Model-driven app
   */
  private async createModelDrivenApp(customName?: string): Promise<string> {
    await this.locators.modalFocusTrapZone.waitFor();

    const appName = customName || `${this.modelAppPrefix}${randomAlphaNumeric()}`;
    const nameInput = this.page.locator("[data-cy='createAppModalNameInput'][id*='TextField']");

    await safeFill(nameInput, appName);
    await nameInput.press('Tab');

    await this.page.locator("[data-cy='createAppModalCreateButton']").click();

    // Wait for app designer to load
    await this.locators.canvasAndPanes.waitFor({ timeout: TimeOut.TwoMinutesTimeout });
    await this.locators.previewPlaceholder.waitFor({ timeout: TimeOut.TwoMinutesTimeout });

    return appName;
  }

  /**
   * Search and find an app by name
   * @param appName - Name of the app
   * @param timeout - Maximum wait time
   * @returns App locator
   */
  async findApp(appName: string, timeout: number = TimeOut.OneMinuteTimeOut): Promise<Locator> {
    let appLocator = this.locators.getAppByName(appName);

    await waitForCondition(
      async () => {
        // Search for the app
        const searchBox = this.locators.searchTextBox;
        await searchBox.waitFor();
        await safeFill(searchBox, appName);
        await searchBox.press('Tab');

        // Wait for non-matching apps to be filtered out
        const anyOtherApp = this.page
          .locator('[data-automationid="DetailsRowFields"]')
          .filter({ hasNotText: appName })
          .first();

        if ((await anyOtherApp.count()) > 0) {
          await anyOtherApp
            .waitFor({ state: 'detached', timeout: TimeOut.OptionalElementTimeout })
            .catch(() => {});
        }

        // Check if app is visible
        appLocator = this.locators.getAppByName(appName);
        const count = await appLocator.count();

        if (count === 0) {
          // Refresh and try again
          await this.page.reload();
          await this.waitForAppsPageLoad();
          return false;
        }

        return count === 1;
      },
      `App "${appName}" not found`,
      timeout
    );

    // Ensure app is in view
    await appLocator.scrollIntoViewIfNeeded();
    await appLocator.focus();

    return appLocator;
  }

  /**
   * Delete an app
   * @param appType - Type of app
   * @param appName - Name of the app
   */
  async deleteApp(appType: AppType, appName: string): Promise<void> {
    await this.navigateToApps();

    const appLocator = await this.findApp(appName);
    await appLocator.click();

    await this.locators.deleteAppButton.click();

    switch (appType) {
      case AppType.Canvas:
        await this.locators.dialogAcceptButton.click();
        TestLogger.debug(`Canvas app "${appName}" deleted`);
        break;

      case AppType.ModelDriven:
        await this.page.locator('div[role="document"] button:has-text("Delete")').click();
        await this.page.locator('text=Successfully deleted model-driven app.').waitFor();
        TestLogger.debug(`Model-driven app "${appName}" deleted`);
        break;

      default:
        throw new Error(`Delete not implemented for ${appType}`);
    }
  }

  /**
   * Open a Model-driven app
   * @param appName - Name of the app
   * @returns New page with the app
   */
  async openModelDrivenApp(appName: string): Promise<Page> {
    await this.waitForAppsPageLoad();

    const appLocator = await this.findApp(appName);
    await appLocator.click();

    await this.locators.editAppButton.waitFor();

    const [appPage] = await Promise.all([
      this.page.waitForEvent('popup', { timeout: TimeOut.TwoMinutesTimeout }),
      appLocator.click(),
    ]);

    // Wait for app to load
    await appPage.locator('#ApplicationShell').waitFor({ timeout: TimeOut.FiveMinutesTimeout });
    await appPage.locator('[data-id="appBreadCrumb"]').waitFor();
    await appPage.locator('#mainContent').waitFor();

    return appPage;
  }

  /**
   * Open an app in preview mode
   * @param appName - Name of the app to preview
   * @returns New page with the app preview
   */
  async openAppInPreview(appName: string): Promise<Page> {
    await this.waitForAppsPageLoad();

    const appLocator = await this.findApp(appName);
    await appLocator.click();

    // Wait for play button
    const playButton = this.page.getByRole('button', { name: 'Play' });
    await playButton.waitFor({ timeout: TimeOut.OneMinuteTimeOut });

    const [previewPage] = await Promise.all([
      this.page.waitForEvent('popup', { timeout: TimeOut.TwoMinutesTimeout }),
      playButton.click(),
    ]);

    // Wait for preview to load
    await previewPage.waitForLoadState('networkidle', { timeout: TimeOut.TwoMinutesTimeout });

    TestLogger.debug(`App "${appName}" opened in preview`);

    return previewPage;
  }

  // ============ Solutions Methods ============

  /**
   * Find a solution by name
   * @param solutionName - Name of the solution
   * @param timeout - Maximum wait time
   * @returns Solution locator
   */
  async findSolution(
    solutionName: string,
    timeout: number = TimeOut.OneMinuteTimeOut
  ): Promise<Locator> {
    await this.locators.solutionsSearchBox.fill(solutionName);

    const solutionLocator = this.locators.getSolutionByName(solutionName);

    await waitForCondition(
      async () => (await solutionLocator.count()) > 0,
      `Solution "${solutionName}" not found`,
      timeout
    );

    await solutionLocator.last().scrollIntoViewIfNeeded();
    await solutionLocator.last().focus();

    return solutionLocator;
  }

  /**
   * Open the Default Solution
   */
  async openDefaultSolution(): Promise<void> {
    await this.navigateToSolutions();

    // Dismiss teaching bubble if present
    await dismissTeachingBubbleIfPresent(this.page);

    const defaultSolution = await this.findSolution('Default Solution', TimeOut.TwoMinutesTimeout);
    await defaultSolution.last().click();

    await this.locators.commandBar.waitFor({ timeout: TimeOut.OneMinuteTimeOut });
    await this.locators.defaultSolutionGrid.first().waitFor({ timeout: TimeOut.OneMinuteTimeOut });
  }

  // ============ Teaching Bubble Methods ============

  /**
   * Dismiss teaching bubble if present
   */
  async dismissTeachingBubble(): Promise<void> {
    await dismissTeachingBubbleIfPresent(this.page);
  }

  // ============ Authentication Methods ============

  /**
   * Sign out from Maker portal
   */
  async signOut(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: TimeOut.TwoMinutesTimeout });

    await this.locators.meInitialsButton.waitFor({ state: 'visible' });
    await this.locators.meInitialsButton.click();

    try {
      await this.page.waitForSelector('#O365_UniversalMeContainer', {
        state: 'visible',
        timeout: TimeOut.OptionalElementTimeout,
      });

      await this.page.waitForTimeout(TimeOut.OptionalElementTimeout); // Wait for animation
      await this.page.waitForSelector('.mectrl_dropdownbody.expanded', { state: 'visible' });

      await this.locators.signOutButton.waitFor({ state: 'visible' });
      await this.locators.signOutButton.click();
    } catch {
      TestLogger.debug('Using alternate sign out flow');
      await this.page.waitForSelector('#O365_HeaderRightRegion', { state: 'visible' });
      await this.locators.signOutLink.waitFor({ state: 'visible' });
      await this.locators.signOutLink.click();
    }

    await this.page.waitForLoadState('networkidle');

    // Confirm sign out
    const loggedInUserSelector = '[data-test-hometenant]';
    await this.page.waitForSelector(loggedInUserSelector, { state: 'visible' });
    await this.page.locator(loggedInUserSelector).click();

    await this.page.waitForURL(
      `${ConfigHelper.getAuthEndpoint()}/common/oauth2/v2.0/logoutsession`
    );
  }
}
