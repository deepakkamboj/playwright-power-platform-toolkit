<div align="center">
  <h1><strong>Playwright Power Platform Toolkit</strong></h1>

[![Build Status](https://github.com/deepakkamboj/playwright-power-platform-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/deepakkamboj/playwright-power-platform-toolkit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/playwright-power-platform-toolkit.svg)](https://www.npmjs.com/package/playwright-power-platform-toolkit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9%2B-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.57%2B-green)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)

  <p><strong>Enterprise Test Automation Framework for Microsoft Power Platform</strong></p>
  <p>A production-ready, comprehensive testing framework library for Power Platform applications built on Playwright. Supports Canvas Apps, Model-Driven Apps, and Power Platform services with robust authentication, API testing, accessibility testing, and intelligent reporting capabilities.</p>
</div>

---

## 🏗️ Architecture

This monorepo contains the **Enterprise Test Automation Framework** library and example **Consumer Test Infrastructure** demonstrating best practices.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Consumer Test Infrastructure                         │
│                    (e2e-tests/ - Your Test Projects)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐   ┌────────────────────────────────────┐             │
│  │    Utils     │   │    Test Infrastructure              │             │
│  ├──────────────┤   ├────────────────────────────────────┤             │
│  │ • Fixtures   │   │ • Test Setup  • Test Scripts        │             │
│  │ • Functions  │   │ • Test Utils  • Shared Steps        │             │
│  │ • Annotations│   │ • Test Teardown                     │             │
│  └──────────────┘   │ • Globals (setup & teardown)        │             │
│                     └────────────────────────────────────┘             │
│                                                                          │
│  ┌────────────────────────────────────────────────────────┐             │
│  │              Configurations                             │             │
│  ├────────────────────────────────────────────────────────┤             │
│  │ • Environments   • Accounts/Teams                       │             │
│  │ • playwright.config.ts (with globalSetup/Teardown)      │             │
│  └────────────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ imports
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│      Enterprise Test Automation Framework (This Library)                │
│              playwright-power-platform-toolkit/                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────┐│
│  │ Page Object Model    │  │  Accessibility       │  │  API Testing   ││
│  ├──────────────────────┤  ├──────────────────────┤  ├────────────────┤│
│  │ • Page Classes       │  │ • WCAG Rules         │  │ • Endpoints    ││
│  │ • Locators Repo      │  │ • Axe-Core           │  │ • Assertions   ││
│  │ • Utils              │  │ • Assertions         │  │ • API Recorder ││
│  │ • Auth Helper        │  │ • Violations Report  │  │ • Dataverse    ││
│  └──────────────────────┘  └──────────────────────┘  └────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ uses
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 Authentication (playwright-ms-auth)                      │
├─────────────────────────────────────────────────────────────────────────┤
│ • Cert-based Auth  • Password Auth  • Token Refresh                     │
│ • Storage State Management  • KeyVault Management                       │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ built on
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│         Playwright Core Libraries and Test Runner                       │
│                   (@playwright/test package)                            │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ outputs to
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              Reporting Layer (playwright-ai-reporter)                    │
├─────────────────────────────────────────────────────────────────────────┤
│ • Trace Logs  • Screenshots & Videos  • AI-powered Analysis             │
│ • Test Suite Logs  • Email Notifications  • Bug Tracking Integration    │
│ • Test Failure Suggestions & Fix  • Reporting & Dashboard               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 What's Included

This monorepo contains:

- **[packages/playwright-power-platform-toolkit/](packages/playwright-power-platform-toolkit/)** - The core library
- **[packages/e2e-tests/](packages/e2e-tests/)** - Example test infrastructure
- **[packages/docs/](packages/docs/)** - Documentation site

### Core Components

#### Page Object Model

- **PowerAppsPage**: Full POM for Power Apps Maker Portal
- **CanvasAppPage**: Canvas app-specific page interactions
- **ModelDrivenAppPage**: Model-Driven app-specific page interactions
- **Locators Repository**: Maintainable selector management
- **Utilities**: Common helper functions for page interactions
- **Auth Helper**: Microsoft authentication integration

#### API Testing

- **REST API Testing**: Full HTTP methods support (GET, POST, PATCH, DELETE)
- **Endpoints**: Pre-defined Power Platform API endpoints
- **Assertions**: Validation helpers for API responses
- **API Recorder**: Record and replay browser API calls
- **Dataverse**: Dataverse-specific API utilities

#### Accessibility Testing

- **WCAG Rules**: Complete WCAG 2.0/2.1 compliance testing
- **Axe-Core Integration**: Industry-standard accessibility engine
- **Assertions**: Accessibility-specific validation
- **Violations Reporting**: Detailed accessibility reports

### Authentication

Powered by `playwright-ms-auth`:

- Certificate-based authentication
- Password-based authentication
- Automatic token refresh
- Storage state management
- Azure KeyVault integration

---

## 🚀 Features

- ✅ **Page Object Model**: Pre-built POMs for Power Apps Portal
- ✅ **Microsoft Authentication**: Certificate & password auth via playwright-ms-auth
- ✅ **API Testing**: Comprehensive REST API testing utilities
- ✅ **Accessibility Testing**: WCAG 2.0/2.1 compliance validation
- ✅ **API Recorder**: Capture and analyze browser API calls
- ✅ **Test Logger**: Colored console output for better debugging
- ✅ **AI-Powered Reporting**: Intelligent test failure analysis
- ✅ **TypeScript Support**: Full type definitions
- ✅ **Path Aliases**: Clean imports (@pages, @locators, @utils, @auth)
- ✅ **Best Practices**: Follows Playwright recommended patterns
- ✅ **Monorepo Structure**: Rush-based package management

---

## 📦 Installation

### Using the Published Package

```bash
npm install playwright-power-platform-toolkit --save-dev
```

### Peer Dependencies

```bash
npm install @playwright/test playwright-ms-auth @axe-core/playwright dotenv --save-dev
```

### Developing from Source

```bash
# Clone the repository
git clone https://github.com/deepakkamboj/playwright-power-platform.git
cd playwright-power-platform

# Install Node.js version
nvm install
nvm use

# Install Rush
npm install -g @microsoft/rush

# Install dependencies
rush install

# Build all packages
rush build
```

---

## 🎯 Quick Start

### 1. Import Components

```typescript
import {
  PowerAppsPage,
  CanvasAppPage,
  ModelDrivenAppPage,
  ApiTestHelper,
  AccessibilityTestHelper,
  ConfigHelper,
  TestLogger,
} from 'playwright-power-platform-toolkit';
```

### 2. Use Page Objects

```typescript
import { test } from '@playwright/test';
import { PowerAppsPage } from 'playwright-power-platform-toolkit';

test('Navigate to Apps', async ({ page }) => {
  const powerAppsPage = new PowerAppsPage(page);
  await powerAppsPage.navigateToApps();
});
```

### 3. Test APIs

```typescript
import { test } from '@playwright/test';
import { ApiTestHelper, ConfigHelper } from 'playwright-power-platform-toolkit';

test('Test Power Apps API', async ({ request }) => {
  const config = ConfigHelper.getInstance();
  const apiHelper = new ApiTestHelper(request, config);

  const response = await apiHelper.get('/providers/Microsoft.PowerApps/apps');
  await apiHelper.validateStatusCode(response, 200);
});
```

### 4. Check Accessibility

```typescript
import { test, expect } from '@playwright/test';
import { AccessibilityTestHelper } from 'playwright-power-platform-toolkit';

test('Check WCAG compliance', async ({ page }) => {
  await page.goto('https://make.powerapps.com');

  const a11yHelper = new AccessibilityTestHelper(page);
  const results = await a11yHelper.scanPage();

  expect(results.violations).toHaveLength(0);
});
```

---

## 📚 Documentation

For comprehensive documentation, see:

- **[packages/playwright-power-platform-toolkit/README.md](packages/playwright-power-platform-toolkit/README.md)** - Library documentation
- **[packages/playwright-power-platform-toolkit/docs/](packages/playwright-power-platform-toolkit/docs/)** - Detailed guides
- **[packages/e2e-tests/README.md](packages/e2e-tests/README.md)** - Example test infrastructure
- **[CLAUDE.md](CLAUDE.md)** - Complete project overview for AI assistants
- **[PIPELINE-SETUP.md](PIPELINE-SETUP.md)** - CI/CD pipeline setup guide

### Online Documentation

Visit the documentation site at: **https://deepakkamboj.github.io/playwright-power-platform-toolkit/** (deployed from `packages/docs/`)

---

## 🧪 Example Test Project

The [`packages/e2e-tests/`](packages/e2e-tests/) directory contains a complete example of how to use this library in your test project. The example includes:

- **Test fixtures** with auto-injection of library utilities
- **Global setup/teardown** hooks for test lifecycle management
- **Environment-based test filtering** (local, dev, test, staging, prod)
- **Pre-configured test types** (smoke, nightly, API, accessibility, E2E)
- **Complete playwright.config.ts** with all optimizations

```bash
cd packages/e2e-tests
npm install
npm run auth:headful
npm test
```

The example project demonstrates best practices for organizing tests, using fixtures, and structuring a consumer test infrastructure that leverages this library.

---

## 🏗️ Monorepo Structure

This project uses Rush for monorepo management:

```
playwright-power-platform/
├── packages/
│   ├── playwright-power-platform-toolkit/  # Main library package
│   │   ├── src/                            # Library source code
│   │   ├── dist/                           # Compiled output
│   │   └── docs/                           # Documentation
│   ├── e2e-tests/                          # Example tests
│   │   ├── tests/                          # Test files
│   │   └── scripts/                        # Helper scripts
│   └── docs/                               # Documentation site
├── common/                                 # Rush configuration
├── .github/workflows/                      # CI/CD pipelines
└── rush.json                               # Rush configuration
```

### Rush Commands

```bash
# Install all dependencies
rush install

# Build all packages
rush build

# Rebuild all packages
rush rebuild

# Update dependencies
rush update

# Lint all packages
rush lint

# Format code
npm run format

# Check formatting
npm run format:check
```

---

## 🔐 Authentication

This library uses `playwright-ms-auth` for Microsoft authentication.

### Certificate Authentication

```env
MS_AUTH_EMAIL=user@domain.com
MS_AUTH_CREDENTIAL_TYPE=certificate
MS_CERTIFICATE_PATH=./cert.pfx
MS_CERTIFICATE_PASSWORD=YourPassword
```

### Password Authentication

```env
MS_AUTH_EMAIL=user@domain.com
MS_AUTH_CREDENTIAL_TYPE=password
MS_USER_PASSWORD=password
```

See [PIPELINE-SETUP.md](PIPELINE-SETUP.md) for complete authentication setup instructions.

---

## 🚀 CI/CD Pipelines

This repository includes GitHub Actions workflows:

- **[ci.yml](.github/workflows/ci.yml)** - Continuous Integration (runs on every push)
- **[pr.yml](.github/workflows/pr.yml)** - Pull Request validation
- **[playwright-tests.yml](.github/workflows/playwright-tests.yml)** - E2E tests (nightly/manual)
- **[publish-npm.yml](.github/workflows/publish-npm.yml)** - NPM publishing
- **[deploy-docs.yml](.github/workflows/deploy-docs.yml)** - Documentation deployment

See [.github/workflows/README.md](.github/workflows/README.md) for detailed pipeline documentation.

---

## 🤝 Contributing

### Development Workflow

1. **Clone the repository**

   ```bash
   git clone https://github.com/deepakkamboj/playwright-power-platform.git
   cd playwright-power-platform
   ```

2. **Install dependencies**

   ```bash
   nvm use
   npm install -g @microsoft/rush
   rush install
   ```

3. **Make changes to library source**
   - Edit files in `packages/playwright-power-platform-toolkit/src/` directory
   - Update exports in `src/index.ts` if adding new features

4. **Build the library**

   ```bash
   rush build
   ```

5. **Test your changes**

   ```bash
   cd packages/e2e-tests
   npm run auth:headful  # Authenticate (first time only)
   npm test              # Run all tests
   ```

6. **Format and lint**

   ```bash
   npm run format        # Format all code
   rush lint             # Lint all packages
   ```

7. **Submit pull request**
   - Create a feature branch
   - Make your changes
   - Push and create a PR

### Project Structure

- **Library code**: `packages/playwright-power-platform-toolkit/src/`
- **Test code**: `packages/e2e-tests/tests/`
- **Documentation**: `packages/docs/` and `packages/playwright-power-platform-toolkit/docs/`
- **Build output**: `packages/playwright-power-platform-toolkit/dist/`

---

## 📝 License

MIT

---

## 🔗 Related Projects

- [Playwright](https://playwright.dev/) - Browser automation framework
- [playwright-ms-auth](https://github.com/deepakkamboj/playwright-ms-auth) - Microsoft authentication
- [playwright-ai-reporter](https://github.com/deepakkamboj/playwright-ai-reporter) - AI-powered reporting
- [Rush](https://rushjs.io/) - Monorepo management tool

---

## 💡 Tips

1. **Use the library as a dependency**: Install via npm in your test projects
2. **Create custom fixtures**: Extend the library with your own fixtures in your test project
3. **Organize tests**: Separate library code from test code
4. **Handle auth properly**: Run authentication once, reuse storage state
5. **Leverage API testing**: Use ApiTestHelper for backend validation
6. **Check accessibility**: Run AccessibilityTestHelper early and often
7. **Record APIs**: Use ApiRecorder to understand application behavior
8. **Use colored logging**: TestLogger helps debug issues faster
9. **Follow the example**: See `packages/e2e-tests/` for best practices
10. **Use Rush commands**: Leverage Rush for efficient monorepo management

---

## 🐛 Troubleshooting

### Build Issues

```bash
# Clean and rebuild
rush rebuild

# Update dependencies
rush update

# Check Rush version
rush --version
```

### Import Issues

Make sure the library is properly built:

```bash
cd packages/playwright-power-platform-toolkit
npm run build
```

### Authentication Fails

- Verify credentials in `.env`
- Check certificate/password is correct
- Ensure MFA is handled if required
- See [PIPELINE-SETUP.md](PIPELINE-SETUP.md) for detailed setup

### TypeScript Errors

- Ensure `@playwright/test` peer dependency is installed
- Check TypeScript version compatibility
- Run `rush build` to ensure all packages are built

---

## 📞 Support

For issues and questions:

- Open an issue on [GitHub](https://github.com/deepakkamboj/playwright-power-platform-toolkit/issues)
- Check the [documentation](packages/playwright-power-platform-toolkit/docs/)
- Review [example tests](packages/e2e-tests/)
- Read [CLAUDE.md](CLAUDE.md) for complete project overview

---

## 📊 Project Stats

- **Packages**: 3 (toolkit, e2e-tests, docs)
- **Build System**: Rush
- **CI/CD**: GitHub Actions
- **Test Runner**: Playwright
- **Language**: TypeScript
- **Node Version**: 20.16.0

---

## 🎯 Roadmap

- [ ] Add support for Power Automate testing
- [ ] Expand Dataverse API utilities
- [ ] Add visual regression testing
- [ ] Create VSCode extension
- [ ] Add performance testing utilities
- [ ] Expand documentation with more examples

---

## 📧 Contact

**Deepak Kamboj**

- Email: deepakkamboj@gmail.com
- GitHub: [@deepakkamboj](https://github.com/deepakkamboj)

---

**⭐ Star this repository if you find it helpful!**
