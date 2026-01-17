/*!
 * API Recorder Utility
 * Records API calls from Power Apps pages including payloads, responses, and headers
 * Generates JSON that can be used to create API tests
 */

import { Page, Request, Response, Route } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { TestLogger } from './TestLogger';

/**
 * Recorded API call information
 */
export interface RecordedApiCall {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  requestBody?: any;
  statusCode?: number;
  statusText?: string;
  responseHeaders?: Record<string, string>;
  responseBody?: any;
  duration?: number;
  resourceType: string;
}

/**
 * API Recording session
 */
export interface ApiRecordingSession {
  sessionId: string;
  startTime: string;
  endTime?: string;
  baseUrl: string;
  recordedCalls: RecordedApiCall[];
  metadata?: {
    pageTitle?: string;
    pageUrl?: string;
    userAgent?: string;
  };
}

/**
 * Options for API recording
 */
export interface ApiRecorderOptions {
  /** Filter URLs to record (regex pattern) */
  urlFilter?: RegExp;
  /** Include request headers */
  includeRequestHeaders?: boolean;
  /** Include response headers */
  includeResponseHeaders?: boolean;
  /** Include request body */
  includeRequestBody?: boolean;
  /** Include response body */
  includeResponseBody?: boolean;
  /** Maximum response body size to record (in bytes) */
  maxResponseBodySize?: number;
  /** Resource types to record */
  resourceTypes?: string[];
  /** Output directory for recordings */
  outputDir?: string;
}

/**
 * API Recorder - Captures API calls from Power Apps pages
 *
 * Usage:
 * ```typescript
 * const recorder = new ApiRecorder(page, {
 *   urlFilter: /api\.powerapps\.com|api\.bap\.microsoft\.com/,
 *   resourceTypes: ['xhr', 'fetch']
 * });
 *
 * await recorder.startRecording();
 * // Perform actions on the page
 * await recorder.stopRecording();
 * await recorder.saveToFile('recorded-apis.json');
 * ```
 */
export class ApiRecorder {
  private page: Page;
  private options: ApiRecorderOptions;
  private recordedCalls: RecordedApiCall[] = [];
  private isRecording: boolean = false;
  private sessionId: string;
  private startTime?: Date;
  private requestTimestamps: Map<string, number> = new Map();

  constructor(page: Page, options: ApiRecorderOptions = {}) {
    this.page = page;
    this.sessionId = `session_${Date.now()}`;

    // Default options
    this.options = {
      includeRequestHeaders: true,
      includeResponseHeaders: true,
      includeRequestBody: true,
      includeResponseBody: true,
      maxResponseBodySize: 1024 * 1024, // 1MB
      resourceTypes: ['xhr', 'fetch'],
      outputDir: '.playwright-test-results/api-recordings',
      ...options,
    };
  }

  /**
   * Start recording API calls
   */
  async startRecording(): Promise<void> {
    if (this.isRecording) {
      TestLogger.warning('API recording already in progress');
      return;
    }

    this.isRecording = true;
    this.startTime = new Date();
    this.recordedCalls = [];
    this.requestTimestamps.clear();

    TestLogger.info('Starting API recording...');

    // Listen to all requests
    this.page.on('request', this.handleRequest.bind(this));

    // Listen to all responses
    this.page.on('response', this.handleResponse.bind(this));
  }

  /**
   * Stop recording API calls
   */
  async stopRecording(): Promise<void> {
    if (!this.isRecording) {
      TestLogger.warning('No active recording to stop');
      return;
    }

    this.isRecording = false;

    // Remove listeners
    this.page.off('request', this.handleRequest.bind(this));
    this.page.off('response', this.handleResponse.bind(this));

    TestLogger.info(`API recording stopped. Captured ${this.recordedCalls.length} calls`);
  }

  /**
   * Handle request event
   */
  private async handleRequest(request: Request): Promise<void> {
    if (!this.shouldRecordRequest(request)) {
      return;
    }

    const requestId = this.generateRequestId(request);
    this.requestTimestamps.set(requestId, Date.now());

    const recordedCall: RecordedApiCall = {
      id: requestId,
      timestamp: new Date().toISOString(),
      method: request.method(),
      url: request.url(),
      headers: this.options.includeRequestHeaders ? request.headers() : {},
      resourceType: request.resourceType(),
    };

    // Capture request body for POST/PUT/PATCH
    if (this.options.includeRequestBody && ['POST', 'PUT', 'PATCH'].includes(request.method())) {
      try {
        const postData = request.postData();
        if (postData) {
          recordedCall.requestBody = this.parseBody(postData);
        }
      } catch (error) {
        TestLogger.debug(`Could not parse request body: ${error}`);
      }
    }

    this.recordedCalls.push(recordedCall);
  }

