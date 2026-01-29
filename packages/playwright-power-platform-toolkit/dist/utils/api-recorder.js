"use strict";
/**
 * API Recorder for Power Platform Testing
 *
 * Records API requests and responses during test execution, enabling:
 * - API call inspection and debugging
 * - Test code generation from recordings
 * - API mocking and replay
 * - Performance analysis
 *
 * @module ApiRecorder
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
exports.ApiRecorder = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * API Recorder
 *
 * Records API requests and responses during Playwright test execution.
 *
 * @example
 * ```typescript
 * import { chromium } from '@playwright/test';
 * import { ApiRecorder } from 'playwright-power-platform-toolkit';
 *
 * const browser = await chromium.launch();
 * const page = await browser.newPage();
 *
 * // Create recorder with URL filter
 * const recorder = new ApiRecorder(page, {
 *   urlFilter: /api\.powerapps\.com/,
 *   includeRequestBody: true,
 *   includeResponseBody: true
 * });
 *
 * // Start recording
 * await recorder.startRecording();
 *
 * // Perform actions on the page
 * await page.goto('https://make.powerapps.com');
 *
 * // Stop recording and get results
 * await recorder.stopRecording();
 * const stats = recorder.getStatistics();
 * console.log(`Recorded ${stats.totalCalls} API calls`);
 *
 * // Save recording to file
 * await recorder.saveToFile('api-recording.json');
 *
 * // Generate test code
 * await recorder.saveTestCode('generated-test.spec.ts');
 * ```
 */
