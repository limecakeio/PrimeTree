"use strict";
var network_request_1 = require("./network.request");
var Observable_1 = require("rxjs/Observable");
var NetworkService = (function () {
    function NetworkService() {
    }
    NetworkService.prototype.send = function (request) {
        return new Observable_1.Observable();
    };
    ;
    NetworkService.prototype.networkRequest = function () {
        return new network_request_1.NetworkRequest();
    };
    ;
    return NetworkService;
}());
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map