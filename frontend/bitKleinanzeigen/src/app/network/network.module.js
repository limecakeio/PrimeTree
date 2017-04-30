var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NetworkService } from './network.service';
import { SecurityModule } from '../security/security.module';
import { SecurityModel } from '../security/security.model';
var NetworkModule = (function () {
    function NetworkModule() {
    }
    return NetworkModule;
}());
NetworkModule = __decorate([
    NgModule({
        imports: [HttpModule, SecurityModule],
        declarations: [],
        providers: [NetworkService, SecurityModel],
        exports: [HttpModule]
    })
], NetworkModule);
export { NetworkModule };
//# sourceMappingURL=network.module.js.map