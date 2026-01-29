/**
 * Test Configuration Constants
 * Default values for test configuration
 */

/**
 * Default Power Apps base URL for tests
 */
export const DEFAULT_POWER_APPS_BASE_URL = 'https://make.test.powerapps.com';

/**
 * Default Canvas Designer URL for tests
 */
export const DEFAULT_CANVAS_DESIGNER_URL = 'https://apps.test.powerapps.com/';

/**
 * Default BAP API URL for tests
 */
export const DEFAULT_BAP_API_URL = 'https://api.bap.microsoft.com';

/**
 * Get the base URL from environment or use default
 */
export function getBaseUrl(): string {
  return process.env.POWER_APPS_BASE_URL || DEFAULT_POWER_APPS_BASE_URL;
}

/**
 * Get Canvas app ID from environment
 */
export function getCanvasAppId(): string | undefined {
  return process.env.CANVAS_APP_ID;
}

/**
 * Get Model-Driven app ID from environment
 */
export function getModelAppId(): string | undefined {
  return process.env.MODEL_APP_ID;
}
