/**
 * Playwright Configuration for Power Platform E2E Tests
 */

import { existsSync } from 'fs';
import * as path from 'path';
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import {
  getStorageStatePath,
  checkEnvironmentVariables,
  TimeOut,
  ConfigHelper,
  colors,
} from 'playwright-power-platform-toolkit';
import { getEnvironmentConfig } from './utils/common';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const playwrightTestRunName = 'Playwright Power Platform E2E Tests';

/**
 * Helper function to get grep pattern from environment
 */
function getGrepPattern(): RegExp | undefined {
  const grepPattern = process.env.GREP;
  return grepPattern ? new RegExp(grepPattern) : undefined;
}

// Check all required environment variables
// Skip storage state validation in CI, when listing files, or in worker processes
const isMainProcess = !process.env.TEST_WORKER_INDEX && !process.env.PLAYWRIGHT_WORKER;
if (!process.argv.includes('list-files') && !process.env.CI && isMainProcess) {
  const email = process.env.MS_AUTH_EMAIL;

  if (!email || email.length === 0) {
    throw new Error(
      `Missing required environment variables: MS_AUTH_EMAIL\n` +
        'Please set these variables in your .env file or environment.'
    );
  }

  try {
    const storageStatePath = getStorageStatePath(email);

    if (process.env.MS_AUTH_EMAIL && !existsSync(storageStatePath)) {
      console.log('===========================================================');
      console.error(
        `${colors.fgRed}❌ Storage state file at ${storageStatePath} does not exist!${colors.reset}`
      );
      console.error(
        `${colors.fgYellow}💡 Please run authentication first: npm run auth:headful${colors.reset}`
      );
      console.log('===========================================================');
      process.exit(1);
    } else if (process.env.MS_AUTH_EMAIL && existsSync(storageStatePath)) {
      const expirationCheck = ConfigHelper.checkStorageStateExpiration(storageStatePath);

      if (expirationCheck.expired) {
        console.log('===========================================================');
        console.error(`${colors.fgRed}❌ Authentication tokens have expired!${colors.reset}`);
        if (expirationCheck.expiresOn) {
          const expiryDate = new Date(expirationCheck.expiresOn * 1000);
          console.error(
            `${colors.fgYellow}   Token expired at: ${expiryDate.toLocaleString()}${colors.reset}`
          );
        }
        console.error(
          `${colors.fgYellow}💡 Please re-authenticate: npm run auth:headful${colors.reset}`
        );
        console.log('===========================================================');
        process.exit(1);
      }

      console.log(
        `${colors.fgCyan}🔐 Storage state loaded: ${colors.fgGreen}${storageStatePath}${colors.reset}`
      );

      if (expirationCheck.expiresOn) {
        const expiryDate = new Date(expirationCheck.expiresOn * 1000);
        const timeUntilExpiry = Math.floor((expirationCheck.expiresOn - Date.now() / 1000) / 60);
        console.log(
          `${colors.fgCyan}⏰ Token expires: ${colors.fgYellow}${expiryDate.toLocaleString()} ${colors.fgGray}(in ${timeUntilExpiry} minutes)${colors.reset}`
        );
      }
    }
  } catch (error: any) {
    // In case auth config is incomplete (e.g., missing KeyVault vars in CI), skip validation
    console.log(
      `${colors.fgYellow}⚠️  Skipping storage state validation (auth config incomplete): ${error.message}${colors.reset}`
    );
  }
}

/**
 * Playwright configuration for Power Platform E2E Tests
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  name: playwrightTestRunName,

  /* Global setup and teardown */
  globalSetup: require.resolve('./globals/global-setup'),
  globalTeardown: require.resolve('./globals/global-teardown'),

  /* Run tests in files in parallel */
  fullyParallel: !process.env.CI,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry configuration */
  repeatEach: getEnvironmentConfig().repeatEach,
  retries: getEnvironmentConfig().retries,

  /* Test directory and matching */
  testDir: getEnvironmentConfig().testDirectory,
  timeout: getEnvironmentConfig().testTimeout,
  testMatch: ['**/*.+(spec|test|setup).+(ts|js|mjs)'],
  testIgnore: [
    // All tests should run
  ],

  /* Worker configuration */
  workers: getEnvironmentConfig().workers,

  /* Output directory */
  outputDir: path.join(getEnvironmentConfig().outputDirectory, 'artifacts'),

  /* Reporting slow tests */
  reportSlowTests: null,

  /* Expect configuration */
  expect: {
    timeout: TimeOut.DefaultWaitTime,
  },

  /* Reporters */
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    [
      'html',
      {
        outputFolder: path.join(getEnvironmentConfig().outputDirectory, 'html-report'),
        open: 'never',
      },
    ],
    [
      'junit',
      {
        outputFile: path.join(
          getEnvironmentConfig().outputDirectory,
          'artifacts',
          'testResults',
          `test-results-${process.env.SHARD_INDEX ?? 1}.xml`
        ),
      },
    ],
    // AI Reporter configuration
    // See: https://github.com/deepakkamboj/playwright-ai-reporter
    [
      'playwright-ai-reporter',
      {
        // Performance thresholds
        slowTestThreshold: parseInt(process.env.SLOW_TEST_THRESHOLD || '3'),
        maxSlowTestsToShow: parseInt(process.env.MAX_SLOW_TESTS_TO_SHOW || '5'),
        timeoutWarningThreshold: parseInt(process.env.TIMEOUT_WARNING_THRESHOLD || '20'),

        // Output configuration
        showStackTrace: true,
        outputDir: path.join(getEnvironmentConfig().outputDirectory, 'playwright-ai-reports'),

        // AI & Automation features
        generateFix: process.env.GENERATE_FIX === 'false',
        createBug: process.env.CREATE_BUG === 'false',
        generatePR: process.env.GENERATE_PR === 'false',
        publishToDB: process.env.PUBLISH_TO_DB === 'false',
        sendEmail: process.env.SEND_EMAIL === 'false',
      },
    ],
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL */
    baseURL: ConfigHelper.getBaseUrl(),

    /* Browser options */
    channel: 'msedge',
    headless: getEnvironmentConfig().headless,
    viewport: { width: 1920, height: 1080 },

    /* Capture options */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    /* Timeouts */
    actionTimeout: TimeOut.OneMinuteTimeOut,
    navigationTimeout: TimeOut.OneMinuteTimeOut,

    /* HTTP options */
    ignoreHTTPSErrors: true,
    acceptDownloads: true,

    /* Locale */
    locale: 'en-US',

    /* Permissions */
    permissions: ['clipboard-read', 'clipboard-write'],

    /* Storage state - conditionally load based on environment */
    storageState: process.env.MS_AUTH_EMAIL
      ? getStorageStatePath(process.env.MS_AUTH_EMAIL!)
      : undefined,

    /* Launch options */
    launchOptions: {
      slowMo: Number(getEnvironmentConfig().slowMo) || 0,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--window-size=1920,1080',
      ],
    },
  },

  /* Test filtering */
  grep: getGrepPattern(),
});
