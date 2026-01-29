[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / TokenExpirationCheck

# Interface: TokenExpirationCheck

Defined in: [utils/auth-helpers.ts:100](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L100)

Token expiration check result

## Properties

### expired

> **expired**: `boolean`

Defined in: [utils/auth-helpers.ts:102](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L102)

Whether the token has expired

---

### expiresOn?

> `optional` **expiresOn**: `number`

Defined in: [utils/auth-helpers.ts:104](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L104)

Expiration timestamp in seconds (if found)

---

### token?

> `optional` **token**: `string`

Defined in: [utils/auth-helpers.ts:106](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/utils/auth-helpers.ts#L106)

Token string (if found)
