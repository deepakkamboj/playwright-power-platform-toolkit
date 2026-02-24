# Claude AI Integration Guide

This document provides guidance for AI assistants (like Claude) working with this codebase.

## Project Overview

This is a Rush monorepo for Playwright Power Platform testing. The main package is `playwright-power-platform-toolkit`, which provides tools for automating and testing Power Platform applications (Canvas Apps and Model-Driven Apps) using Playwright.

## Project Structure

````
playwright-power-platform/
├── packages/
│   ├── playwright-power-platform-toolkit/  # Main library package
│   │   ├── src/
│   │   │   ├── core/           # Core factory & provider patterns
│   │   │   ├── pages/          # Page Object Models
│   │   │   ├── locators/       # Locator utilities
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   ├── utils/          # Helper utilities
│   │   │   └── auth/           # Authentication helpers
│   │   ├── docs/               # Documentation
│   │   │   ├── tutorials/      # Usage guides and tutorials
│   │   │   └── api/            # Auto-generated API docs
│   │   └── dist/               # Compiled output
│   └── e2e-tests/              # Example tests
├── common/                     # Rush configuration
└── docs/                       # Project-wide documentation

## Key Architecture Patterns

### 1. Factory Pattern
- `AppLauncherFactory`: Creates appropriate app launchers based on app type

### 2. Provider Pattern
- `AppProvider`: Manages app lifecycle and authentication

### 3. Page Object Model
- `PowerAppsPage`: Base page for Power Apps
- `CanvasAppPage`: Canvas-specific page interactions
- `ModelDrivenAppPage`: Model-Driven-specific page interactions

## **CRITICAL: AppProvider Pattern for All Tests**

### Mandatory Entry Point

**AppProvider is the ONLY entry point for all Power Platform app testing.** Never directly instantiate page objects.

### ✅ CORRECT Pattern

```typescript
import {
  AppProvider,
  AppType,
  AppLaunchMode,
  ModelDrivenAppPage,
  CanvasAppPage
} from 'playwright-power-platform-toolkit';

test.beforeEach(async ({ page, context }) => {
  // 1. Create AppProvider (single entry point)
  const appProvider = new AppProvider(page, context);

  // 2. Launch app using AppProvider
  await appProvider.launch({
    app: 'My App Name',
    type: AppType.ModelDriven,  // or AppType.Canvas
    mode: AppLaunchMode.Play,
    skipMakerPortal: true,
    directUrl: process.env.APP_URL
  });

  // 3. Get page object from AppProvider
  const modelDrivenApp = appProvider.getModelDrivenAppPage();
  // or
  const canvasApp = appProvider.getCanvasAppPage();
});
```

### ❌ INCORRECT Pattern (Never Do This)

```typescript
// ❌ WRONG: Direct instantiation is not allowed
const modelDrivenApp = new ModelDrivenAppPage(page, appUrl);
const canvasApp = new CanvasAppPage(page);

// ❌ WRONG: Direct page navigation without AppProvider
await page.goto(appUrl);
```

### Why AppProvider is Mandatory

1. **Unified API**: Consistent pattern across all app types (Model-Driven, Canvas, Power Apps)
2. **Type Safety**: Validates app type before returning page object
3. **Better Encapsulation**: Implementation details hidden from test code
4. **Centralized Lifecycle Management**: Authentication, navigation, and app initialization
5. **Easier Maintenance**: Single place to update app launching logic

### AppProvider Methods

#### For Model-Driven Apps
```typescript
appProvider.launch({
  app: 'App Name',
  type: AppType.ModelDriven,
  mode: AppLaunchMode.Play,
  skipMakerPortal: true,
  directUrl: 'https://org.crm.dynamics.com/main.aspx?appid=...'
});

const modelDrivenApp = appProvider.getModelDrivenAppPage();
```

#### For Canvas Apps
```typescript
appProvider.launch({
  app: 'Canvas App Name',
  type: AppType.Canvas,
  mode: AppLaunchMode.Play,
  skipMakerPortal: true,
  directUrl: 'https://apps.powerapps.com/play/e/env-id/a/app-id?tenantId=...'
});

const canvasApp = appProvider.getCanvasAppPage();
```

