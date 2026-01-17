/*!
 * API Testing Utilities for Power Apps
 * Helpers for testing Power Apps APIs, Dataverse, and Power Platform services
 */

import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { ConfigHelper } from './ConfigHelper';

/**
 * Power Apps API endpoints
 */
export const PowerAppsApiEndpoints = {
  Apps: '/api/apps',
  Solutions: '/api/solutions',
  Environments: '/api/environments',
  Connectors: '/api/connectors',
  Flows: '/api/flows',
  // Dataverse endpoints
  Dataverse: {
    Tables: '/api/data/v9.2/EntityDefinitions',
    Records: (tableName: string) => `/api/data/v9.2/${tableName}`,
    Metadata: '/api/data/v9.2/$metadata',
  },
};

/**
 * API Test Helper for Power Apps and Power Platform
 */
export class ApiTestHelper {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl?: string) {
    this.request = request;
    this.baseUrl = baseUrl || ConfigHelper.getBaseUrl();
  }

  /**
   * Make a GET request to Power Apps API
   */
  async get(endpoint: string, options?: { params?: Record<string, string> }): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options?.params);
    return await this.request.get(url);
  }

  /**
   * Make a POST request to Power Apps API
   */
  async post(endpoint: string, data: any): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    return await this.request.post(url, { data });
  }

  /**
   * Make a PATCH request to Power Apps API
   */
  async patch(endpoint: string, data: any): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    return await this.request.patch(url, { data });
  }

  /**
   * Make a DELETE request to Power Apps API
   */
  async delete(endpoint: string): Promise<APIResponse> {
    const url = this.buildUrl(endpoint);
    return await this.request.delete(url);
  }

  /**
   * Build full URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
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
   */
  async assertStatus(response: APIResponse, expectedStatus: number): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Assert API response contains data
   */
  async assertResponseContains(response: APIResponse, expectedData: any): Promise<void> {
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(expectedData);
  }

  /**
   * Get Dataverse table records
   */
  async getDataverseRecords(tableName: string, options?: {
    select?: string[];
    filter?: string;
    top?: number;
  }): Promise<APIResponse> {
    const params: Record<string, string> = {};
    
    if (options?.select) {
      params['$select'] = options.select.join(',');
    }
    if (options?.filter) {
      params['$filter'] = options.filter;
    }
    if (options?.top) {
      params['$top'] = options.top.toString();
    }

    return await this.get(PowerAppsApiEndpoints.Dataverse.Records(tableName), { params });
  }

  /**
   * Create Dataverse record
   */
  async createDataverseRecord(tableName: string, data: any): Promise<APIResponse> {
    return await this.post(PowerAppsApiEndpoints.Dataverse.Records(tableName), data);
  }

  /**
   * Update Dataverse record
   */
  async updateDataverseRecord(tableName: string, recordId: string, data: any): Promise<APIResponse> {
    const endpoint = `${PowerAppsApiEndpoints.Dataverse.Records(tableName)}(${recordId})`;
    return await this.patch(endpoint, data);
  }

  /**
   * Delete Dataverse record
   */
  async deleteDataverseRecord(tableName: string, recordId: string): Promise<APIResponse> {
    const endpoint = `${PowerAppsApiEndpoints.Dataverse.Records(tableName)}(${recordId})`;
    return await this.delete(endpoint);
  }

  /**
   * Validate response schema
   */
  async validateSchema(response: APIResponse, schema: any): Promise<void> {
    const responseBody = await response.json();
    // Basic schema validation - can be extended with ajv or joi
    expect(responseBody).toBeDefined();
    
    if (schema.required) {
      schema.required.forEach((field: string) => {
        expect(responseBody).toHaveProperty(field);
      });
    }
  }

  /**
   * Measure API response time
   */
  async measureResponseTime(apiCall: () => Promise<APIResponse>): Promise<{
    response: APIResponse;
    duration: number;
  }> {
    const startTime = Date.now();
    const response = await apiCall();
    const duration = Date.now() - startTime;
    
    return { response, duration };
  }

  /**
   * Assert API performance
   */
  assertPerformance(duration: number, maxDuration: number): void {
    expect(duration).toBeLessThan(maxDuration);
  }
}

/**
 * Common API test assertions
 */
export class ApiAssertions {
  /**
   * Assert successful response (2xx)
   */
  static async assertSuccess(response: APIResponse): Promise<void> {
    expect(response.ok()).toBeTruthy();
  }

  /**
   * Assert response status code
   */
  static async assertStatusCode(response: APIResponse, statusCode: number): Promise<void> {
    expect(response.status()).toBe(statusCode);
  }

  /**
   * Assert response has expected headers
   */
  static async assertHeaders(response: APIResponse, headers: Record<string, string>): Promise<void> {
    const responseHeaders = response.headers();
    Object.entries(headers).forEach(([key, value]) => {
      expect(responseHeaders[key.toLowerCase()]).toBe(value);
    });
  }

  /**
   * Assert response time is within threshold
   */
  static assertResponseTime(duration: number, maxMs: number): void {
    expect(duration).toBeLessThan(maxMs);
  }

  /**
   * Assert JSON response structure
   */
  static async assertJsonStructure(response: APIResponse, structure: any): Promise<void> {
    const json = await response.json();
    expect(json).toMatchObject(structure);
  }
}
