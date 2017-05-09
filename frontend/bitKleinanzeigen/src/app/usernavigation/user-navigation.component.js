"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var security_model_1 = require("../security/security.model");
var router_1 = require("@angular/router");
var login_service_1 = require("../login/network/login.service");
var UserNavigationComponent = (function () {
    function UserNavigationComponent(securityModel, router, loginService) {
        this.securityModel = securityModel;
        this.router = router;
        this.loginService = loginService;
        this.isAuthenticated = this.securityModel.authenticated;
    }
    UserNavigationComponent.prototype.create = function () {
        this.router.navigate(['create/sellitem']);
    };
    UserNavigationComponent.prototype.home = function () {
        this.router.navigate(['home']);
    };
    UserNavigationComponent.prototype.logout = function () {
        var _this = this;
        this.loginService.logout().subscribe(function (res) {
            _this.router.navigate(['']);
        });
    };
    return UserNavigationComponent;
}());
UserNavigationComponent = __decorate([
    core_1.Component({
        selector: 'user-nav',
        templateUrl: 'user-navigation.component.html'
    }),
    __metadata("design:paramtypes", [security_model_1.SecurityModel,
        router_1.Router,
        login_service_1.LoginService])
], UserNavigationComponent);
exports.UserNavigationComponent = UserNavigationComponent;
//# sourceMappingURL=user-navigation.component.js.map