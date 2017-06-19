"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var app_module_1 = require("./app/app.module");
core_1.enableProdMode(); // enables component change after AfterViewInit
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
// import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
// import { enableProdMode } from '@angular/core';
//
// enableProdMode();
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map