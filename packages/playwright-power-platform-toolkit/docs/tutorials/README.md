# Playwright Power Platform Toolkit - Tutorials

Welcome to the Playwright Power Platform Toolkit tutorials! This guide will help you get started with testing Power Platform applications using Playwright.

## Table of Contents

### Core Tutorials

1. [Getting Started](./01-getting-started.md)
2. [Testing Canvas Apps](./02-canvas-apps.md)
3. [Testing Model-Driven Apps](./03-model-driven-apps.md)
4. [Authentication](./04-authentication.md)
5. [Advanced Usage](./05-advanced-usage.md)

### Component Guides

6. [Model-Driven Components API](./MODEL-DRIVEN-COMPONENTS.md) - Complete API reference for GridComponent, FormComponent, and CommandingComponent
7. [FormContext API](./FORMCONTEXT.md) - Deep dive into Dynamics 365 FormContext API

## Quick Start

```typescript
import { test } from '@playwright/test';
import { AppProvider, AppType, AppLaunchMode } from 'playwright-power-platform-toolkit';

test('my first power apps test', async ({ page, context }) => {
  const appProvider = new AppProvider(page, context);

  await appProvider.launch({
    app: 'My Canvas App',
    type: AppType.Canvas,
    mode: AppLaunchMode.Play,
    skipMakerPortal: true,
    directUrl: process.env.CANVAS_APP_URL,
  });

  const canvasApp = appProvider.getCanvasAppPage();

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
