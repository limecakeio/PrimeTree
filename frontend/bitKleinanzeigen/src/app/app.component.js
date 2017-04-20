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
import { Listing } from './model/listing.model';
import { ListingRequest } from './network/listing.controller';
import { NetworkRequest } from './network/network.controller';
import { RESTService } from './network/rest.service';
var AppComponent = (function () {
    function AppComponent(network) {
        this.network = network;
        this.name = 'Angular';
        this.listings = [];
    }
    /**
     * test for the rest.service
     * is not necessary for the app
     */
    AppComponent.prototype.updateListings = function () {
        /*  this.restService.postListing('SellItem', new Listing()).subscribe(res => {
            console.log(res);
          });
          this.restService.getListings().subscribe(res => {console.log(res)});*/
        //    this.network.postListing('aa', new Listing());
        this.network.postListing('aa', new Listing()).subscribe(function (res) { return console.log(res); });
    };
    ;
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'bITKleinanzeigen',
        template: "<h1 (click)=\"updateListings()\">Hello {{name}}</h1>",
        providers: [ListingRequest, RESTService, NetworkRequest]
    }),
    __metadata("design:paramtypes", [ListingRequest])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map