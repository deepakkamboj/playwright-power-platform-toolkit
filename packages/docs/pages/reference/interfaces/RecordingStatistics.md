[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / RecordingStatistics

# Interface: RecordingStatistics

Defined in: [utils/api-recorder.ts:72](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L72)

Recording statistics

## Properties

### totalCalls

> **totalCalls**: `number`

Defined in: [utils/api-recorder.ts:74](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L74)

Total number of API calls recorded

---

### avgDuration

> **avgDuration**: `number`

Defined in: [utils/api-recorder.ts:76](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L76)

Average request duration

---

### totalDuration

> **totalDuration**: `number`

Defined in: [utils/api-recorder.ts:78](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L78)

Total duration of all requests

---

### byMethod

> **byMethod**: `Record`\<`string`, `number`\>

Defined in: [utils/api-recorder.ts:80](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L80)

Calls grouped by HTTP method

---

### byStatus

> **byStatus**: `Record`\<`string`, `number`\>

Defined in: [utils/api-recorder.ts:82](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L82)

Calls grouped by status code

---

### byUrl

> **byUrl**: `Record`\<`string`, `number`\>

Defined in: [utils/api-recorder.ts:84](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-recorder.ts#L84)

Calls grouped by URL pattern
