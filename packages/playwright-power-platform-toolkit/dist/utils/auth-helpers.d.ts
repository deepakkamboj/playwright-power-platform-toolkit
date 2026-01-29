/**
 * Authentication Helper Utilities
 *
 * Utilities for managing authentication state and tokens for Power Platform testing.
 *
 * @module AuthHelpers
 */
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
export declare function storageStatePath(customPath?: string): string;
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
export declare function getStorageStatePath(email: string): string;
/**
 * Storage state structure
 */
export interface StorageState {
    cookies: Array<{
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: 'Strict' | 'Lax' | 'None';
    }>;
    origins: Array<{
        origin: string;
        localStorage: Array<{
            name: string;
            value: string;
        }>;
    }>;
}
/**
 * Token expiration check result
 */
export interface TokenExpirationCheck {
    /** Whether the token has expired */
    expired: boolean;
    /** Expiration timestamp in seconds (if found) */
    expiresOn?: number;
    /** Token string (if found) */
    token?: string;
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
export declare function getAuthToken(storagePath?: string, apiUrl?: string): string | undefined;
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
export declare function checkStorageStateExpiration(storagePath?: string): TokenExpirationCheck;
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
export declare function checkEnvironmentVariables(): void;
