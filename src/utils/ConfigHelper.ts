/*!
 * Configuration utilities for Power Apps testing
 */

import { Page } from '@playwright/test';
import { TimeOut } from './CommonUtils';
import { colors } from './colors';

/**
 * Get configuration from environment variables
 */
export class ConfigHelper {
  /**
   * Get base URL for Power Apps
   * Defaults to test environment to match API recordings
   */
  static getBaseUrl(): string {
    return process.env.POWER_APPS_BASE_URL || 'https://make.test.powerapps.com';
  }

  /**
   * Get Business Application Platform (BAP) API base URL
   * Used for environment, tenant, and settings management
   */
  static getBapApiUrl(): string {
    return process.env.BAP_API_URL || 'https://tip2.api.bap.microsoft.com';
  }

  /**
   * Get canvas designer URL
   */
  static getCanvasDesignerUrl(): string {
    return process.env.CANVAS_DESIGNER_URL || 'https://apps.powerapps.com/';
  }

  /**
   * Get authentication endpoint
   */
  static getAuthEndpoint(): string {
    return process.env.AUTH_ENDPOINT || 'https://login.microsoftonline.com';
  }

  /**
   * Get environment ID (optional)
   */
  static getEnvironment(): string | undefined {
    return '/environments/' + process.env.POWER_APPS_ENVIRONMENT_ID || undefined;
  }

  /**
   * Get tenant ID
   */
  static getTenantId(): string {
    const tenantId = process.env.AZURE_TENANT_ID;
    if (!tenantId) {
      throw new Error('AZURE_TENANT_ID is not set in environment variables');
    }
    return tenantId;
  }

  /**
   * Extract environment ID from current URL
   * @param url - Current page URL
   * @returns Environment ID or null if not found
   */
  static extractEnvironmentId(url: string): string | null {
    const match = url.match(/\/environments\/([^\/]+)/);
    return match ? match[1] : null;
  }

  /**
   * Build full URL with optional environment ID
   * @param path - Path to append (e.g., '/apps', '/solutions')
   * @param environmentId - Optional environment ID to include in URL
   */
  static buildUrl(path: string): string {
    const baseUrl = this.getBaseUrl();
    const environment = this.getEnvironment();
    if (environment && path) {
      return `${baseUrl}${environment}${path}`;
    }
    return baseUrl + path;
  }

  /**
   * Get default URL path
   * @returns Default path ('/home')
   */
  static getDefaultUrl(): string {
    return '/home';
  }

  /**
   * Get required token audience for a given API URL
   * Maps API URLs to their required token audiences
   * @param apiUrl - API URL to get audience for
   * @returns Required token audience or undefined
   */
  private static getRequiredAudience(apiUrl?: string): string[] | undefined {
    if (!apiUrl) {
      return undefined;
    }

    // BAP API endpoints - require service.powerapps.com or api.bap.microsoft.com audience
    if (apiUrl.includes('api.bap.microsoft.com')) {
      return [
        'https://service.powerapps.com/',
        'https://api.bap.microsoft.com/',
        'https://management.core.windows.net/',
        'https://management.azure.com/',
      ];
    }

    // Power Apps maker portal - requires api.powerplatform.com audience
    if (apiUrl.includes('make.powerapps.com') || apiUrl.includes('make.test.powerapps.com')) {
      return ['https://api.powerplatform.com/', 'https://api.test.powerplatform.com/'];
    }

    // Power Apps canvas apps - requires apps.powerapps.com audience
    if (apiUrl.includes('apps.powerapps.com')) {
      return ['https://apps.powerapps.com'];
    }

    // Power Automate - requires service.flow.microsoft.com audience
    if (apiUrl.includes('flow.microsoft.com')) {
      return ['https://service.flow.microsoft.com/'];
    }

    return undefined;
  }

