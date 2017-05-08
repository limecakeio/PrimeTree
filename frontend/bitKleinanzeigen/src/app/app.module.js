"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var security_module_1 = require("./security/security.module");
var network_module_1 = require("./network/network.module");
var listing_modul_1 = require("./model/listings/listing.modul");
var app_component_1 = require("./app.component");
var login_module_1 = require("./login/login.module");
var security_model_1 = require("./security/security.model");
var app_routing_1 = require("./app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, security_module_1.SecurityModule, network_module_1.NetworkModule, listing_modul_1.ListingModule, login_module_1.LoginModul, app_routing_1.routing],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [security_model_1.SecurityModel]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map