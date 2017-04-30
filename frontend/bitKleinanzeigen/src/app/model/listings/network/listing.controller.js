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
import { NetworkService } from '../../../network/network.service';
import { NetworkRequest } from '../../../network/network.request';
import { RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
var ListingController = (function () {
    function ListingController(networkService) {
        this.networkService = networkService;
    }
    ListingController.prototype.postListing = function (listingType, listing) {
        var request = new NetworkRequest();
        request.setHttpMethod(RequestMethod.Post)
            .setPort(3500)
            .addPath('listing')
            .addPath('create')
            .setBody({
            type: listingType,
            listing: listing
        });
        return this.networkService.send(request).map(function (response) { return response.json(); });
    };
    return ListingController;
}());
ListingController = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NetworkService])
], ListingController);
export { ListingController };
//# sourceMappingURL=listing.controller.js.map