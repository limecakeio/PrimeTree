var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationModule } from './authentication/authentication.module';
import { NavigationModule } from './navigation/navigation';
import { ListingsModule } from './model/listings/listings.module';
import { UserModule } from './model/user/user';
import { SharedModule } from './shared/shared.module';
import { NetworkModule } from './network/network.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.prototype.ngOnInit = function () {
        // console.log(this);
    };
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            NetworkModule,
            RouterModule,
            RoutingModule,
            AuthenticationModule,
            NavigationModule,
            ListingsModule,
            UserModule,
            SharedModule
        ],
        declarations: [AppComponent],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map