# Documentation

Welcome to the Playwright Power Apps Testing Library documentation!

## 📚 Documentation Index

### Getting Started

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in minutes
  - Installation and setup
  - Authentication configuration
  - Writing your first test
  - Running tests

### Feature Guides

- **[API & Accessibility Testing Guide](API-ACCESSIBILITY-GUIDE.md)** - Comprehensive guide to API and accessibility testing
  - Power Apps REST API testing
  - Dataverse OData queries
  - WCAG compliance testing
  - Keyboard navigation testing
  - Screen reader support validation

### Reference

- **[Quick Reference](QUICK-REFERENCE.md)** - Common patterns and code snippets
  - API testing cheat sheet
  - Accessibility testing cheat sheet
  - Common selectors and locators
  - Helper function reference

## 🚀 Quick Links

### Main README

- **[Main README](../README.md)** - Complete library documentation with architecture diagrams and API reference

### Package Resources

- **[package.json](../package.json)** - NPM scripts and dependencies
- **[playwright.config.ts](../playwright.config.ts)** - Test configuration
- **[.env.example](../.env.example)** - Environment variables template

### Example Tests

- **[UI Tests](../tests/powerapps-page.spec.ts)** - PowerAppsPage POM examples
- **[API Tests](../tests/examples/api-testing-examples.spec.ts)** - API testing examples
- **[Accessibility Tests](../tests/examples/accessibility-examples.spec.ts)** - A11y testing examples

## 📖 Documentation Structure

```
docs/
├── README.md                      # This file - Documentation index
├── QUICKSTART.md                  # Quick start guide
├── API-ACCESSIBILITY-GUIDE.md     # API & Accessibility features guide
└── QUICK-REFERENCE.md             # Quick reference and cheat sheets
```

## 🎯 Common Tasks

### Authentication

```bash
# First-time setup - authenticate to Microsoft/Power Apps
npm run auth:headful

# Check authentication status
npm run auth:check
```

### Running Tests

```bash
# Run all tests
npm test

# Run with visible browser
npm run test:headed

# Run specific test file
npx playwright test tests/powerapps-page.spec.ts
```

### Cleanup

```bash
# Clean test results and artifacts
npm run clean:results

# Clean build output
npm run clean
```

## 💡 Tips

1. **Start with Quick Start** - Follow [QUICKSTART.md](QUICKSTART.md) for step-by-step setup
2. **Explore Examples** - Check out the example tests in `tests/` folder
3. **Use Quick Reference** - Keep [QUICK-REFERENCE.md](QUICK-REFERENCE.md) handy for common patterns
4. **Read API Guide** - See [API-ACCESSIBILITY-GUIDE.md](API-ACCESSIBILITY-GUIDE.md) for advanced features

## 🆘 Getting Help

- Review error messages - They often contain helpful debugging information
- Check [Troubleshooting section](../README.md#-troubleshooting) in main README
- Run authentication check: `npm run auth:check`
- Clean test artifacts: `npm run clean:results`

## 🔗 External Resources

- [Playwright Documentation](https://playwright.dev/)
- [playwright-ms-auth Package](https://github.com/deepakkamboj/playwright-ms-auth)
- [playwright-ai-reporter Package](https://github.com/deepakkamboj/playwright-ai-reporter)
- [Power Apps Documentation](https://learn.microsoft.com/en-us/power-apps/)
- [Dataverse Web API Reference](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview)
