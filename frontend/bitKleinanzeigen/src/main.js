// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
//
// import { AppModule } from './app/app.module';
// enableProdMode(); // enables component change after AfterViewInit
// platformBrowserDynamic().bootstrapModule(AppModule);
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map