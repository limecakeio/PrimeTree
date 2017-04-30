var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { NetworkService } from '../../network/network.service';
import { RequestMethod } from '@angular/http';
var LoginService = (function () {
    function LoginService(network) {
        this.network = network;
    }
    LoginService.prototype.login = function (user) {
        var request = this.network.networkRequest();
        request
            .setHttpMethod(RequestMethod.Post)
            .setPort(3500)
            .addPath('listing')
            .addPath('user')
            .addPath('login')
            .setBody(user);
        return this.network.send(request);
    };
    LoginService.prototype.logout = function () {
        var request = this.network.networkRequest();
        request
            .setHttpMethod(RequestMethod.Post)
            .setPort(3500)
            .addPath('user')
            .addPath('logout');
        return this.network.send(request);
    };
    return LoginService;
}());
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NetworkService])
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map