/*!
 * Library index file - exports all public APIs
 */

// Page Object Models
export { PowerAppsPage, AppType } from './pages/PowerAppsPage';

// Locators
export { BaseLocators, LocatorUtils } from './locators/BaseLocators';
export { PowerAppsPageLocators, PowerAppsPageSelectors } from './locators/PowerAppsPageLocators';

// Authentication
export {
  loadAuthConfig,
  getStorageStatePath,
  hasValidAuth,
  clearAuthState,
  authenticateToMicrosoft,
  getAuthState,
  validateAuthConfig,
  type MsAuthConfig,
} from './auth/MsAuthHelper';

// Utilities
export {
  TimeOut,
  waitForCondition,
  scrollToElement,
  formatString,
  randomAlphaNumeric,
  delay,
  retryWithBackoff,
  waitForNetworkIdle,
  dismissTeachingBubbleIfPresent,
  safeFill,
  waitForDetached,
  storageStatePath,
  checkEnvironmentVariables,
  getGrepConfigValue,
  ProcessEnvironmentConfig,
  getProjectRoot,
} from './utils/CommonUtils';

export { ConfigHelper, navigateToUrl } from './utils/ConfigHelper';

// Colors
export { colors } from './utils/colors';

// Test Annotations
export {
  Team,
  teamAnnotation,
  priorityAnnotation,
  customAnnotation,
  combineAnnotations,
} from './utils/TestAnnotations';

// API Testing
export { ApiTestHelper, PowerAppsApiEndpoints, ApiAssertions } from './utils/ApiTestHelper';

// Accessibility Testing
export {
  AccessibilityTestHelper,
  AccessibilityAssertions,
  AccessibilityRules,
  WCAGLevel,
} from './utils/AccessibilityTestHelper';

// Test Logging
export { TestLogger } from './utils/TestLogger';

// API Recording
export {
  ApiRecorder,
  RecordedApiCall,
  ApiRecordingSession,
  ApiRecorderOptions,
} from './utils/ApiRecorder';
