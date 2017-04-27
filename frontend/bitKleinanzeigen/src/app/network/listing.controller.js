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
import { RequestMethod } from '@angular/http';
import { NetworkRequest } from './network.request';
import 'rxjs/add/operator/map';
import { NetworkService } from './network.service';
var ListingRequest = (function () {
    function ListingRequest(/*private networkRequest : NetworkRequest, */ networkService) {
        this.networkService = networkService;
    }
    ListingRequest.prototype.postListing = function (listingType, listing) {
        /*  return this.networkRequest
          .setHttpMethod(HttpMethod.POST)
          .setPort(8080)
          .addPath('listing/create')
          .setBody({
            newListingData: {
              title : listing.title,
              listingDescription : listing.description,
              price: listing.price,
              listingType: listingType
            }
          })
          .sendRequest()
          .map(response => response.json());*/
        var request = new NetworkRequest();
        request.
            setHttpMethod(RequestMethod.Post)
            .setPort(8080)
            .addPath('listing')
            .addPath('create')
            .setBody({
            newListingData: {
                title: listing.title,
                listingDescription: listing.description,
                price: listing.price,
                listingType: listingType
            }
        });
        return this.networkService.send(request).map(function (response) { return response.json(); });
    };
    ListingRequest.prototype.getListing = function () {
        /*  return this.networkRequest.
          setHttpMethod(HttpMethod.GET)
          .setPort(8080)
          .addPath('listing/get')
          .addQuery('listingId', '1')
          .sendRequest()
          .map(response => response.json());*/
        var request = new NetworkRequest();
        request.setHttpMethod(RequestMethod.Get)
            .setPort(8080)
            .addPath('listing')
            .addPath('get')
            .addQuery('listingId', '1');
        return this.networkService.send(request).map(function (response) { return response.json(); });
    };
    ListingRequest.prototype.getAllListings = function () {
        /*  return this.networkRequest.
          setHttpMethod(HttpMethod.GET)
          .addPath('listings')
          .sendRequest()
          .map(response => response.json());*/
        var request = new NetworkRequest();
        request.setHttpMethod(RequestMethod.Get);
        return this.networkService.send(request).map(function (response) { return response.json(); });
    };
    return ListingRequest;
}());
ListingRequest = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NetworkService])
], ListingRequest);
export { ListingRequest };
//# sourceMappingURL=listing.controller.js.map