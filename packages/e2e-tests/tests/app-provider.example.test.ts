/**
 * App Provider Example Tests
 * Demonstrates how customers can use the AppProvider to launch and test their apps
 * Original Prompt: Create examples showing provider pattern usage for app testing
 * #PlaywrightMCP - Generated using Playwright MCP Server
 */

import { test, expect } from '@playwright/test';
import {
  AppProvider,
  AppType,
  AppLaunchMode,
  CanvasControlType,
  PowerAppsPage,
} from 'playwright-power-platform-toolkit';
import { getBaseUrl, getCanvasAppId, getModelAppId } from './test-constants';

/**
 * Example 1: Launch Canvas App by ID
 * This is the fastest and most common approach
 */
test('Launch Canvas app by ID and test form submission', async ({ page }) => {
  const provider = new AppProvider(page);

  await test.step('Launch Canvas app', async () => {
    await provider.launch({
      app: { id: getCanvasAppId() || '' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    // Verify app launched successfully
    expect(provider.isReady()).toBeTruthy();
    expect(provider.getCurrentAppType()).toBe(AppType.Canvas);
  });

  await test.step('Fill form and submit', async () => {
    // Fill individual fields
    await provider.fill({ name: 'NameInput', type: CanvasControlType.TextInput }, 'John Doe');
    await provider.fill(
      { name: 'EmailInput', type: CanvasControlType.TextInput },
      'john.doe@example.com'
    );

    // Or fill entire form at once
    await provider.fillForm({
      DepartmentInput: 'Engineering',
      PhoneInput: '555-0123',
    });

    // Submit form
    await provider.click({
      name: 'SubmitButton',
      type: CanvasControlType.Button,
    });
  });

  await test.step('Verify submission', async () => {
    await provider.assertVisible({
      name: 'SuccessMessage',
    });
    await provider.assertText(
      {
        name: 'StatusLabel',
      },
      'Submitted Successfully'
    );
  });

  await test.step('Clean up', async () => {
    await provider.close();
  });
});

/**
 * Example 2: Launch Model Driven App by ID
 * Shows how to test Model Driven apps
 */
test('Launch Model Driven app by ID and create record', async ({ page }) => {
  const provider = new AppProvider(page);

  await test.step('Launch Model Driven app', async () => {
    await provider.launch({
      app: { id: getModelAppId() || '' },
      type: AppType.ModelDriven,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    expect(provider.isReady()).toBeTruthy();
  });

  await test.step('Navigate and create new contact', async () => {
    // Click on Contacts in navigation
    await provider.click({
      name: 'Contacts',
    });

    // Click New button
    await provider.click({
      name: 'New',
    });

    // Fill contact form
    await provider.fillForm({
      firstname: 'Jane',
      lastname: 'Smith',
      emailaddress1: 'jane.smith@example.com',
      telephone1: '555-0456',
    });

    // Save contact
    await provider.click({
      name: 'Save',
    });
  });

  await test.step('Verify contact created', async () => {
    await provider.assertVisible({
      name: 'Jane Smith',
    });
  });

  await provider.close();
});

/**
 * Example 3: Launch App by Name
 * Shows how to launch app by name (requires navigation to apps page first)
 */
test('Launch Canvas app by name', async ({ page }) => {
  const powerApps = new PowerAppsPage(page);

  await test.step('Navigate to apps page', async () => {
    await powerApps.navigateToApps();
  });

  const provider = new AppProvider(page, powerApps.findApp.bind(powerApps));

  await test.step('Launch app by name', async () => {
    await provider.launch({
      app: { name: 'My Test Canvas App' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
    });

    expect(provider.isReady()).toBeTruthy();
  });

  await test.step('Test app functionality', async () => {
    await provider.click({ name: 'TestButton' });
    await provider.assertVisible({ name: 'ResultLabel' });
  });

  await provider.close();
});

/**
 * Example 4: Test Multiple Apps in Sequence
 * Shows how to test multiple apps in one test
 */
test('Test multiple apps in sequence', async ({ page }) => {
  const provider = new AppProvider(page);
  const testedApps: string[] = [];

  await test.step('Test Canvas app', async () => {
    await provider.launch({
      app: { id: getCanvasAppId() || '' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    await provider.click({ name: 'Button1' });
    await provider.assertVisible({ name: 'Label1' });

    testedApps.push(`Canvas App: ${provider.getCurrentAppId()}`);
    await provider.close();
  });

  await test.step('Test Model Driven app', async () => {
    await provider.launch({
      app: { id: getModelAppId() || '' },
      type: AppType.ModelDriven,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    await provider.click({ name: 'Accounts' });
    await provider.assertVisible({ name: 'Active Accounts' });

    testedApps.push(`Model App: ${provider.getCurrentAppId()}`);
    await provider.close();
  });

  await test.step('Verify all apps tested', async () => {
    const launchedApps = provider.getLaunchedApps();
    expect(launchedApps.length).toBe(2);
    console.log('Tested apps:', testedApps);
  });
});

/**
 * Example 5: Test with Custom Options
 * Shows how to use custom launch options
 */
test('Launch app with custom options', async ({ page }) => {
  const provider = new AppProvider(page);

  await test.step('Launch with custom timeout', async () => {
    await provider.launch({
      app: { id: getCanvasAppId() || '' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Edit,
      baseUrl: getBaseUrl(),
      options: {
        timeout: 60000,
        waitForReady: true,
      },
    });

    expect(provider.isReady()).toBeTruthy();
  });

  await test.step('Test app in edit mode', async () => {
    // Edit mode specific testing
    await provider.assertVisible({ name: 'PropertyPane' });
    await provider.assertVisible({ name: 'TreeView' });
  });

  await provider.close();
});

/**
 * Example 6: Error Handling
 * Shows how to handle errors gracefully
 */
test('Handle app launch errors', async ({ page }) => {
  const provider = new AppProvider(page);

  await test.step('Attempt to launch non-existent app', async () => {
    try {
      await provider.launch({
        app: { id: 'non-existent-app-id' },
        type: AppType.Canvas,
        mode: AppLaunchMode.Play,
        baseUrl: getBaseUrl(),
      });
    } catch (error) {
      console.log('Expected error caught:', error);
      expect(error).toBeDefined();
    }

    // Verify app not ready
    expect(provider.isReady()).toBeFalsy();
  });
});

/**
 * Example 7: Using Simple String Syntax
 * Shows convenient string syntax for app names
 */
test('Launch app using simple string syntax', async ({ page }) => {
  const powerApps = new PowerAppsPage(page);
  await powerApps.navigateToApps();

  const provider = new AppProvider(page, powerApps.findApp.bind(powerApps));

  await test.step('Launch using string', async () => {
    // Simple string is treated as app name
    await provider.launch({
      app: 'My Sales App',
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
    });

    expect(provider.isReady()).toBeTruthy();
  });

  await provider.close();
});

/**
 * Example 8: Integration with PowerAppsPage
 * Shows how to combine provider with PowerAppsPage for complete workflows
 */
test('Complete workflow: Create, launch, and test app', async ({ page }) => {
  const powerApps = new PowerAppsPage(page);

  await test.step('Navigate to home', async () => {
    await powerApps.navigateToHome();
  });

  await test.step('Create Canvas app', async () => {
    await powerApps.navigateToApps();
    await powerApps.createApp(AppType.Canvas, 'Test App ' + Date.now());
  });

  const provider = new AppProvider(page, powerApps.findApp.bind(powerApps));

  await test.step('Launch created app', async () => {
    await powerApps.navigateToApps();
    await provider.launch({
      app: 'Test App',
      type: AppType.Canvas,
      mode: AppLaunchMode.Edit,
    });
  });

  await test.step('Configure app', async () => {
    // Use composed canvas property for studio operations
    await powerApps.canvas.addButton();
    await powerApps.canvas.setButtonText('Button1', 'Click Me');
    await powerApps.canvas.saveApp();
  });

  await provider.close();
});

/**
 * Example 9: Provider State Management
 * Shows how to use provider state and metadata
 */
test('Use provider state management', async ({ page }) => {
  const provider = new AppProvider(page);

  await test.step('Launch and track app', async () => {
    await provider.launch({
      app: { id: 'app-1' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    // Get current state
    console.log('Current app type:', provider.getCurrentAppType());
    console.log('Current app ID:', provider.getCurrentAppId());
    console.log('Current app URL:', provider.getCurrentAppUrl());
    console.log('Is ready:', provider.isReady());
  });

  await test.step('View launched apps history', async () => {
    const history = provider.getLaunchedApps();
    expect(history.length).toBeGreaterThan(0);

    history.forEach((app: any) => {
      console.log(`App: ${app.name} (${app.type})`);
      console.log(`  ID: ${app.id}`);
      console.log(`  URL: ${app.url}`);
      console.log(`  Launched at: ${app.launchedAt}`);
      console.log(`  Ready: ${app.isReady}`);
    });
  });

  await provider.close();
});

/**
 * Example 10: Best Practice - Clean Setup and Teardown
 * Shows recommended test structure with proper cleanup
 */
test.describe('Best Practice Test Structure', () => {
  let provider: AppProvider;

  test.beforeEach(async ({ page }) => {
    provider = new AppProvider(page);
  });

  test.afterEach(async () => {
    await provider.close();
    provider.reset();
  });

  test('Test with proper setup and teardown', async () => {
    await provider.launch({
      app: { id: getCanvasAppId() || '' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    await provider.click({ name: 'TestButton' });
    await provider.assertVisible({ name: 'Result' });

    // Cleanup happens automatically in afterEach
  });
});

/**
 * Example 11: Combining AppProvider with API Testing
 * Shows how to use AppProvider with ApiTestHelper for comprehensive testing
 */
test('Launch app and verify backend API integration', async ({ page }) => {
  const provider = new AppProvider(page);
  const { ApiTestHelper } = await import('playwright-power-platform-toolkit');

  await test.step('Launch Canvas app', async () => {
    await provider.launch({
      app: { id: getCanvasAppId() || '' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    expect(provider.isReady()).toBeTruthy();
  });

  await test.step('Interact with app UI', async () => {
    await provider.click({ name: 'LoadDataButton', type: CanvasControlType.Button });
    await provider.assertVisible({ name: 'DataLoadedLabel' });
  });

  await test.step('Verify API was called correctly', async () => {
    // Create API helper with authenticated context
    const apiHelper = new ApiTestHelper(page.request);
    const token = await apiHelper.getAuthToken(page);

    // Make direct API call to verify data
    const response = await apiHelper.makeAuthenticatedRequest(token, {
      url: `${process.env.BASE_URL}/api/data/v9.2/accounts?$top=1`,
      method: 'GET',
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.value).toBeDefined();
  });

  await provider.close();
});

/**
 * Example 12: Recording API Calls During App Testing
 * Shows how to use ApiRecorder with AppProvider to capture all API traffic
 */
test('Launch app and record all API calls', async ({ page }) => {
  const provider = new AppProvider(page);
  const { ApiRecorder } = await import('playwright-power-platform-toolkit');

  const recorder = new ApiRecorder(page, {
    urlPatterns: ['**/api/**'],
  });

  await test.step('Start recording before launch', async () => {
    await recorder.startRecording();
  });

  await test.step('Launch and use app', async () => {
    await provider.launch({
      app: { id: getCanvasAppId() || '' },
      type: AppType.Canvas,
      mode: AppLaunchMode.Play,
      baseUrl: getBaseUrl(),
    });

    await provider.click({ name: 'Button1' });
    await provider.fill({ name: 'TextInput1', type: CanvasControlType.TextInput }, 'Test Data');
    await provider.click({ name: 'SubmitButton', type: CanvasControlType.Button });

    await page.waitForTimeout(2000); // Allow API calls to complete
  });

  await test.step('Stop recording and analyze', async () => {
    await recorder.stopRecording();

    const recordings = recorder.getRecordings();
    const stats = recorder.getStatistics();

    console.log(`Recorded ${recordings.length} API calls`);
    console.log(`Success Rate: ${stats.successRate.toFixed(2)}%`);
    console.log(`Average Duration: ${stats.averageDuration.toFixed(2)}ms`);

    // Verify critical API calls were made
    const dataApiCalls = recordings.filter((r) => r.url.includes('/api/data/'));
    expect(dataApiCalls.length).toBeGreaterThan(0);

    // Save recordings for later analysis
    const path = await import('path');
    const outputFile = path.join(__dirname, '../test-results/app-launch-apis.json');
    await recorder.saveToFile(outputFile);
  });

  await provider.close();
});
