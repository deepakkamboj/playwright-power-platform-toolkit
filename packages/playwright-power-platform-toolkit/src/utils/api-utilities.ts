/**
 * API Testing Utilities for Power Platform
 *
 * This module provides utilities for working with Power Platform APIs including:
 * - Token extraction and management
 * - Authenticated API request contexts
 * - BAP API invoke pattern helpers
 * - ResourceQuery API helpers
 * - Response validation and error handling
 * - Long-running operation polling
 *
 * @module ApiUtilities
 */

import { request } from '@playwright/test';
import { ConfigHelper } from './config';

/**
 * Extract authentication token from storage state
 *
 * Retrieves the Bearer token from the stored authentication state.
 * Optionally filters by API URL to get a token with the correct audience.
 *
 * @param apiUrl - Optional API URL to match token audience
 * @returns Bearer token string
 * @throws {Error} If no authentication token is found
 *
 * @example
 * ```typescript
 * // Extract token for general use
 * const token = extractTokenFromStorage();
 *
 * // Extract token for specific API audience
 * const bapToken = extractTokenFromStorage('https://api.bap.microsoft.com');
 * ```
 */
export function extractTokenFromStorage(apiUrl?: string): string {
  const token = ConfigHelper.getAuthToken(undefined, apiUrl);

  if (!token) {
    throw new Error(
      `No authentication token found. Please ensure you have authenticated via: npm run auth:headful${
        apiUrl ? `\nNote: Token must have correct audience for API: ${apiUrl}` : ''
      }`
    );
  }

  return token;
}

/**
 * Create an authenticated API request context
 *
 * Creates a Playwright APIRequestContext with authentication headers
 * and common configuration for Power Platform APIs.
 *
 * @param token - Bearer token for authentication
 * @param baseUrl - Optional base URL for the API
 * @returns Playwright APIRequestContext configured with authentication
 *
 * @example
 * ```typescript
 * const token = extractTokenFromStorage();
 * const apiContext = await createAuthenticatedApiContext(
 *   token,
 *   'https://api.bap.microsoft.com'
 * );
 *
 * const response = await apiContext.get('/api/endpoint');
 * await apiContext.dispose();
 * ```
 */
export async function createAuthenticatedApiContext(token: string, baseUrl?: string) {
  const context = await request.newContext({
    baseURL: baseUrl,
    extraHTTPHeaders: {
      authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
      'x-ms-user-agent': 'Playwright-Test/1.0.0',
    },
  });

  return context;
}

/**
 * Build BAP API invoke endpoint
 *
 * Constructs the full URL for the BAP API invoke pattern.
 * The BAP API uses a special invoke pattern where the actual API path
 * is passed in the x-ms-path-query header.
 *
 * @param pathQuery - The x-ms-path-query value (API path and query params)
 * @returns Full API endpoint URL for BAP invoke pattern
 *
 * @example
 * ```typescript
 * const endpoint = buildBapApiEndpoint('/providers/Microsoft.PowerApps/apps');
 * // Returns: https://api.bap.microsoft.com/api/invoke
 * ```
 */
export function buildBapApiEndpoint(pathQuery: string): string {
  const baseUrl = ConfigHelper.getBapApiUrl();
  return `${baseUrl}/api/invoke`;
}

/**
 * Create headers for BAP API invoke pattern
 *
 * Creates the required headers for BAP API requests using the invoke pattern.
 * The x-ms-path-query header contains the actual API path and query parameters.
 *
 * @param pathQuery - The x-ms-path-query value (API path and query params)
 * @param token - Bearer authentication token
 * @returns Headers object for BAP API request
 *
 * @example
 * ```typescript
 * const token = extractTokenFromStorage();
 * const headers = createBapApiHeaders(
 *   '/providers/Microsoft.PowerApps/apps?$top=10',
 *   token
 * );
 *
 * const response = await fetch(buildBapApiEndpoint(), {
 *   headers
 * });
 * ```
 */
export function createBapApiHeaders(pathQuery: string, token: string) {
  return {
    authorization: `Bearer ${token}`,
    'x-ms-user-agent': 'Playwright-Test/1.0.0',
    'x-ms-path-query': pathQuery,
    accept: 'application/json',
  };
}

/**
 * Build ResourceQuery API endpoint
 *
 * Constructs the URL for the Power Platform ResourceQuery API.
 * This API is used for querying resources like apps, flows, and connections.
 *
 * @returns ResourceQuery API endpoint URL
 *
 * @example
 * ```typescript
 * const endpoint = buildResourceQueryEndpoint();
 * // Returns: https://make.powerapps.com/api/resourcequery
 * ```
 */
export function buildResourceQueryEndpoint(): string {
  const baseUrl = ConfigHelper.getBaseUrl();
  return `${baseUrl}/api/resourcequery`;
}

/**
 * Query options for ResourceQuery API
 */
export interface QueryOptions {
  /** Number of items to skip (for pagination) */
  skip?: number;
  /** Maximum number of items to return */
  top?: number;
  /** OData filter expression */
  filter?: string;
  /** OData orderBy expression */
  orderBy?: string;
}

