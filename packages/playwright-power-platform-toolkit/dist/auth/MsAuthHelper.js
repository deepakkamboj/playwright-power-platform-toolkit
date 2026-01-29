"use strict";
/*!
 * Microsoft Authentication Helper for Power Apps
 * Based on playwright-ms-auth package
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
exports.loadAuthConfig = loadAuthConfig;
exports.getStorageStatePath = getStorageStatePath;
exports.hasValidAuth = hasValidAuth;
exports.clearAuthState = clearAuthState;
exports.authenticateToMicrosoft = authenticateToMicrosoft;
exports.getAuthState = getAuthState;
exports.validateAuthConfig = validateAuthConfig;
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
const playwright_ms_auth_1 = require("playwright-ms-auth");
dotenv.config();
/**
 * Load MS Auth configuration from environment variables
 */
function loadAuthConfig() {
    const config = (0, playwright_ms_auth_1.loadConfigFromEnv)();
    return config;
}
/**
 * Get the storage state file path for authenticated session
 * Uses playwright-ms-auth's getStorageStatePath function
 */
function getStorageStatePath(email) {
    const config = (0, playwright_ms_auth_1.loadConfigFromEnv)();
    const userEmail = email || config.email;
    return (0, playwright_ms_auth_1.getStorageStatePath)(userEmail);
}
/**
 * Check if valid authentication exists
 */
function hasValidAuth(email) {
    const storagePath = getStorageStatePath(email);
    return fs.existsSync(storagePath);
}
/**
 * Clear saved authentication state
 */
function clearAuthState(email) {
    const storagePath = getStorageStatePath(email);
    if (fs.existsSync(storagePath)) {
        fs.unlinkSync(storagePath);
        console.log(`✅ Cleared authentication state: ${storagePath}`);
    }
    else {
        console.log('ℹ️ No authentication state to clear');
    }
    // Also clear screenshots directory if it exists
    const authBaseDir = (0, playwright_ms_auth_1.getAuthBaseDir)();
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
async function authenticateToMicrosoft(url, headless = true) {
    console.log('🔐 Starting Microsoft authentication...');
    console.log(`🌐 URL: ${url}`);
    console.log(`👁️  Browser mode: ${headless ? 'headless' : 'headful'}`);
    try {
        // Load configuration from environment variables
        const config = (0, playwright_ms_auth_1.loadConfigFromEnv)();
        config.headless = headless;
        console.log('📧 Email:', config.email);
        console.log('🔑 Credential Type:', config.credentialType || 'password');
        // Perform authentication - saves to ~/.playwright-ms-auth/state-{email}.json
        await (0, playwright_ms_auth_1.authenticate)(config, url);
        const storagePath = (0, playwright_ms_auth_1.getStorageStatePath)(config.email);
        console.log('✅ Authentication successful!');
        console.log(`📁 Auth state saved to: ${storagePath}`);
    }
    catch (error) {
        console.error('❌ Authentication failed:', error?.message || error);
        throw error;
    }
}
/**
 * Helper to get authentication state for Playwright BrowserContext
 */
async function getAuthState() {
    const config = (0, playwright_ms_auth_1.loadConfigFromEnv)();
    const storagePath = getStorageStatePath(config.email);
    if (!fs.existsSync(storagePath)) {
        throw new Error(`Authentication state not found at ${storagePath}. ` +
            'Please run authentication first: npm run auth');
    }
    return { storageState: storagePath };
}
/**
 * Validate authentication configuration
 */
function validateAuthConfig() {
    const config = (0, playwright_ms_auth_1.loadConfigFromEnv)();
    const credentialType = config.credentialType || 'password';
    const missing = [];
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
    }
    else if (credentialType === 'password') {
        if (!process.env.MS_USER_PASSWORD) {
            missing.push('MS_USER_PASSWORD');
        }
    }
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}. ` +
            'Please check your .env file.');
    }
}
