"use strict";
/**
 * Pages Index
 * Export all page object models
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDrivenAppPage = exports.CanvasAppPage = exports.PowerAppsPage = void 0;
var power_apps_page_1 = require("./power-apps.page");
Object.defineProperty(exports, "PowerAppsPage", { enumerable: true, get: function () { return power_apps_page_1.PowerAppsPage; } });
var canvas_app_page_1 = require("./canvas-app.page");
Object.defineProperty(exports, "CanvasAppPage", { enumerable: true, get: function () { return canvas_app_page_1.CanvasAppPage; } });
var model_driven_app_page_1 = require("./model-driven-app.page");
Object.defineProperty(exports, "ModelDrivenAppPage", { enumerable: true, get: function () { return model_driven_app_page_1.ModelDrivenAppPage; } });
