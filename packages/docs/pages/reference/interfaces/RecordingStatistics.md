[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / RecordingStatistics

# Interface: RecordingStatistics

Defined in: utils/api-recorder.ts:72

Recording statistics

## Properties

### totalCalls

> **totalCalls**: `number`

Defined in: utils/api-recorder.ts:74

Total number of API calls recorded

***

### avgDuration

> **avgDuration**: `number`

Defined in: utils/api-recorder.ts:76

Average request duration

***

### totalDuration

> **totalDuration**: `number`

Defined in: utils/api-recorder.ts:78

Total duration of all requests

***

### byMethod

> **byMethod**: `Record`\<`string`, `number`\>

Defined in: utils/api-recorder.ts:80

Calls grouped by HTTP method

***

### byStatus

> **byStatus**: `Record`\<`string`, `number`\>

Defined in: utils/api-recorder.ts:82

Calls grouped by status code

***

### byUrl

> **byUrl**: `Record`\<`string`, `number`\>

Defined in: utils/api-recorder.ts:84

Calls grouped by URL pattern
