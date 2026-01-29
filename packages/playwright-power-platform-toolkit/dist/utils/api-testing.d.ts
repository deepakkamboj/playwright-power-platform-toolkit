/**
 * API Testing Utilities for Power Platform
 * Helpers for testing Power Apps APIs, Dataverse, and Power Platform services
 *
 * @packageDocumentation
 */
import { APIRequestContext, APIResponse } from '@playwright/test';
/**
 * Power Apps API endpoints
 */
export declare const PowerAppsApiEndpoints: {
    /** Power Apps API endpoint */
    Apps: string;
    /** Solutions API endpoint */
    Solutions: string;
    /** Environments API endpoint */
    Environments: string;
    /** Connectors API endpoint */
    Connectors: string;
    /** Flows API endpoint */
    Flows: string;
    /** Dataverse endpoints */
    Dataverse: {
        /** Entity definitions endpoint */
        Tables: string;
        /**
         * Get records endpoint for a table
         * @param tableName - Logical name of the table
         * @returns Records endpoint URL
         */
        Records: (tableName: string) => string;
        /** Metadata endpoint */
        Metadata: string;
    };
};
/**
 * API Test Helper for Power Apps and Power Platform
 *
 * @example
 * ```typescript
 * import { test, request } from '@playwright/test';
 * import { ApiTestHelper } from '@playwright-power-platform/toolkit';
 *
 * test('API test', async () => {
 *   const apiContext = await request.newContext({
 *     baseURL: 'https://yourorg.crm.dynamics.com',
 *     extraHTTPHeaders: {
 *       'Authorization': `Bearer ${token}`,
 *     },
 *   });
 *
 *   const apiHelper = new ApiTestHelper(apiContext);
 *   const response = await apiHelper.getDataverseRecords('accounts');
 *   await apiHelper.assertStatus(response, 200);
 * });
 * ```
 */
export declare class ApiTestHelper {
    private request;
    private baseUrl;
    /**
     * Create a new API test helper
     *
     * @param request - Playwright API request context
     * @param baseUrl - Optional base URL (defaults to ConfigHelper.getBaseUrl())
     */
    constructor(request: APIRequestContext, baseUrl?: string);
    /**
     * Make a GET request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @param options - Optional query parameters
     * @returns API response
     *
     * @example
     * ```typescript
     * const response = await apiHelper.get('/api/apps', {
     *   params: { '$top': '10' }
     * });
     * ```
     */
    get(endpoint: string, options?: {
        params?: Record<string, string>;
    }): Promise<APIResponse>;
    /**
     * Make a POST request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @param data - Request body data
     * @returns API response
     */
    post(endpoint: string, data: any): Promise<APIResponse>;
    /**
     * Make a PATCH request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @param data - Request body data
     * @returns API response
     */
    patch(endpoint: string, data: any): Promise<APIResponse>;
    /**
     * Make a DELETE request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @returns API response
     */
    delete(endpoint: string): Promise<APIResponse>;
    /**
     * Build full URL with query parameters
     * @private
     */
    private buildUrl;
    /**
     * Assert API response status
     *
     * @param response - API response
     * @param expectedStatus - Expected HTTP status code
     */
    assertStatus(response: APIResponse, expectedStatus: number): Promise<void>;
    /**
     * Assert API response contains data
     *
     * @param response - API response
     * @param expectedData - Expected data object
     */
    assertResponseContains(response: APIResponse, expectedData: any): Promise<void>;
    /**
     * Get Dataverse table records with OData query options
     *
     * @param tableName - Logical name of the table (e.g., 'accounts', 'contacts')
     * @param options - OData query options
     * @param options.select - Fields to select
     * @param options.filter - OData filter expression
     * @param options.top - Number of records to return
     * @returns API response
     *
     * @example
     * ```typescript
     * const response = await apiHelper.getDataverseRecords('accounts', {
     *   select: ['name', 'accountid'],
     *   filter: "name eq 'Contoso'",
     *   top: 10
     * });
     * ```
     */
    getDataverseRecords(tableName: string, options?: {
        select?: string[];
        filter?: string;
        top?: number;
    }): Promise<APIResponse>;
    /**
     * Create a Dataverse record
     *
     * @param tableName - Logical name of the table
     * @param data - Record data
     * @returns API response
     *
     * @example
     * ```typescript
     * const response = await apiHelper.createDataverseRecord('accounts', {
     *   name: 'Contoso Ltd',
     *   telephone1: '555-0100'
     * });
     * ```
     */
    createDataverseRecord(tableName: string, data: any): Promise<APIResponse>;
    /**
     * Update a Dataverse record
     *
     * @param tableName - Logical name of the table
     * @param recordId - ID of the record to update
     * @param data - Updated record data
     * @returns API response
     */
    updateDataverseRecord(tableName: string, recordId: string, data: any): Promise<APIResponse>;
    /**
     * Delete a Dataverse record
     *
     * @param tableName - Logical name of the table
     * @param recordId - ID of the record to delete
     * @returns API response
     */
    deleteDataverseRecord(tableName: string, recordId: string): Promise<APIResponse>;
    /**
     * Validate response schema
     *
     * @param response - API response
     * @param schema - Expected schema with required fields
     */
    validateSchema(response: APIResponse, schema: {
        required?: string[];
    }): Promise<void>;
    /**
     * Measure API response time
     *
     * @param apiCall - Function that makes the API call
     * @returns Response and duration in milliseconds
     *
     * @example
     * ```typescript
     * const { response, duration } = await apiHelper.measureResponseTime(
     *   () => apiHelper.getDataverseRecords('accounts')
     * );
     * console.log(`API call took ${duration}ms`);
     * ```
     */
    measureResponseTime(apiCall: () => Promise<APIResponse>): Promise<{
        response: APIResponse;
        duration: number;
    }>;
    /**
     * Assert API performance is within threshold
     *
     * @param duration - Actual duration in milliseconds
     * @param maxDuration - Maximum allowed duration in milliseconds
     */
    assertPerformance(duration: number, maxDuration: number): void;
}
/**
 * Common API test assertions
 */
export declare class ApiAssertions {
    /**
     * Assert successful response (2xx status code)
     *
     * @param response - API response
     */
    static assertSuccess(response: APIResponse): Promise<void>;
    /**
     * Assert response status code
     *
     * @param response - API response
     * @param statusCode - Expected HTTP status code
     */
    static assertStatusCode(response: APIResponse, statusCode: number): Promise<void>;
    /**
     * Assert response has expected headers
     *
     * @param response - API response
     * @param headers - Expected headers as key-value pairs
     */
    static assertHeaders(response: APIResponse, headers: Record<string, string>): Promise<void>;
    /**
     * Assert response time is within threshold
     *
     * @param duration - Actual duration in milliseconds
     * @param maxMs - Maximum allowed duration in milliseconds
     */
    static assertResponseTime(duration: number, maxMs: number): void;
    /**
     * Assert JSON response structure
     *
     * @param response - API response
     * @param structure - Expected structure
     */
    static assertJsonStructure(response: APIResponse, structure: any): Promise<void>;
}
