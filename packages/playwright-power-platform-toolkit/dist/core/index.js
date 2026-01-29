"use strict";
/**
 * Core Infrastructure Exports
 * Factory and Provider patterns for launching Power Platform apps
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = exports.AppLauncherFactory = void 0;
// App Launcher Factory
var app_launcher_factory_1 = require("./app-launcher.factory");
Object.defineProperty(exports, "AppLauncherFactory", { enumerable: true, get: function () { return app_launcher_factory_1.AppLauncherFactory; } });
// App Provider
var app_provider_1 = require("./app-provider");
Object.defineProperty(exports, "AppProvider", { enumerable: true, get: function () { return app_provider_1.AppProvider; } });
