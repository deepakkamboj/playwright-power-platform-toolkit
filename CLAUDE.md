# Claude AI Integration Guide

This document provides guidance for AI assistants (like Claude) working with this codebase.

## Project Overview

This is a Rush monorepo for Playwright Power Platform testing. The main package is `playwright-power-platform-toolkit`, which provides tools for automating and testing Power Platform applications (Canvas Apps and Model-Driven Apps) using Playwright.

## Project Structure

```
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

## Development Workflow

### Building
```bash
rush build          # Build all packages
rush rebuild        # Clean and rebuild
rushx build         # Build current package only
```

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
```typescript
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
```

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
