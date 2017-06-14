import { NetworkRequest } from './network.request';
var NetworkService = (function () {
    function NetworkService() {
        this.securityActive = false;
    }
    NetworkService.prototype.setSecurityHeader = function (field, value) {
        this.securityHeader = {
            field: field,
            value: value
        };
        this.securityActive = true;
    };
    NetworkService.prototype.networkRequest = function () {
        var request = new NetworkRequest();
        request
            .setHostname('141.19.145.175')
            .setPort(8080);
        return request;
    };
    ;
    return NetworkService;
}());
export { NetworkService };
//# sourceMappingURL=network.service.js.map