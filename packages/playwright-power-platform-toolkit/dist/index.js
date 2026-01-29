"use strict";
/**
 * Power Platform Apps Testing Library
 * Independent library for Canvas and Model Driven app testing
 * Enhanced with production-tested components from legacy library
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelDrivenNavItem = exports.getModelDrivenFormField = exports.getModelDrivenTablePage = exports.getModelDrivenDataAutomationId = exports.ModelDrivenAppLocators = exports.getCanvasScreenByName = exports.getCanvasControlByName = exports.getCanvasDataTestId = exports.CanvasAppLocators = exports.PowerAppsPageSelectors = exports.PowerAppsPageLocators = exports.LocatorUtils = exports.BaseLocators = exports.ModelDrivenAppPage = exports.CanvasAppPage = exports.PowerAppsPage = exports.AppProvider = exports.AppLauncherFactory = void 0;
var app_launcher_factory_1 = require("./core/app-launcher.factory");
Object.defineProperty(exports, "AppLauncherFactory", { enumerable: true, get: function () { return app_launcher_factory_1.AppLauncherFactory; } });
var app_provider_1 = require("./core/app-provider");
Object.defineProperty(exports, "AppProvider", { enumerable: true, get: function () { return app_provider_1.AppProvider; } });
// Export Page Object Models
var power_apps_page_1 = require("./pages/power-apps.page");
Object.defineProperty(exports, "PowerAppsPage", { enumerable: true, get: function () { return power_apps_page_1.PowerAppsPage; } });
var canvas_app_page_1 = require("./pages/canvas-app.page");
Object.defineProperty(exports, "CanvasAppPage", { enumerable: true, get: function () { return canvas_app_page_1.CanvasAppPage; } });
var model_driven_app_page_1 = require("./pages/model-driven-app.page");
Object.defineProperty(exports, "ModelDrivenAppPage", { enumerable: true, get: function () { return model_driven_app_page_1.ModelDrivenAppPage; } });
// Export Base Locators (from legacy library integration)
var base_locators_1 = require("./locators/base.locators");
Object.defineProperty(exports, "BaseLocators", { enumerable: true, get: function () { return base_locators_1.BaseLocators; } });
Object.defineProperty(exports, "LocatorUtils", { enumerable: true, get: function () { return base_locators_1.LocatorUtils; } });
// Export Power Apps Page Locators (from legacy library integration)
var power_apps_locators_1 = require("./locators/power-apps.locators");
Object.defineProperty(exports, "PowerAppsPageLocators", { enumerable: true, get: function () { return power_apps_locators_1.PowerAppsPageLocators; } });
Object.defineProperty(exports, "PowerAppsPageSelectors", { enumerable: true, get: function () { return power_apps_locators_1.PowerAppsPageSelectors; } });
// Export Canvas & Model Driven Locators
var canvas_app_locators_1 = require("./locators/canvas-app.locators");
Object.defineProperty(exports, "CanvasAppLocators", { enumerable: true, get: function () { return canvas_app_locators_1.CanvasAppLocators; } });
Object.defineProperty(exports, "getCanvasDataTestId", { enumerable: true, get: function () { return canvas_app_locators_1.getCanvasDataTestId; } });
Object.defineProperty(exports, "getCanvasControlByName", { enumerable: true, get: function () { return canvas_app_locators_1.getCanvasControlByName; } });
Object.defineProperty(exports, "getCanvasScreenByName", { enumerable: true, get: function () { return canvas_app_locators_1.getCanvasScreenByName; } });
var model_driven_app_locators_1 = require("./locators/model-driven-app.locators");
Object.defineProperty(exports, "ModelDrivenAppLocators", { enumerable: true, get: function () { return model_driven_app_locators_1.ModelDrivenAppLocators; } });
Object.defineProperty(exports, "getModelDrivenDataAutomationId", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenDataAutomationId; } });
Object.defineProperty(exports, "getModelDrivenTablePage", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenTablePage; } });
Object.defineProperty(exports, "getModelDrivenFormField", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenFormField; } });
Object.defineProperty(exports, "getModelDrivenNavItem", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenNavItem; } });
// Export Types and Interfaces (from legacy library integration)
__exportStar(require("./types"), exports);
// Export Utilities
__exportStar(require("./utils"), exports);