/**
 * Create default payload for ResourceQuery API
 *
 * Constructs a query payload for the Power Platform ResourceQuery API
 * with sensible defaults and optional customization.
 *
 * @param options - Optional query customization
 * @param options.skip - Number of items to skip (default: 0)
 * @param options.top - Maximum items to return (default: 50)
 * @param options.filter - OData filter expression (default: '')
 * @param options.orderBy - OData orderBy expression (default: 'properties/displayName asc')
 * @returns Query payload object
 *
 * @example
 * ```typescript
 * // Get first 10 canvas apps
 * const payload = createQueryPayload({
 *   top: 10,
 *   filter: "type eq 'Microsoft.PowerApps/apps'",
 *   orderBy: 'properties/createdTime desc'
 * });
 *
 * const response = await apiContext.post(
 *   buildResourceQueryEndpoint(),
 *   { data: payload }
 * );
 * ```
 */
export function createQueryPayload(options?: QueryOptions) {
  return {
    query: {
      skip: options?.skip ?? 0,
      top: options?.top ?? 50,
      filter: options?.filter ?? '',
      orderBy: options?.orderBy ?? 'properties/displayName asc',
    },
  };
}

/**
 * Extract request tracking ID from response headers
 *
 * Searches for request tracking IDs in common Microsoft API header names.
 * These IDs are useful for troubleshooting and correlating requests.
 *
 * @param headers - Response headers object
 * @returns Request ID or undefined if not found
 *
 * @example
 * ```typescript
 * const response = await apiContext.get('/api/endpoint');
 * const headers = response.headers();
 * const requestId = extractRequestId(headers);
 *
 * if (!response.ok()) {
 *   console.error(`Request failed. Correlation ID: ${requestId}`);
 * }
 * ```
 */
export function extractRequestId(headers: { [key: string]: string }): string | undefined {
  return (
    headers['x-ms-request-id'] ||
    headers['request-id'] ||
    headers['x-request-id'] ||
    headers['x-ms-correlation-id'] ||
    headers['x-ms-correlation-request-id']
  );
}

/**
 * API response validation result
 */
export interface ApiResponseValidation {
  /** Whether the response was successful (2xx status) */
  success: boolean;
  /** HTTP status code */
  status: number;
  /** Request tracking ID if available */
  requestId?: string;
  /** Content-Type header value */
  contentType?: string;
  /** All response headers */
  headers: { [key: string]: string };
  /** Parsed response data (if JSON) */
  data: any;
}

/**
 * Validate API response and extract common fields
 *
 * Validates an API response and extracts commonly needed fields including
 * status code, headers, request ID, and parsed response data.
 *
 * @param response - Playwright APIResponse object
 * @returns Response validation result with extracted fields
 *
 * @example
 * ```typescript
 * const response = await apiContext.get('/api/apps');
 * const validation = await validateApiResponse(response);
 *
 * if (validation.success) {
 *   console.log(`Found ${validation.data.value.length} apps`);
 * } else {
 *   console.error(`Request failed with status ${validation.status}`);
 *   console.error(`Correlation ID: ${validation.requestId}`);
 * }
 * ```
 */
export async function validateApiResponse(response: any): Promise<ApiResponseValidation> {
  const status = response.status();
  const headers = response.headers();
  const requestId = extractRequestId(headers);

  const result: ApiResponseValidation = {
    success: response.ok(),
    status,
    requestId,
    contentType: headers['content-type'],
    headers,
    data: null,
  };

  if (result.success) {
    try {
      result.data = await response.json();
    } catch {
      // Response might not be JSON
    }
  }

  return result;
}

/**
 * Operation polling result
 */
export interface OperationResult {
  /** Whether the operation completed successfully */
  success: boolean;
  /** Operation status data */
  data: any;
}

/**
 * Wait for API operation to complete with polling
 *
 * Polls a long-running operation URL until completion, failure, or timeout.
 * Useful for operations that return an operation URL to check status.
 *
 * @param operationUrl - URL to poll for operation status
 * @param token - Bearer authentication token
 * @param maxAttempts - Maximum polling attempts (default: 30)
 * @param intervalMs - Polling interval in milliseconds (default: 2000)
 * @returns Final operation status
 * @throws {Error} If operation times out
 *
 * @example
 * ```typescript
 * // Start a long-running operation
 * const response = await apiContext.post('/api/operations', {
 *   data: { action: 'deploy' }
 * });
 * const data = await response.json();
 * const operationUrl = data.operationUrl;
 *
 * // Poll until complete
 * const token = extractTokenFromStorage();
 * const result = await pollOperationStatus(
 *   operationUrl,
 *   token,
 *   60,  // Wait up to 2 minutes
 *   2000 // Check every 2 seconds
 * );
 *
 * if (result.success) {
 *   console.log('Operation completed successfully');
 * } else {
 *   console.error('Operation failed:', result.data);
 * }
 * ```
 */
export async function pollOperationStatus(
  operationUrl: string,
  token: string,
  maxAttempts: number = 30,
  intervalMs: number = 2000
): Promise<OperationResult> {
  const context = await createAuthenticatedApiContext(token);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await context.get(operationUrl);
    const data = await response.json();

    if (data.status === 'Succeeded' || data.status === 'Completed') {
      await context.dispose();
      return { success: true, data };
    }

    if (data.status === 'Failed' || data.status === 'Canceled') {
      await context.dispose();
      return { success: false, data };
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  await context.dispose();
  throw new Error(`Operation polling timed out after ${maxAttempts} attempts`);
}
