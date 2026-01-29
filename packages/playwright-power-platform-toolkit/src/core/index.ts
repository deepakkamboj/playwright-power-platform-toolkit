/**
 * Core Infrastructure Exports
 * Factory and Provider patterns for launching Power Platform apps
 */

// App Launcher Interface
export { IAppLauncher, AppMetadata } from './app-launcher.interface';

// App Launcher Factory
export { AppLauncherFactory } from './app-launcher.factory';

// App Provider
export { AppProvider, LaunchAppConfig } from './app-provider';
