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
var CanActivateUser = (function () {
    function CanActivateUser(securityModel) {
        this.securityModel = securityModel;
    }
    CanActivateUser.prototype.canActivate = function () {
        return this.securityModel.isAuthenticated();
    };
    return CanActivateUser;
}());
CanActivateUser = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [security_model_1.SecurityModel])
], CanActivateUser);
exports.CanActivateUser = CanActivateUser;
//# sourceMappingURL=canActivateUser.model.js.map