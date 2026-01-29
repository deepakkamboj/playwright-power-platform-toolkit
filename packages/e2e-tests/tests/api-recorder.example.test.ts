/**
 * API Recorder Example Tests
 * Demonstrates how to use the ApiRecorder to record and analyze API calls
 * #PlaywrightMCP - Generated using Playwright MCP Server
 */

import { test, expect } from '../fixtures/test-fixtures';
import { ApiRecorder, PowerAppsPage } from 'playwright-power-platform-toolkit';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Example 1: Basic API Recording
 * Shows how to start recording, perform actions, and stop recording
 */
test('Record API calls during app launch', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page);

  await test.step('Start recording', async () => {
    await recorder.startRecording();
    expect(recorder.isRecording()).toBeTruthy();
  });

  await test.step('Navigate to Power Apps', async () => {
    await powerAppsPage.navigateToHome();
    await page.waitForTimeout(2000); // Allow time for API calls
  });

  await test.step('Stop recording and verify', async () => {
    await recorder.stopRecording();
    expect(recorder.isRecording()).toBeFalsy();

    const recordings = recorder.getRecordings();
    expect(recordings.length).toBeGreaterThan(0);
    console.log(`Recorded ${recordings.length} API calls`);
  });
});

/**
 * Example 2: Recording with URL Filtering
 * Shows how to filter recordings by URL patterns
 */
test('Record only specific API endpoints', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page, {
    urlPatterns: ['**/api/invoke**', '**/api/data/**'],
  });

  await recorder.startRecording();

  await test.step('Perform actions', async () => {
    await powerAppsPage.navigateToApps();
    await page.waitForTimeout(2000);
  });

  await recorder.stopRecording();

  const recordings = recorder.getRecordings();
  console.log(`Recorded ${recordings.length} filtered API calls`);

  // Verify all recordings match filter
  recordings.forEach((rec) => {
    const matchesPattern = rec.url.includes('/api/invoke') || rec.url.includes('/api/data/');
    expect(matchesPattern).toBeTruthy();
  });
});

/**
 * Example 3: Recording Statistics
 * Shows how to get detailed statistics about recorded API calls
 */
test('Analyze API call statistics', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page);

  await recorder.startRecording();

  await test.step('Perform multiple actions', async () => {
    await powerAppsPage.navigateToHome();
    await powerAppsPage.navigateToApps();
    await page.waitForTimeout(3000);
  });

  await recorder.stopRecording();

  await test.step('Get statistics', async () => {
    const stats = recorder.getStatistics();

    console.log('API Recording Statistics:');
    console.log(`  Total Calls: ${stats.totalCalls}`);
    console.log(`  Success Rate: ${stats.successRate.toFixed(2)}%`);
    console.log(`  Average Duration: ${stats.averageDuration.toFixed(2)}ms`);
    console.log(`  Total Duration: ${stats.totalDuration}ms`);

    expect(stats.totalCalls).toBeGreaterThan(0);
    expect(stats.successRate).toBeGreaterThanOrEqual(0);
    expect(stats.successRate).toBeLessThanOrEqual(100);
  });

  await test.step('Verify method breakdown', async () => {
    const stats = recorder.getStatistics();

    console.log('Method Breakdown:');
    Object.entries(stats.byMethod).forEach(([method, count]) => {
      console.log(`  ${method}: ${count} calls`);
    });

    expect(stats.byMethod.GET).toBeGreaterThan(0);
  });

  await test.step('Verify status breakdown', async () => {
    const stats = recorder.getStatistics();

    console.log('Status Code Breakdown:');
    Object.entries(stats.byStatus).forEach(([status, count]) => {
      console.log(`  ${status}: ${count} responses`);
    });

    expect(stats.byStatus['200']).toBeGreaterThan(0);
  });
});

/**
 * Example 4: Save Recordings to File
 * Shows how to save recorded API calls to JSON file
 */
test('Save API recordings to file', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page);
  const outputDir = path.join(__dirname, '../test-results/recordings');
  const outputFile = path.join(outputDir, 'api-calls.json');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await recorder.startRecording();

  await test.step('Record actions', async () => {
    await powerAppsPage.navigateToHome();
    await page.waitForTimeout(2000);
  });

  await recorder.stopRecording();

  await test.step('Save to file', async () => {
    const savedPath = await recorder.saveToFile(outputFile);
    expect(fs.existsSync(savedPath)).toBeTruthy();

    const content = fs.readFileSync(savedPath, 'utf-8');
    const data = JSON.parse(content);

    expect(data.recordings).toBeDefined();
    expect(data.recordings.length).toBeGreaterThan(0);
    expect(data.metadata).toBeDefined();
    expect(data.statistics).toBeDefined();

    console.log(`Recordings saved to: ${savedPath}`);
  });
});

