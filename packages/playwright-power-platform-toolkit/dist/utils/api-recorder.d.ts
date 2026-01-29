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
import { Page } from '@playwright/test';
/**
 * Configuration options for API recording
 */
export interface ApiRecorderOptions {
    /** URL filter pattern (RegExp) to match API endpoints */
    urlFilter?: RegExp;
    /** Resource types to record (default: ['xhr', 'fetch']) */
    resourceTypes?: string[];
    /** Include request headers in recording */
    includeRequestHeaders?: boolean;
    /** Include response headers in recording */
    includeResponseHeaders?: boolean;
    /** Include request body in recording */
    includeRequestBody?: boolean;
    /** Include response body in recording */
    includeResponseBody?: boolean;
    /** Maximum response body size to record in bytes (default: 500KB) */
    maxResponseBodySize?: number;
}
/**
 * Recorded API call data
 */
export interface RecordedApiCall {
    /** Unique identifier for this call */
    id: string;
    /** Request timestamp */
    timestamp: number;
    /** HTTP method */
    method: string;
    /** Request URL */
    url: string;
    /** Request headers (if enabled) */
    requestHeaders?: Record<string, string>;
    /** Request body (if enabled) */
    requestBody?: any;
    /** Response status code */
    status?: number;
    /** Response status text */
    statusText?: string;
    /** Response headers (if enabled) */
    responseHeaders?: Record<string, string>;
    /** Response body (if enabled) */
    responseBody?: any;
    /** Response content type */
    contentType?: string;
    /** Request duration in milliseconds */
    duration?: number;
    /** Error message if request failed */
    error?: string;
}
/**
 * Recording statistics
 */
export interface RecordingStatistics {
    /** Total number of API calls recorded */
    totalCalls: number;
    /** Average request duration */
    avgDuration: number;
    /** Total duration of all requests */
    totalDuration: number;
    /** Calls grouped by HTTP method */
    byMethod: Record<string, number>;
    /** Calls grouped by status code */
    byStatus: Record<string, number>;
    /** Calls grouped by URL pattern */
    byUrl: Record<string, number>;
}
/**
 * Test code generation options
 */
export interface TestCodeOptions {
    /** Name of the generated test */
    testName?: string;
    /** Include response assertions */
    includeAssertions?: boolean;
    /** Use test.step() for each API call */
    useTestSteps?: boolean;
    /** Include timing assertions */
    includeTimingAssertions?: boolean;
}
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
export declare class ApiRecorder {
    private page;
    private options;
    private recordings;
    private isRecording;
    private requestMap;
    /**
     * Create a new API recorder
     *
     * @param page - Playwright page to record from
     * @param options - Recording configuration options
     */
    constructor(page: Page, options?: ApiRecorderOptions);
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
    startRecording(): Promise<void>;
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
    stopRecording(): Promise<void>;
    /**
     * Handle request event
     */
    private handleRequest;
    /**
     * Handle response event
     */
    private handleResponse;
    /**
     * Handle request failed event
     */
    private handleRequestFailed;
    /**
     * Check if request should be recorded
     */
    private shouldRecordRequest;
    /**
     * Generate unique request ID
     */
    private generateRequestId;
    /**
     * Parse request body based on content type
     */
    private parseRequestBody;
    /**
     * Parse response body based on content type
     */
    private parseResponseBody;
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
    getRecordings(): RecordedApiCall[];
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
    getStatistics(): RecordingStatistics;
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
    saveToFile(filename: string): Promise<string>;
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
    saveTestCode(filename: string, options?: TestCodeOptions): Promise<string>;
    /**
     * Simplify URL for display
     */
    private simplifyUrl;
    /**
     * Clear all recordings
     *
     * @example
     * ```typescript
     * recorder.clearRecordings();
     * ```
     */
    clearRecordings(): void;
}
