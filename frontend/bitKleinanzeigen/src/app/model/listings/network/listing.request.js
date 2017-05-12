"use strict";
var network_request_1 = require("../../../network/network.request");
var ListingRequest = (function () {
    function ListingRequest() {
        this.locations = ['HD', 'MA'];
        this.networkRequest = new network_request_1.NetworkRequest();
    }
    ListingRequest.prototype.getRequest = function () {
        return this.networkRequest;
    };
    ListingRequest.prototype.setPriceMin = function (min) {
        this.networkRequest.addQuery('priceFrom', '' + min);
    };
    ListingRequest.prototype.setPriceMax = function (max) {
        this.networkRequest.addQuery('priceTo', '' + max);
    };
    ListingRequest.prototype.addLocation = function (location) {
        this.networkRequest.addQuery('location', location);
    };
    ListingRequest.prototype.setSortBy = function () {
        this.networkRequest.addQuery('sortBy', 'abc');
    };
    return ListingRequest;
}());
exports.ListingRequest = ListingRequest;
var LocationConverter = (function () {
    function LocationConverter() {
        this.locations = ['mannheim', 'frankfurt', 'karlsruhe', 'köln', 'münchen', 'stuttgart', 'nürnberg', 'zug'];
        this.licensePlate = ['MA', 'F', 'KA', 'K', 'M', 'S', 'N', 'Z'];
    }
    return LocationConverter;
}());
//# sourceMappingURL=listing.request.js.map