  /**
   * Get auth token from storage state file or environment variable
   * Extracts Bearer token from the localStorage in the storage state file
   * Optionally filters by API URL to get token with correct audience
   * @param storageStatePath - Optional path to storage state file
   * @param apiUrl - Optional API URL to match token audience
   * @returns Auth token (Bearer token) or undefined if not found
   */
  static getAuthToken(storageStatePath?: string, apiUrl?: string): string | undefined {
    // First try environment variable
    const envToken = process.env.POWER_APPS_AUTH_TOKEN;
    if (envToken) {
      return envToken;
    }

    // If no env token, try to get from storage state
    if (!storageStatePath) {
      // Try to get default storage state path
      const email = process.env.MS_AUTH_EMAIL;
      if (email) {
        try {
          const { getStorageStatePath } = require('../auth/MsAuthHelper');
          storageStatePath = getStorageStatePath(email);
        } catch {
          return undefined;
        }
      } else {
        return undefined;
      }
    }

    try {
      const fs = require('fs');
      const path = require('path');

      if (!fs.existsSync(storageStatePath)) {
        return undefined;
      }

      const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'));

      if (!storageState.origins || storageState.origins.length === 0) {
        return undefined;
      }

      const requiredAudiences = this.getRequiredAudience(apiUrl);
      let fallbackToken: string | undefined = undefined;

      // Search through all origins for the access token
      for (const origin of storageState.origins) {
        if (!origin.localStorage || !Array.isArray(origin.localStorage)) {
          continue;
        }

        // Look for access token in localStorage - the key contains 'accesstoken'
        for (const item of origin.localStorage) {
          if (item.name && item.name.toLowerCase().includes('accesstoken') && item.value) {
            try {
              // Parse the token data - it's a JSON string containing the credentials
              const tokenData = JSON.parse(item.value);
              if (tokenData.secret && typeof tokenData.secret === 'string') {
                // If we need a specific audience, check the target field
                if (requiredAudiences && tokenData.target) {
                  const target = tokenData.target.toLowerCase();
                  const matchesAudience = requiredAudiences.some((audience) =>
                    target.includes(audience.toLowerCase())
                  );

                  if (matchesAudience) {
                    return tokenData.secret;
                  }
                }

                // Keep first token as fallback
                if (!fallbackToken) {
                  fallbackToken = tokenData.secret;
                }
              }
            } catch (parseError) {
              // If parsing fails, continue to next item
              continue;
            }
          }
        }
      }

      // Return fallback token if no audience-specific token found
      return fallbackToken;
    } catch (error) {
      console.error(
        `${colors.fgYellow}⚠ Error reading auth token from storage state:${colors.reset}`,
        error
      );
      return undefined;
    }
  }

  /**
   * Get default environment name from storage state file
   * Extracts the defaultEnvironmentName from the authentication storage state
   * @param storageStatePath - Path to the storage state JSON file
   * @returns Default environment name or null if not found
   */
  static getDefaultEnvironmentNameFromStorage(storageStatePath: string): string | null {
    try {
      const fs = require('fs');
      if (!fs.existsSync(storageStatePath)) {
        console.log('Storage state file not found:', storageStatePath);
        return null;
      }

      const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'));

      // Navigate through the storage state structure
      if (!storageState.origins || storageState.origins.length === 0) {
        console.log(`${colors.fgYellow}⚠ No origins found in storage state${colors.reset}`);
        return null;
      }

      // Find the enrollment data in localStorage
      const origin = storageState.origins[0];
      if (!origin.localStorage) {
        return null;
      }

      // Look for the enrollment item in localStorage
      const enrollmentItem = origin.localStorage.find(
        (item: any) => item.name && item.name.includes(':enrollment')
      );

      if (!enrollmentItem || !enrollmentItem.value) {
        return null;
      }

      // Parse the enrollment data (it's a JSON string)
      const enrollmentData = JSON.parse(enrollmentItem.value);

      // Extract defaultEnvironmentName from tenant
      if (enrollmentData.tenant && enrollmentData.tenant.defaultEnvironmentName) {
        return enrollmentData.tenant.defaultEnvironmentName;
      }

      return null;
    } catch (error) {
      console.error(
        `${colors.fgRed}❌ Error reading defaultEnvironmentName from storage state:${colors.reset}`,
        error
      );
      return null;
    }
  }

  /**   * Check if tokens in storage state have expired
   * @param storagePath - Path to the storage state JSON file
   * @returns Object with expired boolean and expiresOn timestamp
   */
  static checkStorageStateExpiration(storagePath: string): {
    expired: boolean;
    expiresOn?: number;
  } {
    try {
      const fs = require('fs');
      const storageState = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));

      if (!storageState.origins || storageState.origins.length === 0) {
        return { expired: true };
      }

      // Check for access tokens in localStorage
      for (const origin of storageState.origins) {
        if (!origin.localStorage || !Array.isArray(origin.localStorage)) {
          continue;
        }

        for (const item of origin.localStorage) {
          if (item.name && item.name.toLowerCase().includes('accesstoken') && item.value) {
            try {
              const tokenData = JSON.parse(item.value);
              if (tokenData.expiresOn) {
                const expiresOn = parseInt(tokenData.expiresOn);
                const now = Math.floor(Date.now() / 1000);

                if (expiresOn < now) {
                  return { expired: true, expiresOn };
                } else {
                  return { expired: false, expiresOn };
                }
              }
            } catch {
              continue;
            }
          }
        }
      }