#### For Power Apps Maker Portal
```typescript
appProvider.launch({
  app: 'App Name',
  type: AppType.ModelDriven,
  mode: AppLaunchMode.Edit,
  baseUrl: 'https://make.powerapps.com',
  context: context  // Required for Play mode (handles new tab)
});

const powerAppsPage = appProvider.getPowerAppsPage();
```

### Migration Guide

If you have existing tests using direct instantiation, update them:

**Before (Old Pattern)**:
```typescript
const modelDrivenApp = new ModelDrivenAppPage(page, APP_URL);
await page.goto(APP_URL);
```

**After (AppProvider Pattern)**:
```typescript
const appProvider = new AppProvider(page, context);
await appProvider.launch({
  app: 'App Name',
  type: AppType.ModelDriven,
  mode: AppLaunchMode.Play,
  skipMakerPortal: true,
  directUrl: APP_URL
});
const modelDrivenApp = appProvider.getModelDrivenAppPage();
```

### Example Test Files

- Model-Driven App Test: `packages/e2e-tests/tests/northwind/mda/model-driven-crud.test.ts`
- Canvas App Test: `packages/e2e-tests/tests/northwind/canvas/canvas-app-crud.test.ts`
- Form Context Test: `packages/e2e-tests/tests/northwind/mda/form-context.test.ts`

### Additional Resources

- [APP-PROVIDER-UPDATE.md](APP-PROVIDER-UPDATE.md) - Detailed architecture update documentation
- [AppProvider API Reference](packages/playwright-power-platform-toolkit/src/core/app-provider.ts)

## Development Workflow

### Building
```bash
rush build          # Build all packages
rush rebuild        # Clean and rebuild
rushx build         # Build current package only
````

### Testing

```bash
rush test           # Run all tests
```

### Documentation

```bash
npm run docs        # Generate API documentation
npm run docs:serve  # Serve documentation locally
```

## Code Style Guidelines

1. Use TypeScript strict mode
2. Add JSDoc/TSDoc comments for all public APIs
3. Follow existing patterns for locators and page objects
4. Write tests for new features
5. Use Prettier for formatting

## Documentation Standards

### JSDoc/TSDoc Comments

All public APIs should include:

- Description of the function/class
- `@param` tags for parameters
- `@returns` tag for return values
- `@example` for usage examples
- `@throws` for possible exceptions

Example:

````typescript
/**
 * Launches a Power Platform application
 *
 * @param config - Configuration for launching the app
 * @param config.appUrl - URL of the application to launch
 * @param config.appType - Type of app (canvas or model-driven)
 * @returns Promise that resolves when app is loaded
 * @throws {Error} If authentication fails
 *
 * @example
 * ```typescript
 * await appProvider.launchApp({
 *   appUrl: 'https://apps.powerapps.com/...',
 *   appType: 'canvas'
 * });
 * ```
 */
````

## Common Tasks

### Adding a New Feature

1. Create the implementation in `src/`
2. Add JSDoc comments
3. Export from `index.ts`
4. Add tests in `e2e-tests/`
5. Update documentation in `docs/tutorials/`
6. Generate API docs: `npm run docs`

### Updating Dependencies

```bash
rush update         # Update all dependencies
rush install        # Install dependencies
```

## Important Files

- [rush.json](rush.json) - Rush configuration
- [package.json](package.json) - Root package configuration
- [packages/playwright-power-platform-toolkit/package.json](packages/playwright-power-platform-toolkit/package.json) - Toolkit package config
- [packages/playwright-power-platform-toolkit/tsconfig.json](packages/playwright-power-platform-toolkit/tsconfig.json) - TypeScript configuration
- [packages/playwright-power-platform-toolkit/src/index.ts](packages/playwright-power-platform-toolkit/src/index.ts) - Main entry point

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Power Platform Documentation](https://docs.microsoft.com/power-platform/)
- [Rush Documentation](https://rushjs.io/)
- [TypeDoc Documentation](https://typedoc.org/)

## Contact

- Author: Deepak Kamboj
- Email: deepakkamboj@gmail.com
- GitHub: [deepakkamboj](https://github.com/deepakkamboj)