class ApiRecorder {
    /**
     * Create a new API recorder
     *
     * @param page - Playwright page to record from
     * @param options - Recording configuration options
     */
    constructor(page, options = {}) {
        this.recordings = [];
        this.isRecording = false;
        this.requestMap = new Map();
        this.page = page;
        this.options = {
            urlFilter: options.urlFilter || /.*/,
            resourceTypes: options.resourceTypes || ['xhr', 'fetch'],
            includeRequestHeaders: options.includeRequestHeaders ?? true,
            includeResponseHeaders: options.includeResponseHeaders ?? true,
            includeRequestBody: options.includeRequestBody ?? true,
            includeResponseBody: options.includeResponseBody ?? true,
            maxResponseBodySize: options.maxResponseBodySize ?? 500 * 1024,
        };
    }
    /**
     * Start recording API calls
     *
     * Begins monitoring all network requests matching the configured filters.
     *
     * @example
     * ```typescript
     * await recorder.startRecording();
     * // Perform actions...
     * await recorder.stopRecording();
     * ```
     */
    async startRecording() {
        if (this.isRecording) {
            throw new Error('Recording is already in progress');
        }
        this.isRecording = true;
        this.recordings = [];
        this.requestMap.clear();
        // Listen to request events
        this.page.on('request', this.handleRequest.bind(this));
        this.page.on('response', this.handleResponse.bind(this));
        this.page.on('requestfailed', this.handleRequestFailed.bind(this));
    }
    /**
     * Stop recording API calls
     *
     * Stops monitoring network requests and finalizes the recording.
     *
     * @example
     * ```typescript
     * await recorder.stopRecording();
     * const recordings = recorder.getRecordings();
     * ```
     */
    async stopRecording() {
        if (!this.isRecording) {
            throw new Error('No recording in progress');
        }
        this.isRecording = false;
        // Remove event listeners
        this.page.off('request', this.handleRequest.bind(this));
        this.page.off('response', this.handleResponse.bind(this));
        this.page.off('requestfailed', this.handleRequestFailed.bind(this));
    }
    /**
     * Handle request event
     */
    handleRequest(request) {
        if (!this.shouldRecordRequest(request)) {
            return;
        }
        const requestId = this.generateRequestId(request);
        this.requestMap.set(requestId, {
            startTime: Date.now(),
            request,
        });
    }
    /**
     * Handle response event
     */
    async handleResponse(response) {
        const request = response.request();
        if (!this.shouldRecordRequest(request)) {
            return;
        }
        const requestId = this.generateRequestId(request);
        const requestData = this.requestMap.get(requestId);
        if (!requestData) {
            return;
        }
        const duration = Date.now() - requestData.startTime;
        const recording = {
            id: requestId,
            timestamp: requestData.startTime,
            method: request.method(),
            url: request.url(),
            status: response.status(),
            statusText: response.statusText(),
            contentType: response.headers()['content-type'],
            duration,
        };
        // Add request headers
        if (this.options.includeRequestHeaders) {
            recording.requestHeaders = request.headers();
        }
        // Add request body
        if (this.options.includeRequestBody) {
            try {
                const postData = request.postData();
                if (postData) {
                    recording.requestBody = this.parseRequestBody(postData, request.headers());
                }
            }
            catch (error) {
                // Ignore body parsing errors
            }
        }
        // Add response headers
        if (this.options.includeResponseHeaders) {
            recording.responseHeaders = response.headers();
        }
        // Add response body
        if (this.options.includeResponseBody) {
            try {
                const body = await response.body();
                if (body && body.length <= this.options.maxResponseBodySize) {
                    recording.responseBody = this.parseResponseBody(body, response.headers());
                }
            }
            catch (error) {
                // Ignore body parsing errors
            }
        }
        this.recordings.push(recording);
        this.requestMap.delete(requestId);
    }
    /**
     * Handle request failed event
     */
    handleRequestFailed(request) {
        if (!this.shouldRecordRequest(request)) {
            return;
        }
        const requestId = this.generateRequestId(request);
        const requestData = this.requestMap.get(requestId);
        if (!requestData) {
            return;
        }
        const duration = Date.now() - requestData.startTime;
        const recording = {
            id: requestId,
            timestamp: requestData.startTime,
            method: request.method(),
            url: request.url(),
            duration,
            error: request.failure()?.errorText || 'Request failed',
        };
        if (this.options.includeRequestHeaders) {
            recording.requestHeaders = request.headers();
        }
        if (this.options.includeRequestBody) {
            try {
                const postData = request.postData();
                if (postData) {
                    recording.requestBody = this.parseRequestBody(postData, request.headers());
                }
            }
            catch (error) {
                // Ignore body parsing errors
            }
        }
        this.recordings.push(recording);
        this.requestMap.delete(requestId);
    }
    /**
     * Check if request should be recorded
     */
    shouldRecordRequest(request) {
        const resourceType = request.resourceType();
        const url = request.url();
        // Check resource type
        if (!this.options.resourceTypes.includes(resourceType)) {
            return false;
        }
        // Check URL filter
        if (!this.options.urlFilter.test(url)) {
            return false;
        }
        return true;
    }
    /**
     * Generate unique request ID
     */
    generateRequestId(request) {
        return `${request.method()}_${request.url()}_${Date.now()}`;
    }
    /**
     * Parse request body based on content type
     */
    parseRequestBody(data, headers) {
        const contentType = headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            try {
                return JSON.parse(data);
            }
            catch {
                return data;
            }
        }
        return data;
    }
    /**
     * Parse response body based on content type
     */
    parseResponseBody(buffer, headers) {
        const contentType = headers['content-type'] || '';
        const data = buffer.toString('utf-8');
        if (contentType.includes('application/json')) {
            try {
                return JSON.parse(data);
            }
            catch {
                return data;
            }
        }
        return data;
    }
    /**
     * Get all recorded API calls
     *
     * @returns Array of recorded API calls
     *
     * @example
     * ```typescript
     * const recordings = recorder.getRecordings();
     * console.log(`Captured ${recordings.length} API calls`);
     * ```
     */
    getRecordings() {
        return [...this.recordings];
    }
    /**
     * Get recording statistics
     *
     * @returns Statistics about the recorded API calls
     *
     * @example
     * ```typescript
     * const stats = recorder.getStatistics();
     * console.log(`Total calls: ${stats.totalCalls}`);
     * console.log(`Average duration: ${stats.avgDuration}ms`);
     * ```
     */
    getStatistics() {
        const stats = {
            totalCalls: this.recordings.length,
            avgDuration: 0,
            totalDuration: 0,
            byMethod: {},
            byStatus: {},
            byUrl: {},
        };
        if (this.recordings.length === 0) {
            return stats;
        }
        // Calculate durations
        let totalDuration = 0;
        for (const recording of this.recordings) {
            if (recording.duration) {
                totalDuration += recording.duration;
            }
            // Group by method
            stats.byMethod[recording.method] = (stats.byMethod[recording.method] || 0) + 1;
            // Group by status
            const status = recording.status?.toString() || 'failed';
            stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
            // Group by URL (simplified)
            try {
                const url = new URL(recording.url);
                const baseUrl = `${url.protocol}//${url.host}${url.pathname}`;
                stats.byUrl[baseUrl] = (stats.byUrl[baseUrl] || 0) + 1;
            }
            catch {
                stats.byUrl[recording.url] = (stats.byUrl[recording.url] || 0) + 1;
            }
        }
        stats.totalDuration = totalDuration;
        stats.avgDuration = totalDuration / this.recordings.length;
        return stats;
    }
    /**
     * Save recordings to JSON file
     *
     * @param filename - Output filename (relative or absolute path)
     * @returns Absolute path to the saved file
     *
     * @example
     * ```typescript
     * const filePath = await recorder.saveToFile('recordings/api-calls.json');
     * console.log(`Saved to: ${filePath}`);
     * ```
     */
    async saveToFile(filename) {
        const outputPath = path.resolve(process.cwd(), filename);
        const outputDir = path.dirname(outputPath);
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const data = {
            recordedAt: new Date().toISOString(),
            statistics: this.getStatistics(),
            recordings: this.recordings,
        };
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
        return outputPath;
    }
    /**
     * Generate Playwright test code from recordings
     *
     * @param filename - Output filename for the test file
     * @param options - Test code generation options
     * @returns Absolute path to the generated test file
     *
     * @example
     * ```typescript
     * const testPath = await recorder.saveTestCode('generated.spec.ts', {
     *   testName: 'API test from recording',
     *   includeAssertions: true,
     *   useTestSteps: true
     * });
     * ```
     */
    async saveTestCode(filename, options = {}) {
        const testName = options.testName || 'Recorded API test';
        const includeAssertions = options.includeAssertions ?? true;
        const useTestSteps = options.useTestSteps ?? true;
        const includeTimingAssertions = options.includeTimingAssertions ?? false;
        const outputPath = path.resolve(process.cwd(), filename);
        const outputDir = path.dirname(outputPath);
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        let testCode = `/**
 * Generated Test from API Recording
 * Generated: ${new Date().toISOString()}
 * Total API Calls: ${this.recordings.length}
 */

import { test, expect } from '@playwright/test';
import {
  extractTokenFromStorage,
  createAuthenticatedApiContext,
  validateApiResponse
} from 'playwright-power-platform-toolkit';

test('${testName}', async () => {
  // Extract authentication token
  const token = extractTokenFromStorage();
  expect(token).toBeDefined();

  // Create authenticated API context
  const apiContext = await createAuthenticatedApiContext(token);

  try {
`;
        for (let i = 0; i < this.recordings.length; i++) {
            const recording = this.recordings[i];
            const stepName = `${recording.method} ${this.simplifyUrl(recording.url)}`;
            if (useTestSteps) {
                testCode += `\n    await test.step('${stepName}', async () => {\n`;
            }
            else {
                testCode += `\n    // ${stepName}\n`;
            }
            const indent = useTestSteps ? '      ' : '    ';
            // Generate API call
            if (recording.method === 'GET') {
                testCode += `${indent}const response${i} = await apiContext.get('${recording.url}');\n`;
            }
            else if (recording.method === 'POST') {
                if (recording.requestBody) {
                    testCode += `${indent}const response${i} = await apiContext.post('${recording.url}', {\n`;
                    testCode += `${indent}  data: ${JSON.stringify(recording.requestBody, null, 2).replace(/\n/g, `\n${indent}  `)}\n`;
                    testCode += `${indent}});\n`;
                }
                else {
                    testCode += `${indent}const response${i} = await apiContext.post('${recording.url}');\n`;
                }
            }
            else {
                testCode += `${indent}const response${i} = await apiContext.${recording.method.toLowerCase()}('${recording.url}');\n`;
            }
            if (includeAssertions && recording.status) {
                testCode += `\n${indent}// Validate response\n`;
                testCode += `${indent}const validation${i} = await validateApiResponse(response${i});\n`;
                testCode += `${indent}expect(validation${i}.success).toBe(${recording.status >= 200 && recording.status < 300});\n`;
                testCode += `${indent}expect(validation${i}.status).toBe(${recording.status});\n`;
                if (includeTimingAssertions && recording.duration) {
                    const maxDuration = Math.ceil(recording.duration * 2); // 2x recorded duration
                    testCode += `${indent}expect(response${i}.status()).toBeLessThan(${maxDuration});\n`;
                }
            }
            if (useTestSteps) {
                testCode += `    });\n`;
            }
        }
        testCode += `
  } finally {
    // Cleanup
    await apiContext.dispose();
  }
});
`;
        fs.writeFileSync(outputPath, testCode, 'utf-8');
        return outputPath;
    }
    /**
     * Simplify URL for display
     */
    simplifyUrl(url) {
        try {
            const urlObj = new URL(url);
            let path = urlObj.pathname;
            if (path.length > 50) {
                path = path.substring(0, 47) + '...';
            }
            return path;
        }
        catch {
            return url.substring(0, 50);
        }
    }
    /**
     * Clear all recordings
     *
     * @example
     * ```typescript
     * recorder.clearRecordings();
     * ```
     */
    clearRecordings() {
        this.recordings = [];
        this.requestMap.clear();
    }
}
exports.ApiRecorder = ApiRecorder;
