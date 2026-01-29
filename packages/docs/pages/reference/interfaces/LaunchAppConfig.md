[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / LaunchAppConfig

# Interface: LaunchAppConfig

Defined in: [core/app-provider.ts:15](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L15)

Configuration for launching an app

## Properties

### app

> **app**: `string` \| \{ `id`: `string`; \} \| \{ `name`: `string`; \}

Defined in: [core/app-provider.ts:17](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L17)

App identifier - either name or ID

---

### type

> **type**: [`AppType`](../enumerations/AppType.md)

Defined in: [core/app-provider.ts:19](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L19)

Type of app to launch

---

### mode?

> `optional` **mode**: [`AppLaunchMode`](../enumerations/AppLaunchMode.md)

Defined in: [core/app-provider.ts:21](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L21)

Launch mode (play, edit, preview)

---

### baseUrl?

> `optional` **baseUrl**: `string`

Defined in: [core/app-provider.ts:23](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L23)

Base URL for direct ID-based launch

---

### options?

> `optional` **options**: [`AppPlayerOptions`](AppPlayerOptions.md)

Defined in: [core/app-provider.ts:25](https://github.com/deepakkamboj/playwright-power-platform-toolkit/blob/main/packages/playwright-power-platform-toolkit/src/core/app-provider.ts#L25)

Additional launch options
