/*!
 * API Recording Script
 * Records API calls from Power Apps and generates test code
 *
 * Usage:
 *   npm run record:apis              # Record in headless mode
 *   npm run record:apis:headful      # Record in headed mode
 *   tsx scripts/record-apis.ts --headful --output my-recording.json
 */

import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { ApiRecorder } from 'playwright-power-platform-toolkit';
import { PowerAppsPage } from 'playwright-power-platform-toolkit';
import { ConfigHelper } from 'playwright-power-platform-toolkit';
import { getStorageStatePath } from 'playwright-power-platform-toolkit';
import { colors } from 'playwright-power-platform-toolkit';
import * as fs from 'fs';
import * as path from 'path';

interface RecordingOptions {
  headless: boolean;
  outputFile: string;
  generateTests: boolean;
  urlFilter?: string;
  maxDuration: number;
}

/**
 * Parse command line arguments
 */
function parseArgs(): RecordingOptions {
  const args = process.argv.slice(2);

  const options: RecordingOptions = {
    headless: !args.includes('--headful') && !args.includes('--headed'),
    outputFile: 'api-recording.json',
    generateTests: true,
    maxDuration: 5 * 60 * 1000, // 5 minutes default
  };

  // Parse output file
  const outputIndex = args.findIndex((arg) => arg === '--output' || arg === '-o');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    options.outputFile = args[outputIndex + 1];
  }

  // Parse URL filter
  const filterIndex = args.findIndex((arg) => arg === '--filter' || arg === '-f');
  if (filterIndex !== -1 && args[filterIndex + 1]) {
    options.urlFilter = args[filterIndex + 1];
  }

  // Parse max duration
  const durationIndex = args.findIndex((arg) => arg === '--duration' || arg === '-d');
  if (durationIndex !== -1 && args[durationIndex + 1]) {
    options.maxDuration = parseInt(args[durationIndex + 1]) * 1000;
  }

  // Skip test generation
  if (args.includes('--no-tests')) {
    options.generateTests = false;
  }

  return options;
}

/**
 * Print usage instructions
 */
function printUsage() {
  console.log(`
${colors.fgCyan}╔══════════════════════════════════════════════════════════╗
║         Power Apps API Recording Script                 ║
╚══════════════════════════════════════════════════════════╝${colors.reset}

${colors.bright}Usage:${colors.reset}
  npm run record:apis              Record in headless mode
  npm run record:apis:headful      Record in headed mode
  tsx scripts/record-apis.ts [options]

${colors.bright}Options:${colors.reset}
  --headful, --headed              Run browser in headed mode
  --output, -o <file>              Output filename (default: api-recording.json)
  --filter, -f <pattern>           URL filter regex pattern
  --duration, -d <seconds>         Max recording duration in seconds (default: 300)
  --no-tests                       Skip test code generation

${colors.bright}Examples:${colors.reset}
  tsx scripts/record-apis.ts --headful
  tsx scripts/record-apis.ts --output my-apis.json
  tsx scripts/record-apis.ts --filter "api\\.powerapps\\.com"
  tsx scripts/record-apis.ts --duration 120 --no-tests

${colors.bright}What it does:${colors.reset}
  1. Opens Power Apps in browser
  2. Records all API calls (method, URL, payload, response)
  3. Saves recording to JSON file
  4. Generates Playwright test code from recordings
  5. Shows statistics about recorded calls
`);
}

/**
 * Main recording function
 */
