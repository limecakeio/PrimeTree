"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var user_navigation_component_1 = require("./user-navigation.component");
var common_1 = require("@angular/common");
var UserNavigationModule = (function () {
    function UserNavigationModule() {
    }
    return UserNavigationModule;
}());
UserNavigationModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        exports: [user_navigation_component_1.UserNavigationComponent],
        declarations: [user_navigation_component_1.UserNavigationComponent],
        providers: []
    })
], UserNavigationModule);
exports.UserNavigationModule = UserNavigationModule;
//# sourceMappingURL=user-navigation.module.js.map