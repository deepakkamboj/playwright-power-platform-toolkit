/**
 * Canvas App Example Tests
 * Demonstrates how to use the Canvas App library
 *
 * These are example tests showing best practices for using the library.
 * Copy and adapt these patterns for your own test scenarios.
 */

import { test, expect } from '@playwright/test';
import { CanvasAppPage } from 'playwright-power-platform-toolkit';
import { generateUniqueAppName, waitForSpinnerToDisappear } from '../utils/common';

test.describe.serial('Canvas App Examples', () => {
  let appName: string;

  test.beforeEach(() => {
    // Generate unique app name for each test
    appName = generateUniqueAppName('ExampleApp');
  });

  /**
   * Example 1: Create a blank Canvas app
   */
  test.skip('Example: Create blank Canvas app', async ({ page }) => {
    const canvasApp = new CanvasAppPage(page);

    await test.step('Navigate to Power Apps home', async () => {
      await canvasApp.navigateToHome();
      await expect(page).toHaveURL(/.*powerapps.com/);
    });

    await test.step('Create blank Canvas app', async () => {
      await canvasApp.createBlankCanvasApp(appName);
      await canvasApp.waitForStudioLoad();
    });

    await test.step('Verify Canvas Studio loaded', async () => {
      await canvasApp.verifyControlExists('Screen1'); // Default screen
    });

    await test.step('Save the app', async () => {
      await canvasApp.saveApp();
      await canvasApp.verifyAppSaved();
    });

    await test.step('Cleanup: Delete the app', async () => {
      // Navigate back to home
      await page.goto('');
      await canvasApp.waitForHomePageLoad();

      // Delete the app
      await canvasApp.deleteApp(appName);
    });
  });

  /**
   * Example 2: Create Canvas app with controls
   */
  test.skip('Example: Create Canvas app with controls', async ({ page }) => {
    const canvasApp = new CanvasAppPage(page);

    await test.step('Create app and open studio', async () => {
      await canvasApp.navigateToHome();
      await canvasApp.createBlankCanvasApp(appName);
      await canvasApp.waitForStudioLoad();
    });

    await test.step('Add button control', async () => {
      await canvasApp.addButton();
      await canvasApp.setControlText('Submit');
    });

    await test.step('Add text input control', async () => {
      await canvasApp.addTextInput();
    });

    await test.step('Add text label control', async () => {
      await canvasApp.addTextLabel();
      await canvasApp.setControlText('Enter your name:');
    });

    await test.step('Save and publish app', async () => {
      await canvasApp.saveApp();
      await canvasApp.publishApp('Added controls for user input');
      await canvasApp.verifyAppPublished();
    });

    await test.step('Cleanup', async () => {
      await page.goto('');
      await canvasApp.waitForHomePageLoad();
      await canvasApp.deleteApp(appName);
    });
  });

  /**
   * Example 3: Create Canvas app with multiple screens
   */
  test.skip('Example: Create Canvas app with multiple screens', async ({ page }) => {
    const canvasApp = new CanvasAppPage(page);

    await test.step('Create app', async () => {
      await canvasApp.navigateToHome();
      await canvasApp.createBlankCanvasApp(appName);
      await canvasApp.waitForStudioLoad();
    });

    await test.step('Add Home screen controls', async () => {
      await canvasApp.selectScreen('Screen1');
      await canvasApp.addButton();
      await canvasApp.setControlText('Next');
    });

    await test.step('Add second screen', async () => {
      await canvasApp.addScreen();
      await canvasApp.selectScreen('Screen2');
      await canvasApp.addTextLabel();
      await canvasApp.setControlText('Welcome to Screen 2');
    });

    await test.step('Add third screen', async () => {
      await canvasApp.addScreen();
      await canvasApp.selectScreen('Screen3');
      await canvasApp.addTextLabel();
      await canvasApp.setControlText('Final Screen');
    });

    await test.step('Save app', async () => {
      await canvasApp.saveApp();
      await canvasApp.verifyAppSaved();
    });

    await test.step('Cleanup', async () => {
      await page.goto('');
      await canvasApp.waitForHomePageLoad();
      await canvasApp.deleteApp(appName);
    });
  });

  /**
   * Example 4: Test Canvas app with data source
   */
  test.skip('Example: Create Canvas app with data source', async ({ page }) => {
    const canvasApp = new CanvasAppPage(page);

    await test.step('Create app', async () => {
      await canvasApp.navigateToHome();
      await canvasApp.createBlankCanvasApp(appName);
      await canvasApp.waitForStudioLoad();
    });

    await test.step('Add Accounts data source', async () => {
      await canvasApp.addDataSource('Accounts');
      await waitForSpinnerToDisappear(page);
    });

    await test.step('Add gallery with data', async () => {
      await canvasApp.addGallery();
      await canvasApp.selectControl('Gallery1');
      await canvasApp.setFormula('Items', 'Accounts');
    });

    await test.step('Save and publish', async () => {
      await canvasApp.saveApp();
      await canvasApp.publishApp('Connected to Accounts');
      await canvasApp.verifyAppPublished();
    });

    await test.step('Cleanup', async () => {
      await page.goto('');
      await canvasApp.waitForHomePageLoad();
      await canvasApp.deleteApp(appName);
    });
  });

  /**
   * Example 5: Test Canvas app sharing
   */
  test.skip('Example: Share Canvas app', async ({ page }) => {
    const canvasApp = new CanvasAppPage(page);

    await test.step('Create and save app', async () => {
      await canvasApp.navigateToHome();
      await canvasApp.createBlankCanvasApp(appName);
      await canvasApp.waitForStudioLoad();
      await canvasApp.saveApp();
    });

    await test.step('Share app with user', async () => {
      // Note: Replace with actual test user email
      await canvasApp.shareApp('testuser@contoso.com', 'CanView');
    });

    await test.step('Cleanup', async () => {
      await page.goto('');
      await canvasApp.waitForHomePageLoad();
      await canvasApp.deleteApp(appName);
    });
  });

  /**
   * Example 6: Test Canvas app play mode
   */
  test.skip('Example: Test Canvas app in play mode', async ({ page }) => {
    const canvasApp = new CanvasAppPage(page);

    await test.step('Create app with button', async () => {
      await canvasApp.navigateToHome();
      await canvasApp.createBlankCanvasApp(appName);
      await canvasApp.waitForStudioLoad();

      // Add button
      await canvasApp.addButton();
      await canvasApp.setControlText('Click Me');

      // Save
      await canvasApp.saveApp();
    });

    await test.step('Test app in play mode', async () => {
      await canvasApp.playApp();

      // In play mode, interact with the app
      // (Note: Actual interactions would depend on app functionality)

      await canvasApp.stopPlayingApp();
    });

    await test.step('Cleanup', async () => {
      await page.goto('');
      await canvasApp.waitForHomePageLoad();
      await canvasApp.deleteApp(appName);
    });
  });
});
