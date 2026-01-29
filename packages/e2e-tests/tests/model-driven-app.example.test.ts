/**
 * Model Driven App Example Tests
 * Demonstrates how to use the Model Driven App library
 *
 * These are example tests showing best practices for using the library.
 * Copy and adapt these patterns for your own test scenarios.
 */

import { test, expect } from '@playwright/test';
import {
  EnvironmentType,
  integrationTest,
  RunEnvironment,
  RunGeo,
  RunType,
  Severity,
} from '@paeng/playwright-solution';
import { Team } from '@paeng/playwright-teams-info';
import { ModelDrivenAppPage } from '../pages/model-driven-app.page';
import { generateUniqueAppName, waitForSpinnerToDisappear } from '../utils/app-helpers';

test.describe.serial('Model Driven App Examples', () => {
  let appName: string;

  test.beforeEach(() => {
    // Generate unique app name for each test
    appName = generateUniqueAppName('ExampleModelApp');
  });

  /**
   * Example 1: Create a blank Model Driven app
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Create blank Model Driven app',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Navigate to Power Apps home', async () => {
        await modelApp.navigateToHome();
        await expect(page).toHaveURL(/.*powerapps.com/);
      });

      await test.step('Create blank Model Driven app', async () => {
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();
      });

      await test.step('Verify App Designer loaded', async () => {
        const nameInput = page.locator('input[aria-label="App name"]');
        await expect(nameInput).toHaveValue(appName);
      });

      await test.step('Save the app', async () => {
        await modelApp.saveApp();
        await waitForSpinnerToDisappear(page);
      });

      await test.step('Cleanup: Delete the app', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );

  /**
   * Example 2: Create Model Driven app with table pages
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Create Model Driven app with table pages',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Create app', async () => {
        await modelApp.navigateToHome();
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();
      });

      await test.step('Add Account table page', async () => {
        await modelApp.addTableBasedPage(
          'Account',
          ['Main Form', 'Quick Create'],
          ['Active Accounts', 'My Active Accounts']
        );
        await modelApp.verifyPageExists('Account');
      });

      await test.step('Add Contact table page', async () => {
        await modelApp.addTableBasedPage('Contact', ['Main Form'], ['Active Contacts']);
        await modelApp.verifyPageExists('Contact');
      });

      await test.step('Save and publish', async () => {
        await modelApp.saveApp();
        await modelApp.publishApp();
        await modelApp.verifyAppPublished();
      });

      await test.step('Cleanup', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );

  /**
   * Example 3: Create Model Driven app with navigation
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Create Model Driven app with navigation',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Create app and add pages', async () => {
        await modelApp.navigateToHome();
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();

        // Add table pages
        await modelApp.addTableBasedPage('Account', ['Main Form'], ['Active Accounts']);
        await modelApp.addTableBasedPage('Contact', ['Main Form'], ['Active Contacts']);
        await modelApp.addTableBasedPage('Opportunity', ['Main Form'], ['Open Opportunities']);
      });

      await test.step('Configure navigation groups', async () => {
        // Add Sales group
        await modelApp.addNavigationGroup('Sales');
        await modelApp.addNavigationSubArea('Sales', 'Accounts', 'Account');
        await modelApp.addNavigationSubArea('Sales', 'Contacts', 'Contact');
        await modelApp.addNavigationSubArea('Sales', 'Opportunities', 'Opportunity');

        // Verify navigation
        await modelApp.verifyNavigationItemExists('Accounts');
        await modelApp.verifyNavigationItemExists('Contacts');
        await modelApp.verifyNavigationItemExists('Opportunities');
      });

      await test.step('Save and publish', async () => {
        await modelApp.saveApp();
        await modelApp.publishApp();
        await modelApp.verifyAppPublished();
      });

      await test.step('Cleanup', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );

  /**
   * Example 4: Create Model Driven app with settings
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Configure Model Driven app settings',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Create app', async () => {
        await modelApp.navigateToHome();
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();
      });

      await test.step('Configure app settings', async () => {
        // Set description
        await modelApp.setAppDescription(
          'Sales management application for tracking accounts and opportunities'
        );

        // Enable mobile
        await modelApp.enableMobile();

        // Enable offline
        await modelApp.enableOfflineMode();
      });

      await test.step('Add table and save', async () => {
        await modelApp.addTableBasedPage('Account', ['Main Form'], ['Active Accounts']);
        await modelApp.saveApp();
      });

      await test.step('Cleanup', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );

  /**
   * Example 5: Validate Model Driven app
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Validate Model Driven app configuration',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Create app with pages', async () => {
        await modelApp.navigateToHome();
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();

        // Add pages
        await modelApp.addTableBasedPage('Account', ['Main Form'], ['Active Accounts']);
        await modelApp.addNavigationGroup('Sales');
        await modelApp.addNavigationSubArea('Sales', 'Accounts', 'Account');

        await modelApp.saveApp();
      });

      await test.step('Validate app configuration', async () => {
        await modelApp.validateApp();
        await modelApp.verifyNoValidationErrors();
      });

      await test.step('Publish app', async () => {
        await modelApp.publishApp();
        await modelApp.verifyAppPublished();
      });

      await test.step('Cleanup', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );

  /**
   * Example 6: Test Model Driven app runtime
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Test Model Driven app in runtime',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Create and publish app', async () => {
        await modelApp.navigateToHome();
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();

        // Add Account page
        await modelApp.addTableBasedPage('Account', ['Main Form'], ['Active Accounts']);
        await modelApp.addNavigationGroup('Sales');
        await modelApp.addNavigationSubArea('Sales', 'Accounts', 'Account');

        // Publish
        await modelApp.saveApp();
        await modelApp.publishApp();
      });

      await test.step('Open app in runtime', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.openAppForPlay(appName);
        await modelApp.verifyRuntimeLoaded();
      });

      await test.step('Navigate and create record', async () => {
        // Navigate to Accounts
        await modelApp.navigateToRuntimeItem('Accounts');

        // Create new account
        await modelApp.createNewRecord();
        await modelApp.fillFormField('name', 'Contoso Ltd');
        await modelApp.fillFormField('telephone1', '555-0123');
        await modelApp.saveRecord();
        await modelApp.verifyRecordSaved();
      });

      await test.step('Cleanup', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );

  /**
   * Example 7: Share Model Driven app
   */
  integrationTest(
    {
      envTypes: [EnvironmentType.MakerShell],
      runTypes: [RunType.Nightly],
      runEnvironments: [[RunEnvironment.Test, Severity.S3]],
      runGeos: [RunGeo.USA],
    },
    Team.Shell,
    'Example: Share Model Driven app',
    async ({ page }) => {
      const modelApp = new ModelDrivenAppPage(page);

      await test.step('Create and save app', async () => {
        await modelApp.navigateToHome();
        await modelApp.createBlankModelDrivenApp(appName);
        await modelApp.waitForDesignerLoad();
        await modelApp.addTableBasedPage('Account', ['Main Form'], ['Active Accounts']);
        await modelApp.saveApp();
      });

      await test.step('Share app with user', async () => {
        // Note: Replace with actual test user email and role
        await modelApp.shareApp('testuser@contoso.com', 'System Administrator');
      });

      await test.step('Cleanup', async () => {
        await page.goto('');
        await modelApp.waitForHomePageLoad();
        await modelApp.deleteApp(appName);
      });
    }
  );
});
