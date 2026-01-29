"use strict";
/**
 * Authentication Helper Utilities
 *
 * Utilities for managing authentication state and tokens for Power Platform testing.
 *
 * @module AuthHelpers
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageStatePath = storageStatePath;
exports.getStorageStatePath = getStorageStatePath;
exports.getAuthToken = getAuthToken;
exports.checkStorageStateExpiration = checkStorageStateExpiration;
exports.checkEnvironmentVariables = checkEnvironmentVariables;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
/**
 * Get the path to the storage state file
 *
 * Returns the default location for the Playwright storage state file
 * which contains authentication cookies and tokens.
 *
 * @param customPath - Optional custom path for storage state
 * @returns Path to the storage state file
 *
 * @example
 * ```typescript
 * const storagePath = storageStatePath();
 * // Returns: ~/.auth/storageState.json
 * ```
 */
function storageStatePath(customPath) {
    if (customPath) {
        return customPath;
    }
    const homeDir = os.homedir();
    const authDir = path.join(homeDir, '.auth');
    // Ensure .auth directory exists
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }
    return path.join(authDir, 'storageState.json');
}
/**
 * Get the path to the storage state file for a specific user email
 *
 * Returns a user-specific storage state file path, useful when testing
 * with multiple accounts.
 *
 * @param email - User email address to create storage path for
 * @returns Path to the user-specific storage state file
 *
 * @example
 * ```typescript
 * const storagePath = getStorageStatePath('user@example.com');
 * // Returns: ~/.auth/storageState-user@example.com.json
 * ```
 */
function getStorageStatePath(email) {
    const homeDir = os.homedir();
    const authDir = path.join(homeDir, '.auth');
    // Ensure .auth directory exists
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }
    // Sanitize email for filename
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9@.-]/g, '_');
    return path.join(authDir, `storageState-${sanitizedEmail}.json`);
}
/**
 * Extract authentication token from storage state
 *
 * Reads the storage state file and extracts the Bearer token.
 * Optionally filters by API URL to get a token with the correct audience.
 *
 * @param storagePath - Optional custom path to storage state file
 * @param apiUrl - Optional API URL to match token audience
 * @returns Bearer token string or undefined if not found
 *
 * @example
 * ```typescript
 * // Get default token
 * const token = getAuthToken();
 *
 * // Get token for specific API
 * const bapToken = getAuthToken(undefined, 'https://api.bap.microsoft.com');
 * ```
 */
function getAuthToken(storagePath, apiUrl) {
    const storageFile = storagePath || storageStatePath();
    if (!fs.existsSync(storageFile)) {
        return undefined;
    }
    try {
        const storageData = JSON.parse(fs.readFileSync(storageFile, 'utf-8'));
        // Look for token in localStorage
        for (const origin of storageData.origins || []) {
            for (const item of origin.localStorage || []) {
                // Look for MSAL (Microsoft Authentication Library) tokens
                if (item.name.includes('accesstoken') || item.name.includes('msal')) {
                    try {
                        const tokenData = JSON.parse(item.value);
                        // Check if token matches the requested API URL (audience)
                        if (apiUrl && tokenData.resource && !apiUrl.includes(tokenData.resource)) {
                            continue;
                        }
                        // Return the access token
                        if (tokenData.secret || tokenData.accessToken) {
                            return tokenData.secret || tokenData.accessToken;
                        }
                    }
                    catch {
                        // Not a JSON token, might be a plain token string
                        if (item.value && item.value.length > 100) {
                            // Tokens are typically long strings
                            return item.value;
                        }
                    }
                }
            }
        }
        // If no token found in localStorage, check cookies for auth tokens
        for (const cookie of storageData.cookies || []) {
            if (cookie.name.includes('token') || cookie.name.includes('auth')) {
                return cookie.value;
            }
        }
        return undefined;
    }
    catch (error) {
        console.error(`Error reading storage state: ${error}`);
        return undefined;
    }
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
 * const check = checkStorageStateExpiration();
 *
 * if (check.expired) {
 *   console.log('Token expired, please re-authenticate');
 * } else if (check.expiresOn) {
 *   const expiryDate = new Date(check.expiresOn * 1000);
 *   console.log(`Token expires at: ${expiryDate}`);
 * }
 * ```
 */
function checkStorageStateExpiration(storagePath) {
    const storageFile = storagePath || storageStatePath();
    if (!fs.existsSync(storageFile)) {
        return { expired: true };
    }
    try {
        const storageData = JSON.parse(fs.readFileSync(storageFile, 'utf-8'));
        const currentTime = Math.floor(Date.now() / 1000);
        let earliestExpiration;
        let foundToken;
        // Check localStorage for MSAL tokens with expiration
        for (const origin of storageData.origins || []) {
            for (const item of origin.localStorage || []) {
                if (item.name.includes('accesstoken') || item.name.includes('msal')) {
                    try {
                        const tokenData = JSON.parse(item.value);
                        if (tokenData.expiresOn || tokenData.expires_on) {
                            const expiresOn = tokenData.expiresOn || tokenData.expires_on;
                            const expirationTime = typeof expiresOn === 'string' ? parseInt(expiresOn, 10) : expiresOn;
                            if (!earliestExpiration || expirationTime < earliestExpiration) {
                                earliestExpiration = expirationTime;
                                foundToken = tokenData.secret || tokenData.accessToken;
                            }
                            // Check if this token is expired
                            if (expirationTime < currentTime) {
                                return {
                                    expired: true,
                                    expiresOn: expirationTime,
                                    token: tokenData.secret || tokenData.accessToken,
                                };
                            }
                        }
                    }
                    catch {
                        // Not a valid JSON token, skip
                    }
                }
            }
        }
        // Check cookies for expiration
        for (const cookie of storageData.cookies || []) {
            if (cookie.expires && cookie.expires > 0) {
                const expiresSeconds = Math.floor(cookie.expires);
                if (expiresSeconds < currentTime) {
                    return { expired: true, expiresOn: expiresSeconds };
                }
                if (!earliestExpiration || expiresSeconds < earliestExpiration) {
                    earliestExpiration = expiresSeconds;
                }
            }
        }
        return {
            expired: false,
            expiresOn: earliestExpiration,
            token: foundToken,
        };
    }
    catch (error) {
        console.error(`Error checking token expiration: ${error}`);
        return { expired: true };
    }
}
/**
 * Validate that required authentication environment variables are set
 *
 * Checks for the presence of required environment variables for authentication.
 *
 * @throws {Error} If required environment variables are missing
 *
 * @example
 * ```typescript
 * try {
 *   checkEnvironmentVariables();
 *   console.log('All required environment variables are set');
 * } catch (error) {
 *   console.error('Missing environment variables:', error.message);
 * }
 * ```
 */
function checkEnvironmentVariables() {
    const required = ['MS_AUTH_EMAIL', 'MS_USER_PASSWORD', 'AZURE_TENANT_ID'];
    const missing = required.filter((varName) => !process.env[varName]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}\n` +
            'Please set these variables in your .env file or environment.');
    }
}
