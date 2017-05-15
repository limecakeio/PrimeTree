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
var http_1 = require("@angular/http");
var network_service_1 = require("./network.service");
var network_request_1 = require("./network.request");
var security_model_1 = require("../security/security.model");
var RESTNetworkService = (function (_super) {
    __extends(RESTNetworkService, _super);
    function RESTNetworkService(http, security) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.security = security;
        return _this;
    }
    /** sends the request to the server with the specified data
     * @argument { NetworkRequest } request request which will be send
     * @return {Observable<Response>}
     */
    RESTNetworkService.prototype.send = function (request) {
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
    RESTNetworkService.prototype.sendRequest = function (request) {
        // console.log(request);
        return this.http.request(new http_1.Request({
            method: request.getHttpMethod(),
            url: request.getUrl(),
            body: request.getBody(),
            withCredentials: true
        }));
    };
    RESTNetworkService.prototype.sendRequestWithHeaders = function (request, headers) {
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
    RESTNetworkService.prototype.networkRequest = function () {
        var request = new network_request_1.NetworkRequest();
        request.setHostname('141.19.145.175')
            .setPort(8080);
        return request;
    };
    return RESTNetworkService;
}(network_service_1.NetworkService));
RESTNetworkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, security_model_1.SecurityModel])
], RESTNetworkService);
exports.RESTNetworkService = RESTNetworkService;
//# sourceMappingURL=restNetwork.service.js.map