      return { expired: false };
    } catch (error) {
      return { expired: true };
    }
  }

  /**   * Check if storage state tokens are expired
   * @param storageStatePath - Path to the storage state JSON file
   * @returns Object with expiration status and details
   */
  static isStorageStateExpired(storageStatePath: string): {
    isExpired: boolean;
    message: string;
    expiresOn?: Date;
    timeUntilExpiry?: number;
  } {
    try {
      const fs = require('fs');
      if (!fs.existsSync(storageStatePath)) {
        return {
          isExpired: true,
          message: 'Storage state file not found',
        };
      }

      const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'));

      // Navigate through the storage state structure
      if (!storageState.origins || storageState.origins.length === 0) {
        return {
          isExpired: true,
          message: 'No authentication data found in storage state',
        };
      }

      // Find access tokens in localStorage
      const origin = storageState.origins[0];
      if (!origin.localStorage) {
        return {
          isExpired: true,
          message: 'No localStorage data found',
        };
      }

      // Look for access token items
      const tokenItems = origin.localStorage.filter(
        (item: any) => item.name && item.name.includes('accesstoken')
      );

      if (tokenItems.length === 0) {
        return {
          isExpired: true,
          message: 'No access tokens found in storage state',
        };
      }

      // Check each token's expiration
      let earliestExpiry: number | null = null;
      const now = Math.floor(Date.now() / 1000); // Current time in Unix timestamp (seconds)

      for (const tokenItem of tokenItems) {
        try {
          const tokenData = JSON.parse(tokenItem.value);
          if (tokenData.expiresOn) {
            const expiresOn = parseInt(tokenData.expiresOn);
            if (!earliestExpiry || expiresOn < earliestExpiry) {
              earliestExpiry = expiresOn;
            }
          }
        } catch {
          // Skip invalid token data
          continue;
        }
      }

      if (!earliestExpiry) {
        return {
          isExpired: true,
          message: 'Could not determine token expiration time',
        };
      }

      const expiresOnDate = new Date(earliestExpiry * 1000);
      const timeUntilExpiry = earliestExpiry - now; // in seconds

      if (timeUntilExpiry <= 0) {
        return {
          isExpired: true,
          message: `Storage state expired on ${expiresOnDate.toISOString()}`,
          expiresOn: expiresOnDate,
          timeUntilExpiry: timeUntilExpiry,
        };
      }

      // Warn if expiring soon (less than 5 minutes)
      const fiveMinutes = 5 * 60;
      if (timeUntilExpiry < fiveMinutes) {
        return {
          isExpired: false,
          message: `Storage state expires soon: ${Math.floor(timeUntilExpiry / 60)} minutes remaining`,
          expiresOn: expiresOnDate,
          timeUntilExpiry: timeUntilExpiry,
        };
      }

      return {
        isExpired: false,
        message: `Storage state valid until ${expiresOnDate.toISOString()}`,
        expiresOn: expiresOnDate,
        timeUntilExpiry: timeUntilExpiry,
      };
    } catch (error) {
      return {
        isExpired: true,
        message: `Error checking storage state expiration: ${(error as Error).message}`,
      };
    }
  }
}

/**
 * Navigate to the URL.
 * Navigating to the URL and waiting for page to fully load with retry logic.
 * @param page Page reference.
 * @param navigationUrl Navigation URL.
 * @param waitForNetwork Whether to wait for network idle (default: true).
 */
export async function navigateToUrl(
  page: Page,
  navigationUrl: string,
  waitForNetwork = false
): Promise<void> {
  const openInternal = async (retryCount = 0): Promise<any> => {
    try {
      // Navigate and wait for networkidle to ensure page is fully loaded
      await page.goto(navigationUrl, {
        waitUntil: waitForNetwork ? 'networkidle' : 'domcontentloaded',
        timeout: TimeOut.OneMinuteTimeOut,
      });

      console.log(
        `${colors.fgCyan}🔗 Navigate to URL: ${colors.fgGreen}${navigationUrl}${colors.reset}`
      );

      // Additional wait for load state to ensure page is stable
      await page.waitForLoadState('load', { timeout: TimeOut.DefaultWaitTime });
    } catch (e) {
      if (retryCount < 3) {
        const waitTime = 5000 * (retryCount + 1);
        console.log(
          `${colors.fgYellow}⚠ Error occurred while navigating to URL:${colors.reset} ${(e as Error).message}`
        );
        console.log(
          `${colors.fgYellow}🔄 Failed to navigate to URL ${navigationUrl}, waiting ${waitTime}ms and retrying. Retry # ${
            retryCount + 1
          }${colors.reset}`
        );
        await page.waitForTimeout(waitTime);
        return openInternal(retryCount + 1);
      } else {
        throw e;
      }
    }
  };

  await openInternal();
}
