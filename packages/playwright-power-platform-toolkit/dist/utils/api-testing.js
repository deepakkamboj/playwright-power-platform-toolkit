"use strict";
/**
 * API Testing Utilities for Power Platform
 * Helpers for testing Power Apps APIs, Dataverse, and Power Platform services
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAssertions = exports.ApiTestHelper = exports.PowerAppsApiEndpoints = void 0;
const test_1 = require("@playwright/test");
const config_1 = require("./config");
/**
 * Power Apps API endpoints
 */
exports.PowerAppsApiEndpoints = {
    /** Power Apps API endpoint */
    Apps: '/api/apps',
    /** Solutions API endpoint */
    Solutions: '/api/solutions',
    /** Environments API endpoint */
    Environments: '/api/environments',
    /** Connectors API endpoint */
    Connectors: '/api/connectors',
    /** Flows API endpoint */
    Flows: '/api/flows',
    /** Dataverse endpoints */
    Dataverse: {
        /** Entity definitions endpoint */
        Tables: '/api/data/v9.2/EntityDefinitions',
        /**
         * Get records endpoint for a table
         * @param tableName - Logical name of the table
         * @returns Records endpoint URL
         */
        Records: (tableName) => `/api/data/v9.2/${tableName}`,
        /** Metadata endpoint */
        Metadata: '/api/data/v9.2/$metadata',
    },
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
class ApiTestHelper {
    /**
     * Create a new API test helper
     *
     * @param request - Playwright API request context
     * @param baseUrl - Optional base URL (defaults to ConfigHelper.getBaseUrl())
     */
    constructor(request, baseUrl) {
        this.request = request;
        this.baseUrl = baseUrl || config_1.ConfigHelper.getBaseUrl();
    }
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
    async get(endpoint, options) {
        const url = this.buildUrl(endpoint, options?.params);
        return await this.request.get(url);
    }
    /**
     * Make a POST request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @param data - Request body data
     * @returns API response
     */
    async post(endpoint, data) {
        const url = this.buildUrl(endpoint);
        return await this.request.post(url, { data });
    }
    /**
     * Make a PATCH request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @param data - Request body data
     * @returns API response
     */
    async patch(endpoint, data) {
        const url = this.buildUrl(endpoint);
        return await this.request.patch(url, { data });
    }
    /**
     * Make a DELETE request to Power Apps API
     *
     * @param endpoint - API endpoint path
     * @returns API response
     */
    async delete(endpoint) {
        const url = this.buildUrl(endpoint);
        return await this.request.delete(url);
    }
    /**
     * Build full URL with query parameters
     * @private
     */
    buildUrl(endpoint, params) {
        const url = new URL(endpoint, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        return url.toString();
    }
    /**
     * Assert API response status
     *
     * @param response - API response
     * @param expectedStatus - Expected HTTP status code
     */
    async assertStatus(response, expectedStatus) {
        (0, test_1.expect)(response.status()).toBe(expectedStatus);
    }
    /**
     * Assert API response contains data
     *
     * @param response - API response
     * @param expectedData - Expected data object
     */
    async assertResponseContains(response, expectedData) {
        const responseBody = await response.json();
        (0, test_1.expect)(responseBody).toMatchObject(expectedData);
    }
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
    async getDataverseRecords(tableName, options) {
        const params = {};
        if (options?.select) {
            params['$select'] = options.select.join(',');
        }
        if (options?.filter) {
            params['$filter'] = options.filter;
        }
        if (options?.top) {
            params['$top'] = options.top.toString();
        }
        return await this.get(exports.PowerAppsApiEndpoints.Dataverse.Records(tableName), { params });
    }
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
    async createDataverseRecord(tableName, data) {
        return await this.post(exports.PowerAppsApiEndpoints.Dataverse.Records(tableName), data);
    }
    /**
     * Update a Dataverse record
     *
     * @param tableName - Logical name of the table
     * @param recordId - ID of the record to update
     * @param data - Updated record data
     * @returns API response
     */
    async updateDataverseRecord(tableName, recordId, data) {
        const endpoint = `${exports.PowerAppsApiEndpoints.Dataverse.Records(tableName)}(${recordId})`;
        return await this.patch(endpoint, data);
    }
    /**
     * Delete a Dataverse record
     *
     * @param tableName - Logical name of the table
     * @param recordId - ID of the record to delete
     * @returns API response
     */
    async deleteDataverseRecord(tableName, recordId) {
        const endpoint = `${exports.PowerAppsApiEndpoints.Dataverse.Records(tableName)}(${recordId})`;
        return await this.delete(endpoint);
    }
    /**
     * Validate response schema
     *
     * @param response - API response
     * @param schema - Expected schema with required fields
     */
    async validateSchema(response, schema) {
        const responseBody = await response.json();
        (0, test_1.expect)(responseBody).toBeDefined();
        if (schema.required) {
            schema.required.forEach((field) => {
                (0, test_1.expect)(responseBody).toHaveProperty(field);
            });
        }
    }
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
    async measureResponseTime(apiCall) {
        const startTime = Date.now();
        const response = await apiCall();
        const duration = Date.now() - startTime;
        return { response, duration };
    }
    /**
     * Assert API performance is within threshold
     *
     * @param duration - Actual duration in milliseconds
     * @param maxDuration - Maximum allowed duration in milliseconds
     */
    assertPerformance(duration, maxDuration) {
        (0, test_1.expect)(duration).toBeLessThan(maxDuration);
    }
}
exports.ApiTestHelper = ApiTestHelper;
/**
 * Common API test assertions
 */
class ApiAssertions {
    /**
     * Assert successful response (2xx status code)
     *
     * @param response - API response
     */
    static async assertSuccess(response) {
        (0, test_1.expect)(response.ok()).toBeTruthy();
    }
    /**
     * Assert response status code
     *
     * @param response - API response
     * @param statusCode - Expected HTTP status code
     */
    static async assertStatusCode(response, statusCode) {
        (0, test_1.expect)(response.status()).toBe(statusCode);
    }
    /**
     * Assert response has expected headers
     *
     * @param response - API response
     * @param headers - Expected headers as key-value pairs
     */
    static async assertHeaders(response, headers) {
        const responseHeaders = response.headers();
        Object.entries(headers).forEach(([key, value]) => {
            (0, test_1.expect)(responseHeaders[key.toLowerCase()]).toBe(value);
        });
    }
    /**
     * Assert response time is within threshold
     *
     * @param duration - Actual duration in milliseconds
     * @param maxMs - Maximum allowed duration in milliseconds
     */
    static assertResponseTime(duration, maxMs) {
        (0, test_1.expect)(duration).toBeLessThan(maxMs);
    }
    /**
     * Assert JSON response structure
     *
     * @param response - API response
     * @param structure - Expected structure
     */
    static async assertJsonStructure(response, structure) {
        const json = await response.json();
        (0, test_1.expect)(json).toMatchObject(structure);
    }
}
exports.ApiAssertions = ApiAssertions;
