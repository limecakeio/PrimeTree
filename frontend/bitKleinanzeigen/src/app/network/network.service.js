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
var http_1 = require("@angular/http");
var network_request_1 = require("./network.request");
var security_model_1 = require("../security/security.model");
var NetworkService = (function () {
    function NetworkService(http, security) {
        this.http = http;
        this.security = security;
    }
    /** sends the request to the server with the specified data
     * @argument { NetworkRequest } request request which will be send
     * @return {Observable<Response>}
     */
    NetworkService.prototype.send = function (request) {
        if (request.hasHeaders()) {
            var headers_1 = new http_1.Headers();
            var headerArray = request.getHeaders();
            headerArray.forEach(function (header) {
                headers_1.append(header.key, header.value);
            });
            return this.sendRequestWithHeaders(request, headers_1);
        }
        else {
            return this.sendRequest(request);
        }
    };
    NetworkService.prototype.sendRequest = function (request) {
        // console.log(request);
        return this.http.request(new http_1.Request({
            method: request.getHttpMethod(),
            url: request.getUrl(),
            body: request.getBody(),
            withCredentials: true
        }));
    };
    NetworkService.prototype.sendRequestWithHeaders = function (request, headers) {
        // console.log('headers');
        // console.log(request);
        // console.log(headers);
        return this.http.request(new http_1.Request({
            method: request.getHttpMethod(),
            url: request.getUrl(),
            body: request.getBody(),
            withCredentials: true,
            headers: headers
        }));
    };
    /** Returns a new instance of @class {NetworkRequest}
     * @return { NetworkRequest } a new instance of NetworkRequest
     */
    NetworkService.prototype.networkRequest = function () {
        var request = new network_request_1.NetworkRequest();
        request.setHostname('141.19.145.175')
            .setPort(8080);
        return request;
    };
    return NetworkService;
}());
NetworkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, security_model_1.SecurityModel])
], NetworkService);
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map