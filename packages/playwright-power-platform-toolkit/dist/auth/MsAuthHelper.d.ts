/*!
 * Microsoft Authentication Helper for Power Apps
 * Based on playwright-ms-auth package
 */
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
export declare function loadAuthConfig(): MsAuthConfig;
/**
 * Get the storage state file path for authenticated session
 * Uses playwright-ms-auth's getStorageStatePath function
 */
export declare function getStorageStatePath(email?: string): string;
/**
 * Check if valid authentication exists
 */
export declare function hasValidAuth(email?: string): boolean;
/**
 * Clear saved authentication state
 */
export declare function clearAuthState(email?: string): void;
/**
 * Authenticate to Microsoft using playwright-ms-auth
 *
 * @param url - URL to authenticate to (e.g., Power Apps maker portal)
 * @param headless - Whether to run browser in headless mode
 */
export declare function authenticateToMicrosoft(url: string, headless?: boolean): Promise<void>;
/**
 * Helper to get authentication state for Playwright BrowserContext
 */
export declare function getAuthState(): Promise<{
    storageState: string;
}>;
/**
 * Validate authentication configuration
 */
export declare function validateAuthConfig(): void;
