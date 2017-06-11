"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var can_activate_user_model_1 = require("./can-activate-user.model");
var authentication_component_1 = require("../authentication/authentication.component");
var listing_overview_viewport_component_1 = require("../model/listings/listing/preview/listing-overview-viewport.component");
var routes = [
    {
        path: 'home',
        component: listing_overview_viewport_component_1.ListingOverviewViewportComponent,
        canActivate: [can_activate_user_model_1.CanActivateUser]
    }, {
        path: 'user/login',
        component: authentication_component_1.AuthenticationComponent
    },
    {
        path: '',
        component: listing_overview_viewport_component_1.ListingOverviewViewportComponent,
        canActivate: [can_activate_user_model_1.CanActivateUser]
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
        providers: [can_activate_user_model_1.CanActivateUser]
    })
], RoutingModule);
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map