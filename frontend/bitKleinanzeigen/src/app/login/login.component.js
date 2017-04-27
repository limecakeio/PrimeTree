var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { User } from './login.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
var LoginComponent = (function () {
    function LoginComponent() {
        this.user = new User();
        this.formSubmitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.form = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    };
    LoginComponent.prototype.authenticate = function (loginForm) {
        if (this.form.valid) {
            console.log(this.form.controls);
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: 'login.component.html',
        providers: []
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map