[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / pollOperationStatus

# Function: pollOperationStatus()

> **pollOperationStatus**(`operationUrl`, `token`, `maxAttempts`, `intervalMs`): `Promise`\<[`OperationResult`](../interfaces/OperationResult.md)\>

Defined in: [utils/api-utilities.ts:355](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/api-utilities.ts#L355)

Wait for API operation to complete with polling

Polls a long-running operation URL until completion, failure, or timeout.
Useful for operations that return an operation URL to check status.

## Parameters

### operationUrl

`string`

URL to poll for operation status

### token

`string`

Bearer authentication token

### maxAttempts

`number` = `30`

Maximum polling attempts (default: 30)

### intervalMs

`number` = `2000`

Polling interval in milliseconds (default: 2000)

## Returns

`Promise`\<[`OperationResult`](../interfaces/OperationResult.md)\>

Final operation status

## Throws

If operation times out

## Example

```typescript
// Start a long-running operation
const response = await apiContext.post('/api/operations', {
  data: { action: 'deploy' },
});
const data = await response.json();
const operationUrl = data.operationUrl;

// Poll until complete
const token = extractTokenFromStorage();
const result = await pollOperationStatus(
  operationUrl,
  token,
  60, // Wait up to 2 minutes
  2000 // Check every 2 seconds
);

if (result.success) {
  console.log('Operation completed successfully');
} else {
  console.error('Operation failed:', result.data);
}
```
