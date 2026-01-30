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

    // Perform authentication (now includes MSAL token waiting in playwright-ms-auth v0.0.16+)
    await authenticateToMicrosoft(powerAppsUrl, headless);

    console.log('\n✅ Authentication complete!');
    console.log('💡 You can now run tests with: npm test');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Authentication failed:', error.message);
    console.log('\n📋 Required environment variables:');
    console.log('   - MS_AUTH_EMAIL');
    console.log('   - POWER_APPS_BASE_URL');
    console.log('   - MS_AUTH_CREDENTIAL_TYPE (password or certificate)');
    console.log('');
    console.log('   For password authentication:');
    console.log('   - MS_USER_PASSWORD');
    console.log('');
    console.log('   For certificate authentication:');
    console.log('   - MS_AUTH_CREDENTIAL_PROVIDER (e.g., local-file, azure-keyvault)');
    console.log('   - MS_AUTH_LOCAL_FILE_PATH (path to .pfx certificate)');
    console.log('   - MS_AUTH_CERTIFICATE_PASSWORD (optional, if cert is password-protected)');
    console.log('\n💡 Run with --headful to see the browser:');
    console.log('   npm run auth -- --headful');
    console.log('\n📝 Optional MSAL token configuration:');
    console.log('   - MS_AUTH_WAIT_FOR_MSAL_TOKENS=true (default)');
    console.log('   - MS_AUTH_MSAL_TOKEN_TIMEOUT=30000 (default, in ms)');
    process.exit(1);
  }
}

authenticate();