  /**
   * Handle response event
   */
  private async handleResponse(response: Response): Promise<void> {
    const request = response.request();

    if (!this.shouldRecordRequest(request)) {
      return;
    }

    const requestId = this.generateRequestId(request);
    const recordedCall = this.recordedCalls.find((call) => call.id === requestId);

    if (!recordedCall) {
      return;
    }

    // Calculate duration
    const startTime = this.requestTimestamps.get(requestId);
    if (startTime) {
      recordedCall.duration = Date.now() - startTime;
      this.requestTimestamps.delete(requestId);
    }

    // Add response details
    recordedCall.statusCode = response.status();
    recordedCall.statusText = response.statusText();

    if (this.options.includeResponseHeaders) {
      recordedCall.responseHeaders = response.headers();
    }

    // Capture response body
    if (this.options.includeResponseBody) {
      try {
        const body = await response.body();

        // Check size limit
        if (this.options.maxResponseBodySize && body.length > this.options.maxResponseBodySize) {
          recordedCall.responseBody = `[Response body too large: ${body.length} bytes]`;
        } else {
          const bodyText = body.toString('utf-8');
          recordedCall.responseBody = this.parseBody(bodyText);
        }
      } catch (error) {
        TestLogger.debug(`Could not capture response body: ${error}`);
        recordedCall.responseBody = '[Could not capture response body]';
      }
    }
  }

  /**
   * Check if request should be recorded
   */
  private shouldRecordRequest(request: Request): boolean {
    // Check resource type
    if (
      this.options.resourceTypes &&
      !this.options.resourceTypes.includes(request.resourceType())
    ) {
      return false;
    }

    // Check URL filter
    if (this.options.urlFilter && !this.options.urlFilter.test(request.url())) {
      return false;
    }

    return true;
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(request: Request): string {
    return `${request.method()}_${request.url()}_${Date.now()}`;
  }

  /**
   * Parse body (JSON or text)
   */
  private parseBody(body: string): any {
    try {
      return JSON.parse(body);
    } catch {
      return body;
    }
  }

  /**
   * Get recorded calls
   */
  getRecordedCalls(): RecordedApiCall[] {
    return this.recordedCalls;
  }

  /**
   * Get recording session
   */
  async getSession(): Promise<ApiRecordingSession> {
    const metadata = {
      pageTitle: await this.page.title(),
      pageUrl: this.page.url(),
      userAgent: await this.page.evaluate(() => navigator.userAgent),
    };

    return {
      sessionId: this.sessionId,
      startTime: this.startTime?.toISOString() || new Date().toISOString(),
      endTime: new Date().toISOString(),
      baseUrl: new URL(this.page.url()).origin,
      recordedCalls: this.recordedCalls,
      metadata,
    };
  }

  /**
   * Save recorded calls to JSON file
   */
  async saveToFile(filename?: string): Promise<string> {
    const session = await this.getSession();

    // Ensure output directory exists
    const outputDir = this.options.outputDir!;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate filename if not provided
    const outputFile = filename || `api-recording-${this.sessionId}.json`;
    const filePath = path.join(outputDir, outputFile);

    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(session, null, 2), 'utf-8');

    TestLogger.success(`API recording saved to: ${filePath}`);
    TestLogger.data('Total calls recorded', this.recordedCalls.length);

    return filePath;
  }

  /**
   * Filter recorded calls by URL pattern
   */
  filterByUrl(pattern: RegExp): RecordedApiCall[] {
    return this.recordedCalls.filter((call) => pattern.test(call.url));
  }

  /**
   * Filter recorded calls by method
   */
  filterByMethod(method: string): RecordedApiCall[] {
    return this.recordedCalls.filter((call) => call.method === method.toUpperCase());
  }

