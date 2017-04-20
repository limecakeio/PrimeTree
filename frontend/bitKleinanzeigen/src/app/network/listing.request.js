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
import { NetworkRequest, HttpMethod } from './network.request';
import 'rxjs/add/operator/map';
var ListingRequest = (function () {
    function ListingRequest(networkRequest) {
        this.networkRequest = networkRequest;
    }
    ListingRequest.prototype.postListing = function (listingType, listing) {
        return this.networkRequest
            .setHttpMethod(HttpMethod.POST)
            .addPath('listings').
            setBody({ type: listingType, listing: listing })
            .sendRequest()
            .map(function (response) { return response.json(); });
    };
    ListingRequest.prototype.getListing = function () {
        return this.networkRequest.
            setHttpMethod(HttpMethod.GET)
            .addPath('/listings')
            .addQuery('id', '5')
            .sendRequest()
            .map(function (response) { return response.json(); });
    };
    ListingRequest.prototype.getAllListings = function () {
        return this.networkRequest.
            setHttpMethod(HttpMethod.GET)
            .addPath('/listings')
            .sendRequest()
            .map(function (response) { return response.json(); });
    };
    Object.defineProperty(ListingRequest.prototype, "request", {
        get: function () {
            return this.networkRequest;
        },
        enumerable: true,
        configurable: true
    });
    return ListingRequest;
}());
ListingRequest = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NetworkRequest])
], ListingRequest);
export { ListingRequest };
//# sourceMappingURL=listing.request.js.map