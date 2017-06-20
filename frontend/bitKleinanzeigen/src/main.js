// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
//
// import { AppModule } from './app/app.module';
// enableProdMode(); // enables component change after AfterViewInit
// platformBrowserDynamic().bootstrapModule(AppModule);
"use strict";
var platform_browser_1 = require("@angular/platform-browser");
var app_module_ngfactory_1 = require("../aot/src/app/app.module.ngfactory");
var core_1 = require("@angular/core");
core_1.enableProdMode();
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
//# sourceMappingURL=main.js.map