  /**
   * Filter recorded calls by status code
   */
  filterByStatus(statusCode: number): RecordedApiCall[] {
    return this.recordedCalls.filter((call) => call.statusCode === statusCode);
  }

  /**
   * Generate Playwright test code from recorded calls
   */
  async generateTestCode(options?: {
    testName?: string;
    includeAssertions?: boolean;
    useTestSteps?: boolean;
  }): Promise<string> {
    const testName = options?.testName || 'Generated API test';
    const useAssertions = options?.includeAssertions !== false;
    const useSteps = options?.useTestSteps !== false;

    let testCode = `import { test, expect } from '@playwright/test';\n`;
    testCode += `import { ApiTestHelper, ApiAssertions } from '../src';\n\n`;
    testCode += `test('${testName}', async ({ request }) => {\n`;
    testCode += `  const apiHelper = new ApiTestHelper(request, {\n`;
    testCode += `    baseURL: '${new URL(this.page.url()).origin}',\n`;
    testCode += `  });\n\n`;

    for (let i = 0; i < this.recordedCalls.length; i++) {
      const call = this.recordedCalls[i];
      const stepName = `${call.method} ${new URL(call.url).pathname}`;

      if (useSteps) {
        testCode += `  await test.step('${stepName}', async () => {\n`;
      }

      const url = new URL(call.url);
      const endpoint = url.pathname + url.search;

      switch (call.method) {
        case 'GET':
          testCode += `    const response${i} = await apiHelper.get('${endpoint}');\n`;
          break;
        case 'POST':
          testCode += `    const response${i} = await apiHelper.post('${endpoint}', ${JSON.stringify(call.requestBody, null, 2)});\n`;
          break;
        case 'PUT':
          testCode += `    const response${i} = await apiHelper.put('${endpoint}', ${JSON.stringify(call.requestBody, null, 2)});\n`;
          break;
        case 'PATCH':
          testCode += `    const response${i} = await apiHelper.patch('${endpoint}', ${JSON.stringify(call.requestBody, null, 2)});\n`;
          break;
        case 'DELETE':
          testCode += `    const response${i} = await apiHelper.delete('${endpoint}');\n`;
          break;
      }

      if (useAssertions && call.statusCode) {
        testCode += `    await ApiAssertions.assertStatusCode(response${i}, ${call.statusCode});\n`;
      }

      if (useSteps) {
        testCode += `  });\n\n`;
      } else {
        testCode += `\n`;
      }
    }

    testCode += `});\n`;

    return testCode;
  }

  /**
   * Save generated test code to file
   */
  async saveTestCode(
    filename?: string,
    options?: {
      testName?: string;
      includeAssertions?: boolean;
      useTestSteps?: boolean;
    }
  ): Promise<string> {
    const testCode = await this.generateTestCode(options);

    const outputDir = this.options.outputDir!;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFile = filename || `generated-test-${this.sessionId}.spec.ts`;
    const filePath = path.join(outputDir, outputFile);

    fs.writeFileSync(filePath, testCode, 'utf-8');

    TestLogger.success(`Test code saved to: ${filePath}`);

    return filePath;
  }

  /**
   * Get statistics about recorded calls
   */
  getStatistics(): {
    totalCalls: number;
    byMethod: Record<string, number>;
    byStatus: Record<number, number>;
    avgDuration: number;
    totalDuration: number;
  } {
    const byMethod: Record<string, number> = {};
    const byStatus: Record<number, number> = {};
    let totalDuration = 0;
    let callsWithDuration = 0;

    for (const call of this.recordedCalls) {
      // Count by method
      byMethod[call.method] = (byMethod[call.method] || 0) + 1;

      // Count by status
      if (call.statusCode) {
        byStatus[call.statusCode] = (byStatus[call.statusCode] || 0) + 1;
      }

      // Calculate duration
      if (call.duration) {
        totalDuration += call.duration;
        callsWithDuration++;
      }
    }

    return {
      totalCalls: this.recordedCalls.length,
      byMethod,
      byStatus,
      avgDuration: callsWithDuration > 0 ? totalDuration / callsWithDuration : 0,
      totalDuration,
    };
  }

  /**
   * Clear recorded calls
   */
  clear(): void {
    this.recordedCalls = [];
    this.requestTimestamps.clear();
    TestLogger.debug('Cleared all recorded API calls');
  }
}
