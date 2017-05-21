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
var listing_reposetory_1 = require("./listing.reposetory");
var ListingComponent = (function () {
    function ListingComponent(repo) {
        this.repo = repo;
        this.listings = this.repo.listings;
    }
    ListingComponent.prototype.getListings = function () {
        return this.repo.listings;
    };
    /**Scrolls the displayed listings either forwards or backwards*/
    ListingComponent.prototype.scrollListings = function (direction) {
        var leftPos = parseInt(this.listingWrapper.style.left.replace("[^\\d-]", ""));
        /**Determine how far to shift the container per click in any direction*/
        var listingWidth = document.querySelector(".listing-container").clientWidth;
        /*Define the scroll distance based on the device viewport size*/
        if (this.windowWidth < 480) {
            this.scrollOffset = listingWidth / 2; //We are displaying them side-by-side
        }
        else {
            this.scrollOffset = 3 * listingWidth;
        }
        /*Scroll the listings*/
        if (direction === "forward") {
            this.listingWrapper.style.left = (leftPos - this.scrollOffset) + "px";
        }
        else {
            this.listingWrapper.style.left = (leftPos + this.scrollOffset) + "px";
        }
        this.setSliderControls();
    };
    /*Determines, based on the listings wrapper's position within the viewport,
    if controls are required*/
    ListingComponent.prototype.setSliderControls = function () {
        var backwardControl = document.querySelector("#viewport-control-backward");
        var forwardControl = document.querySelector("#viewport-control-forward");
        var leftPos = parseInt(this.listingWrapper.style.left.replace("[^\\d-]", ""));
        var listingWidth = document.querySelector(".listing-container").clientWidth;
        if (this.listingWrapper) {
            //See if we require a forward button
            if (this.listingWrapper.clientWidth < this.windowWidth) {
                forwardControl.classList.add("hidden");
            }
            else if (-(leftPos) > this.listingWrapper.clientWidth - listingWidth || this.listingWrapper.clientWidth <= this.windowWidth) {
                /*Potentially the end of the listings*/
                //TODO try to load more listings
                forwardControl.classList.add("hidden");
            }
            else {
                forwardControl.classList.remove("hidden");
            }
            //See if we require a backward button
            if (leftPos >= 0) {
                backwardControl.classList.add("hidden");
            }
            else {
                backwardControl.classList.remove("hidden");
            }
        }
    };
    ListingComponent.prototype.setListingDimensions = function () {
        /*Determine how many listings to display horizontally based on the screen size*/
        var divisionFactor = 0;
        if (this.windowWidth < 375) {
            divisionFactor = 1;
        }
        else if (this.windowWidth < 700) {
            divisionFactor = 2;
        }
        else if (this.windowWidth < 900) {
            divisionFactor = 3;
        }
        else {
            divisionFactor = 4;
        }
        //Set the updated with on all listings
        var listings = document.querySelectorAll(".listing-preview");
        for (var i = 0; i < listings.length; i++) {
            var margin = listings[i].offsetLeft;
            listings[i].style.width = (this.windowWidth / divisionFactor) - margin + "px";
        }
    };
    ListingComponent.prototype.ngAfterViewInit = function () {
        /*Set required window dimensions*/
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        /*Set the listing container once component's been loaded*/
        this.listingWrapper = document.querySelector("#listing-container-wrapper");
    };
    /**Keeping an eye if the window size changes to adapt the listing viewport*/
    ListingComponent.prototype.onResize = function (event) {
        event.target.innerWidth;
        event.target.innerHeight;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.setListingDimensions();
        this.setSliderControls();
    };
    return ListingComponent;
}());
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListingComponent.prototype, "onResize", null);
ListingComponent = __decorate([
    core_1.Component({
        selector: 'listings',
        templateUrl: './listing.component.html',
        styleUrls: ['./listing.component.css']
    }),
    __metadata("design:paramtypes", [listing_reposetory_1.ListingReposetory])
], ListingComponent);
exports.ListingComponent = ListingComponent;
//# sourceMappingURL=listing.component.js.map