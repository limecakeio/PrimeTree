"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var network_service_1 = require("./network.service");
var network_request_1 = require("./network.request");
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var security_model_1 = require("../security/security.model");
var MockNetworkService = (function (_super) {
    __extends(MockNetworkService, _super);
    function MockNetworkService(securityModel) {
        var _this = _super.call(this) || this;
        _this.securityModel = securityModel;
        _this.mock = new MockServer(_this.securityModel);
        return _this;
    }
    MockNetworkService.prototype.send = function (request) {
        return this.mock.receive(request);
    };
    MockNetworkService.prototype.networkRequest = function () {
        var networkRequest = new network_request_1.NetworkRequest();
        networkRequest.setHostname('141.19.145.175').setPort(8080);
        return networkRequest;
    };
    return MockNetworkService;
}(network_service_1.NetworkService));
MockNetworkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [security_model_1.SecurityModel])
], MockNetworkService);
exports.MockNetworkService = MockNetworkService;
var MockServer = (function () {
    function MockServer(securityModel) {
        this.securityModel = securityModel;
        this.listingReposetory = [
            {
                title: "Test Listing 1",
                createDate: 1494837196787,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 3000,
                type: "SellItem",
                condition: "bad",
                id: 1,
                active: true,
                creator: "akessler"
            },
            {
                title: "Test Listing 2",
                createDate: 1494837196787,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 5000,
                type: "SellItem",
                condition: "bad",
                id: 2,
                active: true,
                creator: "akessler"
            },
            {
                title: "Test Listing 3",
                createDate: 1494837196787,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 1000,
                type: "SellItem",
                condition: "bad",
                id: 3,
                active: true,
                creator: "akessler"
            },
            {
                title: "Test Listing 4",
                createDate: 1494837196790,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 3000,
                type: "SellItem",
                condition: "bad",
                id: 4,
                active: true,
                creator: "akessler"
            },
            {
                title: "Test Listing 5",
                createDate: 1494837196790,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 3000,
                type: "SellItem",
                condition: "bad",
                id: 5,
                active: true,
                creator: "mmustermann"
            },
            {
                title: "Test Listing 6",
                createDate: 1494837196790,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 3000,
                type: "SellItem",
                condition: "bad",
                id: 6,
                active: true,
                creator: "npilch"
            },
            {
                title: "Test Listing 7",
                createDate: 1494837196790,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 3000,
                type: "SellItem",
                condition: "bad",
                id: 7,
                active: true,
                creator: "rvladimirskij"
            },
            {
                title: "Test Listing 8",
                createDate: 1494837196790,
                description: "This is a listing for test purposes",
                expiryDate: null,
                location: "mannheim",
                price: 3000,
                type: "SellItem",
                condition: "bad",
                id: 8,
                active: true,
                creator: "fkutz"
            }
        ];
        this.userReposetory = [{
                username: 'wschramm',
                password: '123'
            }, {
                username: 'akessler',
                password: '123'
            }, {
                username: 'mmustermann',
                password: '123'
            }];
    }
    MockServer.prototype.notFound = function (networkRequest) {
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var options = new http_1.ResponseOptions();
        options.status = 404;
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.baseResponseOptions = function () {
        var options = new http_1.ResponseOptions();
        return options;
    };
    MockServer.prototype.receive = function (networkRequest) {
        var response;
        var notFound = true;
        var url = networkRequest.getUrl();
        var paths = url.split('/');
        if (paths[3] === 'listing') {
            if (paths.length >= 5) {
                if (paths[4] === 'create') {
                    notFound = false;
                    return this.createListing(networkRequest);
                }
                else if (paths[4] === 'upload') {
                    // if (paths[4] === 'main-image') {
                    return this.listingMainImageUpload(networkRequest);
                }
                else {
                    switch (networkRequest.getHttpMethod()) {
                        case 0:
                            return this.getListing(networkRequest);
                        case 1:
                            return this.editListing(networkRequest);
                        case 3:
                            return this.deleteListing(networkRequest);
                        case 4:
                            return this.deleteListing(networkRequest);
                    }
                }
            }
        }
        else if (paths[3] === 'user') {
        }
        else if (paths[3] === 'login') {
            notFound = false;
            return this.login(networkRequest);
        }
        else if (paths[3] === 'logout') {
            notFound = false;
            return this.logout(networkRequest);
        }
        else if (paths[3] === 'upload') {
            if (paths[4] === 'main-image') {
                return this.listingMainImageUpload(networkRequest);
            }
        }
        else if (paths[3] === 'listings') {
            if (paths[4] === 'active') {
                notFound = false;
                return this.getAllActiveListings(networkRequest);
            }
            else if (paths[4] === 'inactive') {
                notFound = false;
                return this.getAllInactiveListings(networkRequest);
            }
        }
        return this.notFound(networkRequest);
    };
    MockServer.prototype.login = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var body = networkRequest.getBody();
        var options = this.baseResponseOptions();
        var exisitingUser = false;
        for (var i = 0; i < this.userReposetory.length && !exisitingUser; i++) {
            // console.log(this.userReposetory[i], this.securityModel);
            if (this.userReposetory[i].username === this.securityModel.username &&
                this.userReposetory[i].password === this.securityModel.password) {
                exisitingUser = true;
            }
        }
        if (exisitingUser) {
            options.status = 200;
        }
        else {
            options.status = 401;
        }
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.logout = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var options = this.baseResponseOptions();
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.createListing = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var body = networkRequest.getBody();
        var missingProperties = this.getMissingProperties(body);
        var options = this.baseResponseOptions();
        if (missingProperties.length === 0) {
            body.id = this.listingReposetory.length + 1;
            body.active = true;
            body.creator = this.securityModel.username;
            console.log(body); // For testing purposes
            this.listingReposetory.push(body);
            // console.log(this.listingReposetory);
            options.status = 201;
            options.body = {
                id: this.listingReposetory.length
            };
        }
        else {
            options.status = 400;
            options.body = {
                status: 'NOT OK',
                message: 'missing: ' + JSON.stringify(missingProperties)
            };
        }
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.getMissingProperties = function (listing) {
        var baseProperties = ['description', 'createDate', 'expiryDate', 'location', 'title', 'type'];
        var missingProperties = [];
        for (var i = 0; i < baseProperties.length; i++) {
            if (!listing.hasOwnProperty(baseProperties[i])) {
                missingProperties.push(baseProperties[i]);
            }
        }
        if (listing.type === 'SellItem') {
            var properties = ['condition', 'price'];
            for (var i = 0; i < properties.length; i++) {
                if (!listing.hasOwnProperty(properties[i])) {
                    missingProperties.push(properties[i]);
                }
            }
        }
        return missingProperties;
    };
    MockServer.prototype.getAllActiveListings = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        // console.log(this.listingReposetory);
        var ids = [];
        for (var i = 0; i < this.listingReposetory.length; i++) {
            if (this.listingReposetory[i].active) {
                ids.push(this.listingReposetory[i].id);
            }
        }
        var options = this.baseResponseOptions();
        options.body = {
            ids: ids
        };
        options.status = 200;
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.getAllInactiveListings = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var ids = [];
        for (var i = 0; i < this.listingReposetory.length; i++) {
            if (!this.listingReposetory[i].active) {
                ids.push(this.listingReposetory[i].id);
            }
        }
        var options = this.baseResponseOptions();
        options.body = {
            ids: ids
        };
        options.status = 200;
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.getListing = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var parameter = networkRequest.getUrl().split('/')[4];
        var id = parseInt(parameter);
        var options = this.baseResponseOptions();
        if (id && id > 0 && id <= this.listingReposetory.length) {
            options.status = 200;
            options.body = this.listingReposetory[id - 1];
        }
        else {
            options.body = {
                status: 'NOT OK',
                message: 'forbidden'
            };
            options.status = 403;
        }
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.editListing = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var parameter = networkRequest.getUrl().split('/')[4];
        var id = parseInt(parameter);
        var options = this.baseResponseOptions();
        if (id && id > 0 && id <= this.listingReposetory.length) {
            var body = networkRequest.getBody();
            body.id = id;
            this.listingReposetory[id] = body;
            options.status = 200;
            options.body = {
                status: 'OK'
            };
        }
        else {
            options.body = {
                status: 'NOT OK',
                message: 'forbidden'
            };
            options.status = 403;
        }
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.deleteListing = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var parameter = networkRequest.getUrl().split('/')[5];
        var id = parseInt(parameter);
        // console.log(parameter, id)
        var options = this.baseResponseOptions();
        if (id && id > 0 && id <= this.listingReposetory.length) {
            this.listingReposetory.splice(id - 1, 1);
            options.status = 200;
            options.body = {
                message: 'OK'
            };
        }
        else {
            options.body = {
                status: 'NOT OK',
                message: 'forbidden'
            };
            options.status = 403;
        }
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.listingMainImageUpload = function (networkRequest) {
        console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
        var source = new Subject_1.Subject();
        var observable = source.asObservable();
        var parameter = networkRequest.getUrl().split('/')[6];
        var id = parseInt(parameter);
        var options = this.baseResponseOptions();
        if (id && id > 0 && id <= this.listingReposetory.length) {
            // let file : File = this.byteToFile(networkRequest.getBody());
            var file = networkRequest.getBody();
            // console.log(file, 'file');
            // URL.createObjectURL(file);
            // this.listingReposetory[id - 1].mainImage = URL.createObjectURL(file);
            this.listingReposetory[id - 1].mainImage = 'assets/images/bit-ka-logo.png';
            console.log(this.listingReposetory[id - 1].mainImage);
            options.status = 201;
            options.body = {
                message: 'OK'
            };
        }
        else {
            options.status = 403;
            options.body = {
                message: 'NOT OK'
            };
        }
        var response = new http_1.Response(options);
        setTimeout(function () {
            source.next(response);
        }, (Math.random() * 1000));
        return observable;
    };
    MockServer.prototype.byteToFile = function (byteArray) {
        var mime;
        var b0 = byteArray[0];
        var b1 = byteArray[1];
        var b2 = byteArray[2];
        var b3 = byteArray[3];
        if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
            mime = 'image/png';
        else if (b0 == 0xff && b1 == 0xd8)
            mime = 'image/jpeg';
        else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
            mime = 'image/gif';
        else
            return null;
        console.log('byteToFile', mime);
        var file = new File(byteArray, (Math.random() * 1000) + '.jpg', {
            type: mime
        });
        return file;
    };
    return MockServer;
}());
//# sourceMappingURL=mockNetwork.service.js.map