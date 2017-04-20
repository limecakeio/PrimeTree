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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var RESTService = (function () {
    function RESTService(http) {
        this.http = http;
        /**
         * the base server url
         */
        this.baseServerURL = 'http://localhost';
    }
    /**
     * creates a listing on the server
     * @param {string} type - The type of the listing
     * @param {string} listing - The listing object which shoud be created
     */
    RESTService.prototype.postListing = function (listingType, listing) {
        return this.http.post(this.baseServerURL + '/listings', {
            type: listingType,
            listing: JSON.stringify(listing)
        }).map(function (response) { return response.json(); });
    };
    /**
     * get all listings from the server
     */
    RESTService.prototype.getListings = function () {
        return this.http.get(this.baseServerURL + '/listings').map(function (response) { return response.json(); });
    };
    /**
     * get one listing from the Server
     * @param {number} id - an indentifier for the wanted listing
     */
    RESTService.prototype.getListing = function (id) {
        return this.http.get(this.baseServerURL + '/listings?id=' + id).map(function (response) { return response.json(); });
    };
    RESTService.prototype.setBaseUrl = function (baseUrl) {
        this.baseServerURL = baseUrl;
    };
    RESTService.prototype.setPort = function (port) {
        this.baseServerURL += ':' + port;
    };
    RESTService.prototype.get = function (url) {
        return this.http.get(this.baseServerURL + url);
    };
    RESTService.prototype.post = function (url, body) {
        return this.http.post(this.baseServerURL + url, body);
    };
    return RESTService;
}());
RESTService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RESTService);
export { RESTService };
//# sourceMappingURL=rest.service.js.map