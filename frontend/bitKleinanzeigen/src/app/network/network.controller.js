var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RESTService } from './rest.service';
import { Injectable } from '@angular/core';
export var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
var NetworkRequest = (function () {
    function NetworkRequest(networkService) {
        this.networkService = networkService;
        this.query = '?';
        this.hasQuery = false;
        this.path = '';
        this.hasPath = false;
        this.baseUrl = '';
        this.hasPort = false;
        this.networkService.setBaseUrl('http://localhost');
    }
    NetworkRequest.prototype.addQuery = function (key, value) {
        if (this.hasQuery) {
            this.query += '&';
        }
        else {
            this.hasQuery = true;
        }
        this.query += key + '=' + value;
        return this;
    };
    NetworkRequest.prototype.addPath = function (path) {
        if (!this.hasPath) {
            this.hasPath = true;
            this.path += path;
        }
        else {
            this.path += '/' + path;
        }
        return this;
    };
    NetworkRequest.prototype.setPort = function (port) {
        this.port = port;
        this.hasPort = true;
        return this;
    };
    NetworkRequest.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
        return this;
    };
    NetworkRequest.prototype.setHttpMethod = function (method) {
        this.method = method;
        return this;
    };
    NetworkRequest.prototype.setPOSTRequest = function () {
        this.method = HttpMethod.POST;
        return this;
    };
    NetworkRequest.prototype.setGETRequest = function () {
        this.method = HttpMethod.GET;
        return this;
    };
    NetworkRequest.prototype.setBody = function (body) {
        this.body = body;
        return this;
    };
    NetworkRequest.prototype.buildUrl = function () {
        var url = this.baseUrl;
        if (this.hasPort) {
            url += ':' + this.port;
        }
        if (this.hasPath) {
            url += '/' + this.path;
        }
        if (this.hasQuery) {
            url += this.query;
        }
        return url;
    };
    NetworkRequest.prototype.reset = function () {
        this.path = '';
        this.query = '?';
        this.hasQuery = false;
        this.hasPath = false;
        this.hasPort = false;
    };
    NetworkRequest.prototype.sendRequest = function () {
        var url = this.buildUrl();
        var response;
        switch (this.method) {
            case HttpMethod.GET:
                response = this.networkService.get(url);
                break;
            case HttpMethod.POST:
                response = this.networkService.post(url, this.body);
                break;
            default:
                throw new Error('HttpMethod is missing!');
        }
        this.reset();
        return response;
    };
    return NetworkRequest;
}());
NetworkRequest = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RESTService])
], NetworkRequest);
export { NetworkRequest };
//# sourceMappingURL=network.controller.js.map