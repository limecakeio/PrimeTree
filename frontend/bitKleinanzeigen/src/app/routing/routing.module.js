var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanActivateUser } from './can-activate-user.model';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { ListingOverviewViewportComponent } from '../model/listings/listing/preview/listing-overview-viewport.component';
var routes = [
    {
        path: 'home',
        component: ListingOverviewViewportComponent,
        canActivate: [CanActivateUser]
    }, {
        path: 'user/login',
        component: AuthenticationComponent
    },
    {
        path: '',
        component: ListingOverviewViewportComponent,
        canActivate: [CanActivateUser]
    }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
        providers: [CanActivateUser]
    })
], RoutingModule);
export { RoutingModule };
//# sourceMappingURL=routing.module.js.map