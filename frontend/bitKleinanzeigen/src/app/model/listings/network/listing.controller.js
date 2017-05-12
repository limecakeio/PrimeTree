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
    ListingController.prototype.postListing = function (listingType, listing) {
        var request = new network_request_1.NetworkRequest();
        request.setHttpMethod(http_1.RequestMethod.Post)
            .addPath('listing')
            .addPath('create')
            .setBody(listing)
            .addHeader('Content-Type', 'application/json');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            if (body.status !== null || body.id) {
                throw new Error(body.message);
            }
            return body.id;
        });
    };
    ListingController.prototype.putImage = function (listingId, image) {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Put)
            .addPath('upload')
            .addPath('listing-image')
            .addPath(listingId + '')
            .setBody({});
        return this.networkService.send(request).map(function (response) { return response.json(); });
    };
    ListingController.prototype.getAllActiveListings = function () {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .addPath('listings')
            .addPath('active');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            if (body.status !== null) {
                return body.ids;
            }
            else {
                console.log(body.message);
            }
            return [];
        });
    };
    ListingController.prototype.getActiveListings = function (listingRequest) {
        var request = listingRequest.getRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .addPath('listings')
            .addPath('active');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            if (body.status !== null) {
                return body.ids;
            }
            else {
                console.log(body.message);
            }
            return [];
        });
    };
    ;
    ListingController.prototype.getAllInactiveListings = function () {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .addPath('listings')
            .addPath('inactive');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            if (body.status !== null) {
                return body.ids;
            }
            else {
                console.log(body.message);
            }
            return [];
        });
    };
    ListingController.prototype.getInactiveListings = function (listingRequest) {
        var request = listingRequest.getRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .addPath('listings')
            .addPath('inactive');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            if (body.status !== null) {
                return body.ids;
            }
            else {
                console.log(body.message);
            }
            return [];
        });
    };
    ListingController.prototype.getListing = function (id) {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Get)
            .addPath('listing')
            .addPath('getone')
            .addPath(id + '');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            var listing = new sellitem_model_1.SellItem();
            return listing;
        });
    };
    ListingController.prototype.removeListing = function (id) {
        var request = this.networkService.networkRequest();
        request.setHttpMethod(http_1.RequestMethod.Delete)
            .addPath('listing')
            .addPath('delete')
            .addPath(id + '');
        return this.networkService.send(request).map(function (response) {
            var body = response.json();
            var message = body.message;
            if (message === 'OK') {
                return true;
            }
            else {
                return false;
            }
        });
    };
    return ListingController;
}());
ListingController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], ListingController);
exports.ListingController = ListingController;
//# sourceMappingURL=listing.controller.js.map