/**
 * Example 5: Generate Test Code
 * Shows how to generate Playwright test code from recordings
 */
test('Generate test code from recordings', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page, {
    urlPatterns: ['**/api/invoke**'],
  });
  const outputDir = path.join(__dirname, '../test-results/recordings');
  const testFile = path.join(outputDir, 'generated-test.ts');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await recorder.startRecording();

  await test.step('Record API calls', async () => {
    await powerAppsPage.navigateToApps();
    await page.waitForTimeout(2000);
  });

  await recorder.stopRecording();

  await test.step('Generate test code', async () => {
    const savedPath = await recorder.saveTestCode(testFile, {
      testName: 'Generated API Test',
      includeHeaders: true,
      includeBody: true,
    });

    expect(fs.existsSync(savedPath)).toBeTruthy();

    const testCode = fs.readFileSync(savedPath, 'utf-8');
    expect(testCode).toContain('import { test, expect }');
    expect(testCode).toContain("test('Generated API Test'");
    expect(testCode).toContain('await request.');

    console.log(`Test code generated at: ${savedPath}`);
    console.log('\nGenerated code preview:');
    console.log(testCode.substring(0, 500));
  });
});

/**
 * Example 6: Recording with Response Body Filtering
 * Shows how to filter large response bodies
 */
test('Record with response size limits', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page, {
    maxResponseSize: 10 * 1024, // 10KB limit
  });

  await recorder.startRecording();

  await test.step('Perform actions', async () => {
    await powerAppsPage.navigateToHome();
    await page.waitForTimeout(2000);
  });

  await recorder.stopRecording();

  const recordings = recorder.getRecordings();

  // Verify response bodies are limited
  recordings.forEach((rec) => {
    if (rec.responseBody && typeof rec.responseBody === 'string') {
      const bodySize = Buffer.byteLength(rec.responseBody, 'utf-8');
      expect(bodySize).toBeLessThanOrEqual(10 * 1024);
    }
  });

  console.log(`Recorded ${recordings.length} calls with size limits`);
});

/**
 * Example 7: Filter by HTTP Methods
 * Shows how to record only specific HTTP methods
 */
test('Record only POST and PUT requests', async ({ page, powerAppsPage }) => {
  const recorder = new ApiRecorder(page, {
    methods: ['POST', 'PUT'],
  });

  await recorder.startRecording();

  await test.step('Perform actions', async () => {
    await powerAppsPage.navigateToApps();
    await page.waitForTimeout(2000);
  });

  await recorder.stopRecording();

  const recordings = recorder.getRecordings();

  // Verify all recordings are POST or PUT
  recordings.forEach((rec) => {
    expect(['POST', 'PUT']).toContain(rec.method);
  });

  console.log(`Recorded ${recordings.length} POST/PUT requests`);
});

/**
 * Example 8: Recording in Describe Block with Lifecycle Hooks
 * Shows best practice setup with beforeEach and afterEach
 */
test.describe('API Recording Best Practices', () => {
  let recorder: ApiRecorder;
  const recordingsDir = path.join(__dirname, '../test-results/recordings');

  test.beforeEach(async ({ page }) => {
    recorder = new ApiRecorder(page);
    await recorder.startRecording();

    // Ensure recordings directory exists
    if (!fs.existsSync(recordingsDir)) {
      fs.mkdirSync(recordingsDir, { recursive: true });
    }
  });

  test.afterEach(async () => {
    if (recorder && recorder.isRecording()) {
      await recorder.stopRecording();
    }
  });

  test('Test with automatic recording - Example 1', async ({ powerAppsPage }) => {
    await powerAppsPage.navigateToHome();
    await powerAppsPage.page.waitForTimeout(1000);

    const recordings = recorder.getRecordings();
    expect(recordings.length).toBeGreaterThan(0);

    // Save recordings with test name
    const filename = path.join(recordingsDir, 'test-example-1.json');
    await recorder.saveToFile(filename);
  });

  test('Test with automatic recording - Example 2', async ({ powerAppsPage }) => {
    await powerAppsPage.navigateToApps();
    await powerAppsPage.page.waitForTimeout(1000);

    const recordings = recorder.getRecordings();
    expect(recordings.length).toBeGreaterThan(0);

    // Get statistics
    const stats = recorder.getStatistics();
    console.log(`Success rate: ${stats.successRate.toFixed(2)}%`);
  });
});
