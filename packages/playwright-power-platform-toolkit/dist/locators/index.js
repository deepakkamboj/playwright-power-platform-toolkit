"use strict";
/**
 * Locators Index
 * Export all locator modules
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelDrivenNavItem = exports.getModelDrivenFormField = exports.getModelDrivenTablePage = exports.getModelDrivenDataAutomationId = exports.ModelDrivenAppLocators = exports.getCanvasScreenByName = exports.getCanvasControlByName = exports.getCanvasDataTestId = exports.CanvasAppLocators = exports.PowerAppsPageSelectors = exports.PowerAppsPageLocators = exports.LocatorUtils = exports.BaseLocators = void 0;
// Base Locators (from legacy library integration)
var base_locators_1 = require("./base.locators");
Object.defineProperty(exports, "BaseLocators", { enumerable: true, get: function () { return base_locators_1.BaseLocators; } });
Object.defineProperty(exports, "LocatorUtils", { enumerable: true, get: function () { return base_locators_1.LocatorUtils; } });
// Power Apps Page Locators (from legacy library integration)
var power_apps_locators_1 = require("./power-apps.locators");
Object.defineProperty(exports, "PowerAppsPageLocators", { enumerable: true, get: function () { return power_apps_locators_1.PowerAppsPageLocators; } });
Object.defineProperty(exports, "PowerAppsPageSelectors", { enumerable: true, get: function () { return power_apps_locators_1.PowerAppsPageSelectors; } });
// Canvas App Locators
var canvas_app_locators_1 = require("./canvas-app.locators");
Object.defineProperty(exports, "CanvasAppLocators", { enumerable: true, get: function () { return canvas_app_locators_1.CanvasAppLocators; } });
Object.defineProperty(exports, "getCanvasDataTestId", { enumerable: true, get: function () { return canvas_app_locators_1.getCanvasDataTestId; } });
Object.defineProperty(exports, "getCanvasControlByName", { enumerable: true, get: function () { return canvas_app_locators_1.getCanvasControlByName; } });
Object.defineProperty(exports, "getCanvasScreenByName", { enumerable: true, get: function () { return canvas_app_locators_1.getCanvasScreenByName; } });
// Model Driven App Locators
var model_driven_app_locators_1 = require("./model-driven-app.locators");
Object.defineProperty(exports, "ModelDrivenAppLocators", { enumerable: true, get: function () { return model_driven_app_locators_1.ModelDrivenAppLocators; } });
Object.defineProperty(exports, "getModelDrivenDataAutomationId", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenDataAutomationId; } });
Object.defineProperty(exports, "getModelDrivenTablePage", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenTablePage; } });
Object.defineProperty(exports, "getModelDrivenFormField", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenFormField; } });
Object.defineProperty(exports, "getModelDrivenNavItem", { enumerable: true, get: function () { return model_driven_app_locators_1.getModelDrivenNavItem; } });
