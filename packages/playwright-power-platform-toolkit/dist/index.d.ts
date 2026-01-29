/**
 * Power Platform Apps Testing Library
 * Independent library for Canvas and Model Driven app testing
 * Enhanced with production-tested components from legacy library
 *
 * @packageDocumentation
 */
export { IAppLauncher, AppMetadata } from './core/app-launcher.interface';
export { AppLauncherFactory } from './core/app-launcher.factory';
export { AppProvider, LaunchAppConfig } from './core/app-provider';
export { PowerAppsPage } from './pages/power-apps.page';
export { CanvasAppPage } from './pages/canvas-app.page';
export { ModelDrivenAppPage } from './pages/model-driven-app.page';
export { BaseLocators, LocatorUtils } from './locators/base.locators';
export { PowerAppsPageLocators, PowerAppsPageSelectors } from './locators/power-apps.locators';
export { CanvasAppLocators, getCanvasDataTestId, getCanvasControlByName, getCanvasScreenByName, } from './locators/canvas-app.locators';
export { ModelDrivenAppLocators, getModelDrivenDataAutomationId, getModelDrivenTablePage, getModelDrivenFormField, getModelDrivenNavItem, } from './locators/model-driven-app.locators';
export * from './types';
export * from './utils';