async function recordApis() {
  const options = parseArgs();

  // Show help if requested
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    printUsage();
    return;
  }

  console.log(
    `\n${colors.fgCyan}═══════════════════════════════════════════════════════════${colors.reset}`
  );
  console.log(`${colors.fgCyan}    Starting API Recording Session${colors.reset}`);
  console.log(
    `${colors.fgCyan}═══════════════════════════════════════════════════════════${colors.reset}\n`
  );

  console.log(`${colors.fgGray}Mode: ${options.headless ? 'Headless' : 'Headed'}${colors.reset}`);
  console.log(`${colors.fgGray}Output: ${options.outputFile}${colors.reset}`);
  console.log(`${colors.fgGray}Max Duration: ${options.maxDuration / 1000}s${colors.reset}`);
  if (options.urlFilter) {
    console.log(`${colors.fgGray}URL Filter: ${options.urlFilter}${colors.reset}`);
  }
  console.log('');

  let browser: Browser | null = null;
  let context: BrowserContext | null = null;
  let page: Page | null = null;

  try {
    // Get storage state path
    const email = process.env.MS_AUTH_EMAIL;
    if (!email) {
      console.error(`${colors.fgRed}❌ MS_AUTH_EMAIL environment variable not set${colors.reset}`);
      console.log(`${colors.fgYellow}Please set MS_AUTH_EMAIL in your .env file${colors.reset}`);
      process.exit(1);
    }

    const storageStatePath = getStorageStatePath(email);
    if (!fs.existsSync(storageStatePath)) {
      console.error(
        `${colors.fgRed}❌ Storage state file not found: ${storageStatePath}${colors.reset}`
      );
      console.log(`${colors.fgYellow}Please run authentication first: npm run auth${colors.reset}`);
      process.exit(1);
    }

    console.log(`${colors.fgGreen}✓ Found storage state: ${storageStatePath}${colors.reset}\n`);

    // Launch browser
    console.log(`${colors.fgCyan}🚀 Launching browser...${colors.reset}`);
    browser = await chromium.launch({
      headless: options.headless,
      args: ['--start-maximized'],
    });

    // Create context with storage state
    context = await browser.newContext({
      storageState: storageStatePath,
      viewport: options.headless ? { width: 1920, height: 1080 } : null,
    });

    page = await context.newPage();

    // Create API recorder
    const urlFilter = options.urlFilter
      ? new RegExp(options.urlFilter)
      : /api\.powerapps\.com|api\.bap\.microsoft\.com|api\.businessappdistribution\.microsoft\.com/;

    const recorder = new ApiRecorder(page, {
      urlFilter,
      resourceTypes: ['xhr', 'fetch'],
      includeRequestHeaders: true,
      includeResponseHeaders: true,
      includeRequestBody: true,
      includeResponseBody: true,
      maxResponseBodySize: 500 * 1024, // 500KB
    });

    // Start recording
    console.log(`${colors.fgGreen}🔴 Recording started...${colors.reset}`);
    await recorder.startRecording();

    // Navigate to Power Apps
    const powerAppsPage = new PowerAppsPage(page);

    console.log(`${colors.fgCyan}📍 Navigating to Power Apps Home...${colors.reset}`);
    await powerAppsPage.navigateToHome();
    await page.waitForTimeout(2000);

    console.log(`${colors.fgCyan}📍 Navigating to Apps page...${colors.reset}`);
    await powerAppsPage.navigateToApps();
    await page.waitForTimeout(2000);

    // Interactive mode message
    if (!options.headless) {
      console.log(
        `\n${colors.fgYellow}═══════════════════════════════════════════════════════════${colors.reset}`
      );
      console.log(`${colors.fgYellow}  🎯 INTERACTIVE MODE${colors.reset}`);
      console.log(
        `${colors.fgYellow}═══════════════════════════════════════════════════════════${colors.reset}`
      );
      console.log(
        `${colors.fgGreen}The browser will remain open for manual interaction.${colors.reset}`
      );
      console.log(
        `${colors.fgGreen}Navigate through Power Apps to record API calls.${colors.reset}`
      );
      console.log(
        `${colors.fgYellow}Recording will stop automatically in ${options.maxDuration / 1000}s${colors.reset}`
      );
      console.log(`${colors.fgYellow}Or press Ctrl+C to stop recording manually.${colors.reset}\n`);

      // Wait for user interaction or timeout
      await page.waitForTimeout(options.maxDuration);
    } else {
      // In headless mode, just wait a bit for APIs to settle
      console.log(`${colors.fgGray}Waiting for API calls to complete...${colors.reset}`);
      await page.waitForTimeout(5000);
    }

    // Stop recording
    console.log(`\n${colors.fgRed}⏹ Stopping recording...${colors.reset}`);
    await recorder.stopRecording();

    // Get statistics
    const stats = recorder.getStatistics();
    console.log(
      `\n${colors.fgCyan}═══════════════════════════════════════════════════════════${colors.reset}`
    );
    console.log(`${colors.fgCyan}    Recording Statistics${colors.reset}`);
    console.log(
      `${colors.fgCyan}═══════════════════════════════════════════════════════════${colors.reset}\n`
    );
    console.log(`${colors.fgGreen}Total API calls:${colors.reset} ${stats.totalCalls}`);
    console.log(
      `${colors.fgGreen}Average duration:${colors.reset} ${stats.avgDuration.toFixed(2)}ms`
    );
    console.log(
      `${colors.fgGreen}Total duration:${colors.reset} ${stats.totalDuration.toFixed(2)}ms\n`
    );

    console.log(`${colors.fgCyan}Calls by Method:${colors.reset}`);
    Object.entries(stats.byMethod).forEach(([method, count]) => {
      console.log(`  ${colors.fgGray}${method}:${colors.reset} ${count}`);
    });

    console.log(`\n${colors.fgCyan}Calls by Status:${colors.reset}`);
    Object.entries(stats.byStatus).forEach(([status, count]) => {
      const statusColor = status.startsWith('2')
        ? colors.fgGreen
        : status.startsWith('4') || status.startsWith('5')
          ? colors.fgRed
          : colors.fgYellow;
      console.log(
        `  ${colors.fgGray}${status}:${colors.reset} ${statusColor}${count}${colors.reset}`
      );
    });

    // Save recording
    console.log(`\n${colors.fgCyan}💾 Saving recording...${colors.reset}`);
    const outputPath = await recorder.saveToFile(options.outputFile);
    console.log(`${colors.fgGreen}✓ Recording saved to: ${outputPath}${colors.reset}`);

    // Generate test code
    if (options.generateTests) {
      console.log(`\n${colors.fgCyan}📝 Generating test code...${colors.reset}`);
      const testFileName = options.outputFile.replace('.json', '.spec.ts');
      const testPath = await recorder.saveTestCode(testFileName, {
        testName: 'Generated API test from recording',
        includeAssertions: true,
        useTestSteps: true,
      });
      console.log(`${colors.fgGreen}✓ Test code saved to: ${testPath}${colors.reset}`);
    }

    console.log(
      `\n${colors.fgGreen}═══════════════════════════════════════════════════════════${colors.reset}`
    );
    console.log(`${colors.fgGreen}    Recording Complete! ✅${colors.reset}`);
    console.log(
      `${colors.fgGreen}═══════════════════════════════════════════════════════════${colors.reset}\n`
    );
  } catch (error) {
    console.error(`\n${colors.fgRed}❌ Error during recording:${colors.reset}`, error);
    process.exit(1);
  } finally {
    // Cleanup
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log(`\n\n${colors.fgYellow}⚠ Recording interrupted by user${colors.reset}`);
  process.exit(0);
});

// Run the script
recordApis().catch((error) => {
  console.error(`${colors.fgRed}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
