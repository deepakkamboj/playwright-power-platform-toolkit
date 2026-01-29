"use strict";
/**
 * Shared Types and Interfaces for Power Apps Page Objects
 * Extracted and enhanced from lib/old
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointURL = exports.AppType = exports.AppLaunchMode = exports.CanvasControlType = void 0;
/**
 * Canvas App Control Types
 */
var CanvasControlType;
(function (CanvasControlType) {
    CanvasControlType["Button"] = "Button";
    CanvasControlType["TextInput"] = "TextInput";
    CanvasControlType["Label"] = "Label";
    CanvasControlType["Dropdown"] = "Dropdown";
    CanvasControlType["Gallery"] = "Gallery";
    CanvasControlType["Form"] = "Form";
    CanvasControlType["Icon"] = "Icon";
    CanvasControlType["Image"] = "Image";
    CanvasControlType["Checkbox"] = "Checkbox";
    CanvasControlType["Toggle"] = "Toggle";
    CanvasControlType["Slider"] = "Slider";
    CanvasControlType["DatePicker"] = "DatePicker";
    CanvasControlType["Timer"] = "Timer";
    CanvasControlType["HTMLText"] = "HTMLText";
    CanvasControlType["Camera"] = "Camera";
    CanvasControlType["Microphone"] = "Microphone";
    CanvasControlType["BarcodeScanner"] = "BarcodeScanner";
    CanvasControlType["DataTable"] = "DataTable";
    CanvasControlType["Chart"] = "Chart";
    CanvasControlType["Shape"] = "Shape";
    CanvasControlType["ComboBox"] = "ComboBox";
})(CanvasControlType || (exports.CanvasControlType = CanvasControlType = {}));
/**
 * App Launch Mode
 */
var AppLaunchMode;
(function (AppLaunchMode) {
    AppLaunchMode["Play"] = "play";
    AppLaunchMode["Edit"] = "edit";
    AppLaunchMode["Preview"] = "preview";
})(AppLaunchMode || (exports.AppLaunchMode = AppLaunchMode = {}));
/**
 * App Type
 */
var AppType;
(function (AppType) {
    AppType["Canvas"] = "Canvas";
    AppType["ModelDriven"] = "Model-driven";
    AppType["Portal"] = "Portal";
})(AppType || (exports.AppType = AppType = {}));
/**
 * Power Platform Endpoint URLs
 */
var EndPointURL;
(function (EndPointURL) {
    EndPointURL["home"] = "/home";
    EndPointURL["apps"] = "/apps";
    EndPointURL["solutions"] = "/solutions";
    EndPointURL["connectionEndPoint"] = "/connections";
    EndPointURL["tablesEndPoint"] = "/entities";
    EndPointURL["appEndPoints"] = "/apps";
    EndPointURL["discoverAll"] = "/discover";
    EndPointURL["cards"] = "/cards";
    EndPointURL["chatBot"] = "/bot/create";
    EndPointURL["aiBuilderHub"] = "/aibuilder/hub";
    EndPointURL["websites"] = "/websites";
})(EndPointURL || (exports.EndPointURL = EndPointURL = {}));
