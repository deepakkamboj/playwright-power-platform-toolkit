[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / ApiRecorder

# Class: ApiRecorder

Defined in: utils/api-recorder.ts:139

API Recorder

Records API requests and responses during Playwright test execution.

## Example

```typescript
import { chromium } from '@playwright/test';
import { ApiRecorder } from 'playwright-power-platform-toolkit';

const browser = await chromium.launch();
const page = await browser.newPage();

// Create recorder with URL filter
const recorder = new ApiRecorder(page, {
  urlFilter: /api\.powerapps\.com/,
  includeRequestBody: true,
  includeResponseBody: true,
});

// Start recording
await recorder.startRecording();

// Perform actions on the page
await page.goto('https://make.powerapps.com');

// Stop recording and get results
await recorder.stopRecording();
const stats = recorder.getStatistics();
console.log(`Recorded ${stats.totalCalls} API calls`);

// Save recording to file
await recorder.saveToFile('api-recording.json');

// Generate test code
await recorder.saveTestCode('generated-test.spec.ts');
```

## Constructors

### Constructor

> **new ApiRecorder**(`page`, `options`): `ApiRecorder`

Defined in: utils/api-recorder.ts:152

Create a new API recorder

#### Parameters

##### page

`Page`

Playwright page to record from

##### options

[`ApiRecorderOptions`](../interfaces/ApiRecorderOptions.md) = `{}`

Recording configuration options

#### Returns

`ApiRecorder`

## Methods

### startRecording()

> **startRecording**(): `Promise`\<`void`\>

Defined in: utils/api-recorder.ts:177

Start recording API calls

Begins monitoring all network requests matching the configured filters.

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await recorder.startRecording();
// Perform actions...
await recorder.stopRecording();
```

---

### stopRecording()

> **stopRecording**(): `Promise`\<`void`\>

Defined in: utils/api-recorder.ts:203

Stop recording API calls

Stops monitoring network requests and finalizes the recording.

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await recorder.stopRecording();
const recordings = recorder.getRecordings();
```

---

### getRecordings()

> **getRecordings**(): [`RecordedApiCall`](../interfaces/RecordedApiCall.md)[]

Defined in: utils/api-recorder.ts:414

Get all recorded API calls

#### Returns

[`RecordedApiCall`](../interfaces/RecordedApiCall.md)[]

Array of recorded API calls

#### Example

```typescript
const recordings = recorder.getRecordings();
console.log(`Captured ${recordings.length} API calls`);
```

---

### getStatistics()

> **getStatistics**(): [`RecordingStatistics`](../interfaces/RecordingStatistics.md)

Defined in: utils/api-recorder.ts:430

Get recording statistics

#### Returns

[`RecordingStatistics`](../interfaces/RecordingStatistics.md)

Statistics about the recorded API calls

#### Example

```typescript
const stats = recorder.getStatistics();
console.log(`Total calls: ${stats.totalCalls}`);
console.log(`Average duration: ${stats.avgDuration}ms`);
```

---

### saveToFile()

> **saveToFile**(`filename`): `Promise`\<`string`\>

Defined in: utils/api-recorder.ts:486

Save recordings to JSON file

#### Parameters

##### filename

`string`

Output filename (relative or absolute path)

#### Returns

`Promise`\<`string`\>

Absolute path to the saved file

#### Example

```typescript
const filePath = await recorder.saveToFile('recordings/api-calls.json');
console.log(`Saved to: ${filePath}`);
```

---

### saveTestCode()

> **saveTestCode**(`filename`, `options`): `Promise`\<`string`\>

Defined in: utils/api-recorder.ts:522

Generate Playwright test code from recordings

#### Parameters

##### filename

`string`

Output filename for the test file

##### options

[`TestCodeOptions`](../interfaces/TestCodeOptions.md) = `{}`

Test code generation options

#### Returns

`Promise`\<`string`\>

Absolute path to the generated test file

#### Example

```typescript
const testPath = await recorder.saveTestCode('generated.spec.ts', {
  testName: 'API test from recording',
  includeAssertions: true,
  useTestSteps: true,
});
```

---

### clearRecordings()

> **clearRecordings**(): `void`

Defined in: utils/api-recorder.ts:641

Clear all recordings

#### Returns

`void`

#### Example

```typescript
recorder.clearRecordings();
```
