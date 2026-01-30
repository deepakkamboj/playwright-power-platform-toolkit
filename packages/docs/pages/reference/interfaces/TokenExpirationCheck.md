[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / TokenExpirationCheck

# Interface: TokenExpirationCheck

Defined in: [utils/auth-helpers.ts:38](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L38)

Token expiration check result

## Properties

### expired

> **expired**: `boolean`

Defined in: [utils/auth-helpers.ts:40](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L40)

Whether the token has expired

---

### expiresOn?

> `optional` **expiresOn**: `number`

Defined in: [utils/auth-helpers.ts:42](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L42)

Expiration timestamp in seconds (if found)

---

### token?

> `optional` **token**: `string`

Defined in: [utils/auth-helpers.ts:44](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L44)

Token string (if found)
