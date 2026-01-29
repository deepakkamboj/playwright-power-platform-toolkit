"use strict";
/**
 * Configuration utilities for Power Platform testing
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigHelper = exports.TimeOut = void 0;
const auth_helpers_1 = require("./auth-helpers");
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
var TimeOut;
(function (TimeOut) {
    /** 5 seconds - Default loop wait time */
    TimeOut[TimeOut["DefaultLoopWaitTime"] = 5000] = "DefaultLoopWaitTime";
    /** 30 seconds - Default wait time */
    TimeOut[TimeOut["DefaultWaitTime"] = 30000] = "DefaultWaitTime";
    /** 3 minutes - Default maximum wait time */
    TimeOut[TimeOut["DefaultMaxWaitTime"] = 180000] = "DefaultMaxWaitTime";
    /** 30 seconds - Default wait time for validation */
    TimeOut[TimeOut["DefaultWaitTimeForValidation"] = 30000] = "DefaultWaitTimeForValidation";
    /** 2 seconds - Element wait time */
    TimeOut[TimeOut["ElementWaitTime"] = 2000] = "ElementWaitTime";
    /** 5 minutes - Five minutes timeout */
    TimeOut[TimeOut["FiveMinutesTimeout"] = 300000] = "FiveMinutesTimeout";
    /** 1 minute - Load timeout */
    TimeOut[TimeOut["LoadTimeOut"] = 60000] = "LoadTimeOut";
    /** 1 minute - Navigation timeout */
    TimeOut[TimeOut["NavigationTimeout"] = 60000] = "NavigationTimeout";
    /** 1 minute - One minute timeout */
    TimeOut[TimeOut["OneMinuteTimeOut"] = 60000] = "OneMinuteTimeOut";
    /** 5 seconds - Optional element timeout */
    TimeOut[TimeOut["OptionalElementTimeout"] = 5000] = "OptionalElementTimeout";
    /** 30 seconds - Page load timeout */
    TimeOut[TimeOut["PageLoadTimeOut"] = 30000] = "PageLoadTimeOut";
    /** 6 minutes - Test timeout */
    TimeOut[TimeOut["TestTimeout"] = 360000] = "TestTimeout";
    /** 10 minutes - Maximum test timeout */
    TimeOut[TimeOut["TestTimeoutMax"] = 600000] = "TestTimeoutMax";
    /** 2 minutes - Two minutes timeout */
    TimeOut[TimeOut["TwoMinutesTimeout"] = 120000] = "TwoMinutesTimeout";
    /** 15 minutes - Fifteen minutes timeout */
    TimeOut[TimeOut["FifteenMinutesTimeout"] = 900000] = "FifteenMinutesTimeout";
})(TimeOut || (exports.TimeOut = TimeOut = {}));
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
class ConfigHelper {
    /**
     * Get base URL for Power Apps
     *
     * @returns Base URL from environment variable or default
     * @default 'https://make.powerapps.com'
     */
    static getBaseUrl() {
        return process.env.POWER_APPS_BASE_URL || 'https://make.powerapps.com';
    }
    /**
     * Get Business Application Platform (BAP) API base URL
     * Used for environment, tenant, and settings management
     *
     * @returns BAP API URL from environment variable or default
     * @default 'https://api.bap.microsoft.com'
     */
    static getBapApiUrl() {
        return process.env.BAP_API_URL || 'https://api.bap.microsoft.com';
    }
    /**
     * Get canvas designer URL
     *
     * @returns Canvas designer URL from environment variable or default
     * @default 'https://apps.powerapps.com/'
     */
    static getCanvasDesignerUrl() {
        return process.env.CANVAS_DESIGNER_URL || 'https://apps.powerapps.com/';
    }
    /**
     * Get authentication endpoint
     *
     * @returns Auth endpoint from environment variable or default
     * @default 'https://login.microsoftonline.com'
     */
    static getAuthEndpoint() {
        return process.env.AUTH_ENDPOINT || 'https://login.microsoftonline.com';
    }
    /**
     * Get environment ID from environment variable
     *
     * @returns Environment ID or undefined if not set
     */
    static getEnvironmentId() {
        return process.env.POWER_APPS_ENVIRONMENT_ID;
    }
    /**
     * Get tenant ID from environment variable
     *
     * @returns Tenant ID
     * @throws {Error} If AZURE_TENANT_ID is not set
     */
    static getTenantId() {
        const tenantId = process.env.AZURE_TENANT_ID;
        if (!tenantId) {
            throw new Error('AZURE_TENANT_ID is not set in environment variables');
        }
        return tenantId;
    }
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
    static extractEnvironmentId(url) {
        const match = url.match(/\/environments\/([^\/]+)/);
        return match ? match[1] : null;
    }
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
    static buildUrl(path, environmentId) {
        const baseUrl = this.getBaseUrl();
        const envId = environmentId || this.getEnvironmentId();
        if (envId && path) {
            return `${baseUrl}/environments/${envId}${path}`;
        }
        return baseUrl + path;
    }
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
    static getAuthToken(storagePath, apiUrl) {
        return (0, auth_helpers_1.getAuthToken)(storagePath, apiUrl);
    }
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
    static checkStorageStateExpiration(storagePath) {
        return (0, auth_helpers_1.checkStorageStateExpiration)(storagePath);
    }
    /**
     * Get default URL path (home page)
     *
     * @returns Default path string
     * @default '/home'
     */
    static getDefaultUrl() {
        return '/home';
    }
}
exports.ConfigHelper = ConfigHelper;
