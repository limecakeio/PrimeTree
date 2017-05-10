"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var sellitem_model_1 = require("../sellitem/sellitem.model");
var network_service_1 = require("../../../network/network.service");
var network_request_1 = require("../../../network/network.request");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ListingController = (function () {
    function ListingController(networkService) {
        this.networkService = networkService;
    }
    ListingController.prototype.postListing = function (listingType, listing, images) {
        var request = new network_request_1.NetworkRequest();
        request.setHttpMethod(http_1.RequestMethod.Post)
            .setHostname('141.19.145.175')
            .setPort(8080)
            .addPath('listing')
            .addPath('create')
            .setBody({
            /*  type: listingType,
              listing: listing,
              files: images*/
            newListingData: {
                title: listing.title,
                listingDescription: listing.description,
                price: listing.price,
                listingType: 'SellItem'
            }
        }).addHeader('Content-Type', 'application/json');
        return this.networkService.send(request).map(function (response) { return response.json(); });
    };
    ListingController.prototype.postImage = function (listingId, image) {
        var formData = new FormData();
        formData.append('file[]', image);
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Post)
            .setHostname('localhost')
            .setPort(3500)
            .addPath('listing')
            .addPath('image')
            .setBody({
            id: listingId,
            image: formData
        });
        return this.networkService.send(request);
    };
    ListingController.prototype.getAllListings = function () {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .setHostname('141.19.145.175')
            .setPort(8080)
            .addPath('listing')
            .addPath('getall');
        return this.networkService.send(request).map(function (response) {
            return response.json();
        });
    };
    ListingController.prototype.getListing = function (id) {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .setHostname('141.19.145.175')
            .setPort(8080)
            .addPath('listing')
            .addPath('getone')
            .addPath(id + '');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            var listing = new sellitem_model_1.SellItem();
            listing.title = body.title;
            listing.description = body.description;
            listing.id = body.listingId;
            listing.owner = body.owner;
            listing.price = body.price;
            return listing;
        });
    };
    ListingController.prototype.removeListing = function (id) {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Delete)
            .setHostname('141.19.145.175')
            .setPort(8080)
            .addPath('listing')
            .addPath('delete')
            .addPath(id + '');
        return this.networkService.send(request);
    };
    return ListingController;
}());
ListingController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], ListingController);
exports.ListingController = ListingController;
//# sourceMappingURL=listing.controller.js.map