/**
 * Configuration utilities for Power Platform testing
 *
 * @packageDocumentation
 */
import { type TokenExpirationCheck } from './auth-helpers';
/**
 * Timeout constants (in milliseconds)
 *
 * @example
 * ```typescript
 * import { TimeOut } from '@playwright-power-platform/toolkit';
 *
 * await page.waitForSelector('.my-element', { timeout: TimeOut.DefaultWaitTime });
 * ```
 */
export declare enum TimeOut {
    /** 5 seconds - Default loop wait time */
    DefaultLoopWaitTime = 5000,
    /** 30 seconds - Default wait time */
    DefaultWaitTime = 30000,
    /** 3 minutes - Default maximum wait time */
    DefaultMaxWaitTime = 180000,
    /** 30 seconds - Default wait time for validation */
    DefaultWaitTimeForValidation = 30000,
    /** 2 seconds - Element wait time */
    ElementWaitTime = 2000,
    /** 5 minutes - Five minutes timeout */
    FiveMinutesTimeout = 300000,
    /** 1 minute - Load timeout */
    LoadTimeOut = 60000,
    /** 1 minute - Navigation timeout */
    NavigationTimeout = 60000,
    /** 1 minute - One minute timeout */
    OneMinuteTimeOut = 60000,
    /** 5 seconds - Optional element timeout */
    OptionalElementTimeout = 5000,
    /** 30 seconds - Page load timeout */
    PageLoadTimeOut = 30000,
    /** 6 minutes - Test timeout */
    TestTimeout = 360000,
    /** 10 minutes - Maximum test timeout */
    TestTimeoutMax = 600000,
    /** 2 minutes - Two minutes timeout */
    TwoMinutesTimeout = 120000,
    /** 15 minutes - Fifteen minutes timeout */
    FifteenMinutesTimeout = 900000
}
/**
 * Configuration helper for Power Platform testing
 *
 * @example
 * ```typescript
 * import { ConfigHelper } from '@playwright-power-platform/toolkit';
 *
 * const baseUrl = ConfigHelper.getBaseUrl();
 * const tenantId = ConfigHelper.getTenantId();
 * ```
 */
export declare class ConfigHelper {
    /**
     * Get base URL for Power Apps
     *
     * @returns Base URL from environment variable or default
     * @default 'https://make.powerapps.com'
     */
    static getBaseUrl(): string;
    /**
     * Get Business Application Platform (BAP) API base URL
     * Used for environment, tenant, and settings management
     *
     * @returns BAP API URL from environment variable or default
     * @default 'https://api.bap.microsoft.com'
     */
    static getBapApiUrl(): string;
    /**
     * Get canvas designer URL
     *
     * @returns Canvas designer URL from environment variable or default
     * @default 'https://apps.powerapps.com/'
     */
    static getCanvasDesignerUrl(): string;
    /**
     * Get authentication endpoint
     *
     * @returns Auth endpoint from environment variable or default
     * @default 'https://login.microsoftonline.com'
     */
    static getAuthEndpoint(): string;
    /**
     * Get environment ID from environment variable
     *
     * @returns Environment ID or undefined if not set
     */
    static getEnvironmentId(): string | undefined;
    /**
     * Get tenant ID from environment variable
     *
     * @returns Tenant ID
     * @throws {Error} If AZURE_TENANT_ID is not set
     */
    static getTenantId(): string;
    /**
     * Extract environment ID from a Power Apps URL
     *
     * @param url - Power Apps URL containing environment ID
     * @returns Environment ID or null if not found
     *
     * @example
     * ```typescript
     * const envId = ConfigHelper.extractEnvironmentId(
     *   'https://make.powerapps.com/environments/abc-123/apps'
     * );
     * // Returns: 'abc-123'
     * ```
     */
    static extractEnvironmentId(url: string): string | null;
    /**
     * Build full URL with optional environment ID
     *
     * @param path - Path to append (e.g., '/apps', '/solutions')
     * @param environmentId - Optional environment ID to include in URL
     * @returns Full URL with environment and path
     *
     * @example
     * ```typescript
     * const url = ConfigHelper.buildUrl('/apps', 'env-123');
     * // Returns: 'https://make.powerapps.com/environments/env-123/apps'
     * ```
     */
    static buildUrl(path: string, environmentId?: string): string;
    /**
     * Get authentication token from storage state
     *
     * Retrieves the Bearer token from the stored authentication state.
     * Optionally filters by API URL to get a token with the correct audience.
     *
     * @param storagePath - Optional custom path to storage state file
     * @param apiUrl - Optional API URL to match token audience
     * @returns Bearer token string or undefined if not found
     *
     * @example
     * ```typescript
     * const token = ConfigHelper.getAuthToken();
     * const bapToken = ConfigHelper.getAuthToken(undefined, 'https://api.bap.microsoft.com');
     * ```
     */
    static getAuthToken(storagePath?: string, apiUrl?: string): string | undefined;
    /**
     * Check storage state token expiration
     *
     * Reads the storage state file and checks if authentication tokens have expired.
     *
     * @param storagePath - Optional custom path to storage state file
     * @returns Token expiration check result
     *
     * @example
     * ```typescript
     * const check = ConfigHelper.checkStorageStateExpiration();
     *
     * if (check.expired) {
     *   console.log('Token expired, please re-authenticate');
     * }
     * ```
     */
    static checkStorageStateExpiration(storagePath?: string): TokenExpirationCheck;
    /**
     * Get default URL path (home page)
     *
     * @returns Default path string
     * @default '/home'
     */
    static getDefaultUrl(): string;
}
