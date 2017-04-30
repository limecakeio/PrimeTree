var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user/user.model';
import { LoginService } from './network/login.service';
import { SecurityModel } from '../security/security.model';
import 'rxjs/add/operator/map';
var LoginComponent = (function () {
    function LoginComponent(login, securityService) {
        this.login = login;
        this.securityService = securityService;
        this.user = new User();
        this.formSubmitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    };
    LoginComponent.prototype.authenticate = function () {
        var _this = this;
        if (this.form.valid) {
            this.login.login(this.user).subscribe(function (response) {
                console.log(response.json());
                _this.securityService.setKey('x-author');
                _this.securityService.setSecret('nein');
            });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: 'login.component.html',
        providers: []
    }),
    __metadata("design:paramtypes", [LoginService, SecurityModel])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map