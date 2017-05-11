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
                this.controller.removeListing(id).subscribe(function (res) {
                    // console.log('listing removed');
                    // console.log(res);
                    // console.log('listing removed');
                });
            }
        }
        return isRemoved;
    };
    ListingReposetory.prototype.update = function () {
        var _this = this;
        this.listings = [];
        this.controller.getAllListings().subscribe(function (ids) {
            ids.forEach(function (id) {
                _this.controller.getListing(id).subscribe(function (listing) {
                    _this.listings.push(listing);
                });
            });
        }, function (error) {
            // console.log('getall - error')
            // console.log(error);
        }, function () {
            // console.log('getall - complete')
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