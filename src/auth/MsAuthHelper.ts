/*!
 * Microsoft Authentication Helper for Power Apps
 * Based on playwright-ms-auth package
 */

import * as fs from 'fs';
import * as dotenv from 'dotenv';
import {
  authenticate,
  loadConfigFromEnv,
  getStorageStatePath as getMsAuthStorageStatePath,
  getAuthBaseDir,
} from 'playwright-ms-auth';

dotenv.config();

/**
 * Microsoft Authentication configuration
 */
export interface MsAuthConfig {
  email: string;
  credentialType?: 'password' | 'token' | 'certificate';
  credentialProvider?: 'environment' | 'azure-keyvault' | 'local-file' | 'github-secrets';
  envVariableName?: string;
  localFilePath?: string;
  certificatePassword?: string;
  headless?: boolean;
  timeout?: number;
}

/**
 * Load MS Auth configuration from environment variables
 */
export function loadAuthConfig(): MsAuthConfig {
  const config = loadConfigFromEnv();
  return config as MsAuthConfig;
}

/**
 * Get the storage state file path for authenticated session
 * Uses playwright-ms-auth's getStorageStatePath function
 */
export function getStorageStatePath(email?: string): string {
  const config = loadConfigFromEnv();
  const userEmail = email || config.email;
  return getMsAuthStorageStatePath(userEmail);
}

/**
 * Check if valid authentication exists
 */
export function hasValidAuth(email?: string): boolean {
  const storagePath = getStorageStatePath(email);
  return fs.existsSync(storagePath);
}

/**
 * Clear saved authentication state
 */
export function clearAuthState(email?: string): void {
  const storagePath = getStorageStatePath(email);
  
  if (fs.existsSync(storagePath)) {
    fs.unlinkSync(storagePath);
    console.log(`✅ Cleared authentication state: ${storagePath}`);
  } else {
    console.log('ℹ️ No authentication state to clear');
  }

  // Also clear screenshots directory if it exists
  const authBaseDir = getAuthBaseDir();
  const screenshotsDir = `${authBaseDir}/screenshots`;
  if (fs.existsSync(screenshotsDir)) {
    console.log(`📁 Screenshots directory: ${screenshotsDir}`);
  }
}

/**
 * Authenticate to Microsoft using playwright-ms-auth
 * 
 * @param url - URL to authenticate to (e.g., Power Apps maker portal)
 * @param headless - Whether to run browser in headless mode
 */
export async function authenticateToMicrosoft(
  url: string,
  headless: boolean = true
): Promise<void> {
  console.log('🔐 Starting Microsoft authentication...');
  console.log(`🌐 URL: ${url}`);
  console.log(`👁️  Browser mode: ${headless ? 'headless' : 'headful'}`);

  try {
    // Load configuration from environment variables
    const config = loadConfigFromEnv();
    config.headless = headless;

    console.log('📧 Email:', config.email);
    console.log('🔑 Credential Type:', config.credentialType || 'password');

    // Perform authentication - saves to ~/.playwright-ms-auth/state-{email}.json
    await authenticate(config, url);

    const storagePath = getMsAuthStorageStatePath(config.email);
    console.log('✅ Authentication successful!');
    console.log(`📁 Auth state saved to: ${storagePath}`);
  } catch (error: any) {
    console.error('❌ Authentication failed:', error?.message || error);
    throw error;
  }
}

/**
 * Helper to get authentication state for Playwright BrowserContext
 */
export async function getAuthState(): Promise<{ storageState: string }> {
  const config = loadConfigFromEnv();
  const storagePath = getStorageStatePath(config.email);

  if (!fs.existsSync(storagePath)) {
    throw new Error(
      `Authentication state not found at ${storagePath}. ` +
      'Please run authentication first: npm run auth'
    );
  }

  return { storageState: storagePath };
}

/**
 * Validate authentication configuration
 */
export function validateAuthConfig(): void {
  const config = loadConfigFromEnv();
  const credentialType = config.credentialType || 'password';
  
  const missing: string[] = [];

  // Required for all auth types
  if (!process.env.MS_AUTH_EMAIL) {
    missing.push('MS_AUTH_EMAIL');
  }
  if (!process.env.POWER_APPS_BASE_URL) {
    missing.push('POWER_APPS_BASE_URL');
  }

  // Credential-specific validation
  if (credentialType === 'certificate') {
    if (!process.env.MS_AUTH_LOCAL_FILE_PATH) {
      missing.push('MS_AUTH_LOCAL_FILE_PATH');
    }
    // Certificate password is optional (cert might not be password-protected)
  } else if (credentialType === 'password') {
    if (!process.env.MS_USER_PASSWORD) {
      missing.push('MS_USER_PASSWORD');
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
      'Please check your .env file.'
    );
  }
}
