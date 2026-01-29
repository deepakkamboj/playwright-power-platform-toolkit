/**
 * Model Driven App Page Object Model
 * Provides methods for creating, editing, and testing Model Driven Apps
 */

import { Page, expect } from '@playwright/test';
import { ModelDrivenAppLocators } from '../locators/model-driven-app.locators';

export class ModelDrivenAppPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ========================================
  // Navigation Methods
  // ========================================

  /**
   * Navigate to Power Apps home page
   */
  async navigateToHome(): Promise<void> {
    await this.page.goto('');
    await this.waitForHomePageLoad();
  }

  /**
   * Wait for home page to load
   */
  async waitForHomePageLoad(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Home.AppsGrid).waitFor({
      state: 'visible',
      timeout: 60000,
    });
  }

  /**
   * Wait for App Designer to load
   */
  async waitForDesignerLoad(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.PagesList).waitFor({
      state: 'visible',
      timeout: 90000,
    });
  }

  /**
   * Wait for loading spinner to disappear
   */
  async waitForLoadingComplete(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Common.LoadingSpinner).waitFor({
      state: 'hidden',
      timeout: 60000,
    });
  }

  /**
   * Wait for app runtime to load
   */
  async waitForRuntimeLoad(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Runtime.SiteMap.NavigationPane).waitFor({
      state: 'visible',
      timeout: 60000,
    });
  }

  // ========================================
  // App Creation Methods
  // ========================================

  /**
   * Create a blank Model Driven app
   * @param appName - Name for the app
   */
  async createBlankModelDrivenApp(appName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Home.CreateButton).click();
    await this.page.locator(ModelDrivenAppLocators.Home.BlankAppOption).click();
    await this.waitForDesignerLoad();
    await this.setAppName(appName);
  }

  /**
   * Create Model Driven app from solution
   * @param solutionName - Name of the solution
   * @param appName - Name for the app
   */
  async createFromSolution(solutionName: string, appName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Home.CreateButton).click();
    await this.page.locator(ModelDrivenAppLocators.Home.FromSolutionOption).click();
    // Solution selection logic
    await this.waitForDesignerLoad();
    await this.setAppName(appName);
  }

  /**
   * Filter apps by Model Driven type
   */
  async filterByModelDrivenApps(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Home.AppTypeFilter).selectOption('ModelDriven');
    await this.waitForLoadingComplete();
  }

  // ========================================
  // App Management Methods
  // ========================================

  /**
   * Set app name
   * @param appName - Name for the app
   */
  async setAppName(appName: string): Promise<void> {
    const nameInput = this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.AppNameInput);
    await nameInput.click();
    await nameInput.fill(appName);
    await nameInput.press('Enter');
  }

  /**
   * Save the Model Driven app
   */
  async saveApp(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.SaveButton).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Publish the Model Driven app
   */
  async publishApp(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.PublishButton).click();
    await this.page
      .locator(ModelDrivenAppLocators.PublishDialog.Dialog)
      .waitFor({ state: 'visible' });
    await this.page.locator(ModelDrivenAppLocators.PublishDialog.PublishButton).click();
    await this.waitForPublishComplete();
  }

  /**
   * Wait for publish operation to complete
   */
  async waitForPublishComplete(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.PublishDialog.SuccessMessage).waitFor({
      state: 'visible',
      timeout: 90000,
    });
  }

  /**
   * Play/Open the app in runtime
   */
  async playApp(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.PlayButton).click();
    // Wait for new tab/window to open with the app
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.PlayButton).click(),
    ]);
    await newPage.waitForLoadState();
    return newPage as any;
  }

  /**
   * Validate the app
   */
  async validateApp(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.ValidateButton).click();
    await this.page.locator(ModelDrivenAppLocators.Validation.ValidationPanel).waitFor({
      state: 'visible',
    });
  }

  // ========================================
  // Page Management Methods
  // ========================================

  /**
   * Add a table-based page
   * @param tableName - Name of the table
   * @param forms - Array of form names to include
   * @param views - Array of view names to include
   */
  async addTableBasedPage(
    tableName: string,
    forms: string[] = [],
    views: string[] = []
  ): Promise<void> {
    // Open Pages panel
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.PagesTab).click();

    // Click Add page
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.AddPageButton).click();

    // Select table-based page
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.TableBasedPage).click();

    // Wait for dialog
    await this.page
      .locator(ModelDrivenAppLocators.AddPageDialog.Dialog)
      .waitFor({ state: 'visible' });

    // Select table
    await this.page
      .locator(ModelDrivenAppLocators.AddPageDialog.SelectTableDropdown)
      .selectOption(tableName);

    // Select forms
    for (const formName of forms) {
      await this.page.locator(ModelDrivenAppLocators.AddPageDialog.FormItem(formName)).click();
    }

    // Select views
    for (const viewName of views) {
      await this.page.locator(ModelDrivenAppLocators.AddPageDialog.ViewItem(viewName)).click();
    }

    // Add
    await this.page.locator(ModelDrivenAppLocators.AddPageDialog.AddButton).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Add a dashboard page
   */
  async addDashboardPage(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.PagesTab).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.AddPageButton).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.DashboardPage).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Add a custom page
   */
  async addCustomPage(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.PagesTab).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.AddPageButton).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.CustomPage).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Delete a page
   * @param pageName - Name of the page to delete
   */
  async deletePage(pageName: string): Promise<void> {
    const pageItem = this.page.locator(ModelDrivenAppLocators.Designer.Pages.PageItem(pageName));
    await pageItem.hover();
    await pageItem.locator(ModelDrivenAppLocators.Designer.Pages.PageMenu).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Pages.DeletePage).click();
  }

  // ========================================
  // Navigation Designer Methods
  // ========================================

  /**
   * Add navigation group
   * @param groupName - Name for the group
   */
  async addNavigationGroup(groupName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.NavigationTab).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Navigation.AddGroupButton).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Navigation.TitleInput).fill(groupName);
    await this.page.locator(ModelDrivenAppLocators.Designer.Navigation.TitleInput).press('Enter');
  }

  /**
   * Add navigation subarea
   * @param groupName - Parent group name
   * @param subAreaTitle - Title for the subarea
   * @param tableName - Optional table to link to
   */
  async addNavigationSubArea(
    groupName: string,
    subAreaTitle: string,
    tableName?: string
  ): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.NavigationTab).click();

    // Select group
    await this.page
      .locator(ModelDrivenAppLocators.Designer.Navigation.GroupItem(groupName))
      .click();

    // Add subarea
    await this.page.locator(ModelDrivenAppLocators.Designer.Navigation.AddSubAreaButton).click();

    // Set title
    await this.page
      .locator(ModelDrivenAppLocators.Designer.Navigation.TitleInput)
      .fill(subAreaTitle);

    // Link to table if provided
    if (tableName) {
      await this.page.locator(ModelDrivenAppLocators.Designer.Navigation.TablePicker).click();
      await this.page.locator(`option:has-text("${tableName}")`).click();
    }
  }

  // ========================================
  // Data Management Methods
  // ========================================

  /**
   * Add table to the app
   * @param tableName - Name of the table
   */
  async addTable(tableName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.DataTab).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Data.AddTableButton).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Data.SearchTable).fill(tableName);
    await this.page.locator(ModelDrivenAppLocators.Designer.Data.TableItem(tableName)).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Create a new table
   * @param displayName - Display name for the table
   * @param pluralName - Plural name for the table
   */
  async createNewTable(displayName: string, pluralName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.DataTab).click();
    await this.page.locator(ModelDrivenAppLocators.Designer.Data.AddTableButton).click();

    // Assume there's a "Create new table" option
    await this.page
      .locator(ModelDrivenAppLocators.CreateTableDialog.Dialog)
      .waitFor({ state: 'visible' });
    await this.page
      .locator(ModelDrivenAppLocators.CreateTableDialog.DisplayNameInput)
      .fill(displayName);
    await this.page
      .locator(ModelDrivenAppLocators.CreateTableDialog.PluralNameInput)
      .fill(pluralName);
    await this.page.locator(ModelDrivenAppLocators.CreateTableDialog.CreateButton).click();
    await this.waitForLoadingComplete();
  }

  // ========================================
  // Settings Methods
  // ========================================

  /**
   * Open app settings
   */
  async openSettings(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.SettingsButton).click();
    await this.page.locator(ModelDrivenAppLocators.Settings.Dialog).waitFor({ state: 'visible' });
  }

  /**
   * Set app description
   * @param description - Description for the app
   */
  async setAppDescription(description: string): Promise<void> {
    await this.openSettings();
    await this.page.locator(ModelDrivenAppLocators.Settings.DescriptionInput).fill(description);
    await this.page.locator(ModelDrivenAppLocators.Settings.SaveButton).click();
  }

  /**
   * Enable mobile for the app
   */
  async enableMobile(): Promise<void> {
    await this.openSettings();
    await this.page.locator(ModelDrivenAppLocators.Settings.FeaturesTab).click();
    await this.page.locator(ModelDrivenAppLocators.Settings.EnableMobileToggle).check();
    await this.page.locator(ModelDrivenAppLocators.Settings.SaveButton).click();
  }

  /**
   * Enable offline mode
   */
  async enableOfflineMode(): Promise<void> {
    await this.openSettings();
    await this.page.locator(ModelDrivenAppLocators.Settings.FeaturesTab).click();
    await this.page.locator(ModelDrivenAppLocators.Settings.EnableOfflineToggle).check();
    await this.page.locator(ModelDrivenAppLocators.Settings.SaveButton).click();
  }

  // ========================================
  // Runtime/Play Mode Methods
  // ========================================

  /**
   * Navigate to a navigation item in runtime
   * @param itemName - Name of the navigation item
   */
  async navigateToRuntimeItem(itemName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Runtime.SiteMap.SubArea(itemName)).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Expand navigation group in runtime
   * @param groupName - Name of the group
   */
  async expandNavigationGroup(groupName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Runtime.SiteMap.GroupHeader(groupName)).click();
  }

  /**
   * Create new record in runtime
   */
  async createNewRecord(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Runtime.Commands.NewButton).click();
    await this.page
      .locator(ModelDrivenAppLocators.Runtime.Content.Form)
      .waitFor({ state: 'visible' });
  }

  /**
   * Save record in runtime
   */
  async saveRecord(): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Runtime.Commands.SaveButton).click();
    await this.waitForLoadingComplete();
  }

  /**
   * Fill form field in runtime
   * @param fieldName - Name of the field
   * @param value - Value to fill
   */
  async fillFormField(fieldName: string, value: string): Promise<void> {
    const fieldLocator = this.page.locator(
      ModelDrivenAppLocators.Runtime.Content.FormField(fieldName)
    );
    await fieldLocator.fill(value);
  }

  /**
   * Click command bar button in runtime
   * @param buttonLabel - Label of the button
   */
  async clickCommandButton(buttonLabel: string): Promise<void> {
    await this.page.locator(`button[aria-label="${buttonLabel}"]`).click();
  }

  /**
   * Switch form tab in runtime
   * @param tabName - Name of the tab
   */
  async switchFormTab(tabName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Runtime.Content.FormTab(tabName)).click();
  }

  // ========================================
  // Share Methods
  // ========================================

  /**
   * Share app with a user
   * @param userEmail - Email of the user
   * @param securityRole - Security role to assign
   */
  async shareApp(userEmail: string, securityRole: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.CommandBar.ShareButton).click();
    await this.page
      .locator(ModelDrivenAppLocators.ShareDialog.Dialog)
      .waitFor({ state: 'visible' });

    // Search for user
    await this.page.locator(ModelDrivenAppLocators.ShareDialog.SearchUsers).fill(userEmail);
    await this.page.keyboard.press('Enter');

    // Select security role
    await this.page
      .locator(ModelDrivenAppLocators.ShareDialog.SecurityRoleDropdown)
      .selectOption(securityRole);

    // Share
    await this.page.locator(ModelDrivenAppLocators.ShareDialog.ShareButton).click();
  }

  // ========================================
  // App Search and Selection Methods
  // ========================================

  /**
   * Search for an app by name
   * @param appName - Name of the app
   */
  async searchApp(appName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Home.SearchBox).fill(appName);
    await this.page.keyboard.press('Enter');
    await this.waitForLoadingComplete();
  }

  /**
   * Open an existing app for editing
   * @param appName - Name of the app
   */
  async openAppForEdit(appName: string): Promise<void> {
    await this.filterByModelDrivenApps();
    await this.searchApp(appName);
    const appCard = this.page.locator(ModelDrivenAppLocators.Home.AppCard(appName));
    await appCard.hover();
    await appCard.locator(ModelDrivenAppLocators.Details.EditButton).click();
    await this.waitForDesignerLoad();
  }

  /**
   * Open an existing app in play mode
   * @param appName - Name of the app
   */
  async openAppForPlay(appName: string): Promise<void> {
    await this.filterByModelDrivenApps();
    await this.searchApp(appName);
    await this.page.locator(ModelDrivenAppLocators.Home.AppCard(appName)).click();
    await this.waitForRuntimeLoad();
  }

  /**
   * Delete an app
   * @param appName - Name of the app to delete
   */
  async deleteApp(appName: string): Promise<void> {
    await this.searchApp(appName);
    const appCard = this.page.locator(ModelDrivenAppLocators.Home.AppCard(appName));
    await appCard.hover();
    await appCard.locator(ModelDrivenAppLocators.Details.MoreButton).click();
    await this.page.locator(ModelDrivenAppLocators.Details.DeleteButton).click();
    await this.page
      .locator(ModelDrivenAppLocators.DeleteDialog.Dialog)
      .waitFor({ state: 'visible' });
    await this.page.locator(ModelDrivenAppLocators.DeleteDialog.DeleteButton).click();
  }

  // ========================================
  // Verification Methods
  // ========================================

  /**
   * Verify app exists in the list
   * @param appName - Name of the app
   */
  async verifyAppExists(appName: string): Promise<void> {
    await this.searchApp(appName);
    await expect(this.page.locator(ModelDrivenAppLocators.Home.AppCard(appName))).toBeVisible();
  }

  /**
   * Verify app is published
   */
  async verifyAppPublished(): Promise<void> {
    await expect(
      this.page.locator(ModelDrivenAppLocators.PublishDialog.SuccessMessage)
    ).toBeVisible();
  }

  /**
   * Verify page exists in designer
   * @param pageName - Name of the page
   */
  async verifyPageExists(pageName: string): Promise<void> {
    await expect(
      this.page.locator(ModelDrivenAppLocators.Designer.Pages.PageItem(pageName))
    ).toBeVisible();
  }

  /**
   * Verify navigation item exists
   * @param itemName - Name of the navigation item
   */
  async verifyNavigationItemExists(itemName: string): Promise<void> {
    await expect(
      this.page.locator(ModelDrivenAppLocators.Designer.Navigation.SubAreaItem(itemName))
    ).toBeVisible();
  }

  /**
   * Verify table is added to app
   * @param tableName - Name of the table
   */
  async verifyTableAdded(tableName: string): Promise<void> {
    await this.page.locator(ModelDrivenAppLocators.Designer.LeftNav.DataTab).click();
    await expect(
      this.page.locator(ModelDrivenAppLocators.Designer.Data.TableItem(tableName))
    ).toBeVisible();
  }

  /**
   * Verify validation has no errors
   */
  async verifyNoValidationErrors(): Promise<void> {
    await this.validateApp();
    await expect(this.page.locator(ModelDrivenAppLocators.Validation.ErrorItem)).toHaveCount(0);
  }

  /**
   * Verify runtime loaded successfully
   */
  async verifyRuntimeLoaded(): Promise<void> {
    await expect(
      this.page.locator(ModelDrivenAppLocators.Runtime.SiteMap.NavigationPane)
    ).toBeVisible();
    await expect(
      this.page.locator(ModelDrivenAppLocators.Runtime.Content.MainContent)
    ).toBeVisible();
  }

  /**
   * Verify record saved in runtime
   */
  async verifyRecordSaved(): Promise<void> {
    await expect(
      this.page.locator(ModelDrivenAppLocators.Common.SuccessNotification)
    ).toBeVisible();
  }
}
