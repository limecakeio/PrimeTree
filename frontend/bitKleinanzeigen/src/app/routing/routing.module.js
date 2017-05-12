"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("../login/login.component");
var listing_component_1 = require("../model/listings/listing.component");
var canActivateUser_model_1 = require("../routing/canActivateUser.model");
var sellitem_create_component_1 = require("../model/listings/form/create/sellitem-create.component");
var routes = [
    {
        path: 'create/sellitem',
        component: sellitem_create_component_1.SellItemCreateFormComponent,
        canActivate: [canActivateUser_model_1.CanActivateUser]
    }, {
        path: 'home',
        component: listing_component_1.ListingComponent,
        canActivate: [canActivateUser_model_1.CanActivateUser]
    }, {
        path: '',
        component: login_component_1.LoginComponent
    }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
        providers: [canActivateUser_model_1.CanActivateUser]
    })
], RoutingModule);
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map