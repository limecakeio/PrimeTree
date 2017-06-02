"use strict";
var network_request_1 = require("./network.request");
var NetworkService = (function () {
    function NetworkService() {
    }
    NetworkService.prototype.networkRequest = function () {
        var request = new network_request_1.NetworkRequest();
        request
            .setHostname('141.19.145.175')
            .setPort(8080);
        return request;
    };
    ;
    return NetworkService;
}());
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map