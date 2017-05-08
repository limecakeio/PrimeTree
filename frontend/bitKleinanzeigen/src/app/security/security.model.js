"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SecurityModel = (function () {
    function SecurityModel() {
        this.authenticated = false;
    }
    SecurityModel.prototype.setKey = function (key) {
        this.authenticated = true;
        this.key = key;
    };
    SecurityModel.prototype.setSecret = function (secret) {
        this.authenticated = true;
        this.secret = secret;
    };
    SecurityModel.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    SecurityModel.prototype.getKey = function () {
        return this.key;
    };
    SecurityModel.prototype.getSecret = function () {
        return this.secret;
    };
    return SecurityModel;
}());
SecurityModel = __decorate([
    core_1.Injectable()
], SecurityModel);
exports.SecurityModel = SecurityModel;
//# sourceMappingURL=security.model.js.map