/*!
 * Authentication setup script for Power Apps
 * Run this before tests to authenticate to Microsoft/Power Apps
 */

import { authenticateToMicrosoft, validateAuthConfig } from 'playwright-power-platform-toolkit';
import { ConfigHelper } from 'playwright-power-platform-toolkit';

async function authenticate() {
  try {
    console.log('🚀 Power Apps Authentication Setup');
    console.log('===================================\n');

    // Validate configuration
    validateAuthConfig();

    // Get URL to authenticate to
    const powerAppsUrl = ConfigHelper.buildUrl(ConfigHelper.getDefaultUrl());

    // Check for headful mode
    const headless = !process.argv.includes('--headful');

    // Perform authentication
    await authenticateToMicrosoft(powerAppsUrl, headless);

    console.log('\n✅ Authentication complete!');
    console.log('💡 You can now run tests with: npm test');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Authentication failed:', error.message);
    console.log('\n📋 Required environment variables:');
    console.log('   - MS_AUTH_EMAIL');
    console.log('   - MS_USER_PASSWORD');
    console.log('   - POWER_APPS_BASE_URL');
    console.log('   - AZURE_TENANT_ID');
    console.log('\n💡 Run with --headful to see the browser:');
    console.log('   npm run auth -- --headful');
    process.exit(1);
  }
}

authenticate();
