# Playwright Power Platform Toolkit - Tutorials

Welcome to the Playwright Power Platform Toolkit tutorials! This guide will help you get started with testing Power Platform applications using Playwright.

## Table of Contents

1. [Getting Started](./01-getting-started.md)
2. [Testing Canvas Apps](./02-canvas-apps.md)
3. [Testing Model-Driven Apps](./03-model-driven-apps.md)
4. [Authentication](./04-authentication.md)
5. [Advanced Usage](./05-advanced-usage.md)

## Quick Start

```typescript
import { test } from '@playwright/test';
import { AppProvider } from 'playwright-power-platform-toolkit';

test('my first power apps test', async ({ page }) => {
  const appProvider = new AppProvider(page);

  await appProvider.launchApp({
    appUrl: 'https://apps.powerapps.com/...',
    appType: 'canvas',
  });

  // Your test code here
});
```

## Prerequisites

- Node.js (v18 or higher)
- Playwright Test
- Power Platform account with access to apps

## Installation

```bash
npm install playwright-power-platform-toolkit
npm install -D @playwright/test
```

## Next Steps

Start with the [Getting Started](./01-getting-started.md) tutorial to learn the basics.
