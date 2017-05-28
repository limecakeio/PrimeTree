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
    /**Scrolls the displayed listings either forwards or backwards.
    Also calls to load more listings if user has scrolled to the end*/
    ListingComponent.prototype.scrollListings = function (direction) {
        var scrollSpeed = 750;
        var finalScrollPosition;
        /**Determine how far to shift the container per click in any direction*/
        var listingWidth = document.querySelector(".listing").clientWidth;
        /*Define the scroll distance based on the device viewport size*/
        if (this.windowWidth < 480) {
            this.scrollOffset = listingWidth;
        }
        else {
            this.scrollOffset = listingWidth * 2;
        }
        /*Set the distance and direction*/
        var scrollDistance;
        if (direction === "forward") {
            scrollDistance = '+=' + this.scrollOffset;
        }
        else {
            scrollDistance = '-=' + this.scrollOffset;
        }
        /*Scroll the listings*/
        jQuery(this.listingScroller.nativeElement).animate({
            scrollLeft: scrollDistance
        }, scrollSpeed, function () {
            /*If we have scrolled to the end we need to check for more listings*/
            var scrollPosition = this.setSliderControls();
            if (scrollPosition > this.listingWrapper.scrollWidth - this.listingWrapper.clientWidth - 100) {
                this.loadMoreListings();
            }
        }.bind(this));
    };
    ListingComponent.prototype.loadMoreListings = function () {
        //Show user that we are working
        var loadScreen = document.querySelector("#listing-loader");
        loadScreen.classList.add("active");
    };
    /**Sets the slider controls based on if they are required and returns the
    final scroll position as a number*/
    ListingComponent.prototype.setSliderControls = function () {
        //Get the scroll position
        var scrollPosition = this.listingWrapper.scrollLeft;
        var scrollMax = this.listingWrapper.scrollWidth - this.listingWrapper.clientWidth;
        //Check if we even need to offer scroll
        if (scrollMax > 0) {
            //Grab the controls
            var backwardControl = document.querySelector("#viewport-control-backward");
            var forwardControl = document.querySelector("#viewport-control-forward");
            if (scrollPosition > 0) {
                backwardControl.classList.add("active");
            }
            else {
                backwardControl.classList.remove("active");
            }
            if (scrollPosition < scrollMax) {
                forwardControl.classList.add("active");
            }
            else {
                forwardControl.classList.remove("active");
            }
        }
        return this.listingWrapper.scrollLeft;
    };
    /**Sets the listing viewport to achieve an optimal display across all devices*/
    ListingComponent.prototype.setViewport = function () {
        //Calculate the availble space for the viewport
        var headerHeight = document.querySelector("#header").clientHeight;
        var listingViewport = document.querySelector("#listing-viewport");
        var viewportHeight = this.windowHeight - headerHeight;
        listingViewport.style.height = viewportHeight + "px";
        /*Regardless of the device we are accessed from if a screen's height smaller
        than 650px we display the listings on a single line*/
        var viewPortMargin = 100; //Don't allow a listing to fill the entire container.
        var listings = document.querySelectorAll(".listing");
        var listingCubicSize;
        if (viewportHeight < 650) {
            //Display listings on a single row
            for (var i = 0; i < listings.length; i++) {
                listings[i].classList.add("single-row");
            }
            //Set the listing dimension
            listingCubicSize = viewportHeight - viewPortMargin;
        }
        else {
            //Display listings wihtin two rows
            for (var i = 0; i < listings.length; i++) {
                listings[i].classList.remove("single-row");
            }
            listingCubicSize = (viewportHeight / 2) - viewPortMargin;
        }
        //Apply the size to each listing and set its image-preview
        var listingPreviews = document.querySelectorAll(".listing-preview");
        for (var i = 0; i < listings.length; i++) {
            listingPreviews[i].style.width = listingCubicSize + "px";
            listingPreviews[i].style.height = listingCubicSize + "px";
            //Images to display in the OpenGraph ratio of 1:0.525
            listingPreviews[i].querySelector(".listing-image").style.height = listingCubicSize * 0.525 + "px";
        }
        this.setSliderControls();
    };
    ListingComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        /*Set required window dimensions*/
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        /*Set the listing container once component's been loaded*/
        this.listingWrapper = document.querySelector("#listing-wrapper");
        /**Set an event listener for when scroll occurs*/
        document.addEventListener('scroll', function (e) {
            /*If we have scrolled to the end we need to check for more listings*/
            var scrollPosition = _this.setSliderControls();
            if (scrollPosition > _this.listingWrapper.scrollWidth - _this.listingWrapper.clientWidth - 100) {
                _this.loadMoreListings();
            }
        }, true);
    };
    ListingComponent.prototype.onResize = function (event) {
        event.target.innerWidth;
        event.target.innerHeight;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.setViewport();
    };
    return ListingComponent;
}());
__decorate([
    core_1.ViewChild('listingScroller'),
    __metadata("design:type", core_1.ElementRef)
], ListingComponent.prototype, "listingScroller", void 0);
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