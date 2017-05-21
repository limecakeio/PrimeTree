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
var listing_controller_1 = require("./network/listing.controller");
var listing_request_1 = require("./network/listing.request");
var ListingReposetory = (function () {
    function ListingReposetory(controller) {
        this.controller = controller;
        this.listings = [];
        this.update();
    }
    ListingReposetory.prototype.addListing = function (listing) {
        this.listings.push(listing);
    };
    ListingReposetory.prototype.removeListing = function (id) {
        var isRemoved = false;
        for (var i = 0; i < this.listings.length && !isRemoved; i++) {
            if (this.listings[i].id === id) {
                this.listings.splice(i, 1);
                isRemoved = true;
                this.controller.removeListing(id).subscribe(function (response) {
                    console.log('DEL: ' + id + ' ' + response);
                });
            }
        }
        return isRemoved;
    };
    ListingReposetory.prototype.update = function () {
        var _this = this;
        this.listings = [];
        // console.log('update');
        this.controller.getActiveListings(new listing_request_1.ListingRequest()).subscribe(function (ids) {
            // console.log(ids)
            var i = 0;
            var pairArray = [];
            ids.forEach(function (id) {
                _this.controller.getListing(id).subscribe(function (listing) {
                    if (i % 2 === 0) {
                        pairArray = [];
                        pairArray.push(listing);
                    }
                    else {
                        pairArray.push(listing);
                        _this.listings.push(pairArray);
                    }
                    i++;
                });
            });
            if (i % 2 === 1) {
                _this.listings.push(pairArray);
            }
            console.log(_this.listings);
        }, function (error) {
            console.log('getall - error');
            console.log(error);
        }, function () {
            console.log('getall - complete');
        });
    };
    return ListingReposetory;
}());
ListingReposetory = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [listing_controller_1.ListingController])
], ListingReposetory);
exports.ListingReposetory = ListingReposetory;
//# sourceMappingURL=listing.reposetory.js.map