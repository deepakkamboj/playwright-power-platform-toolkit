[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / checkEnvironmentVariables

# Function: checkEnvironmentVariables()

> **checkEnvironmentVariables**(): `void`

Defined in: [utils/auth-helpers.ts:238](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L238)

Validate that required authentication environment variables are set

Checks for the presence of required environment variables for authentication.
Supports both password and certificate-based authentication.

## Returns

`void`

## Throws

If required environment variables are missing

## Example

```typescript
try {
  checkEnvironmentVariables();
  console.log('All required environment variables are set');
} catch (error) {
  console.error('Missing environment variables:', error.message);
}
```
