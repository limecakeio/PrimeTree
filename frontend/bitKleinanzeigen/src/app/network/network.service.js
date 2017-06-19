"use strict";
var NetworkService = (function () {
    function NetworkService() {
        this.securityActive = false;
    }
    /** Adds a specific security header for all following requests.
     * Example: setSecurityHeader('x-security', '123abc')
     */
    NetworkService.prototype.setSecurityHeader = function (field, value) {
        this.securityHeader = {
            field: field,
            value: value
        };
        this.securityActive = true;
    };
    return NetworkService;
}());
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map