"use strict";
var network_request_1 = require("../../app/network/network.request");
describe('NetworkRequest', function () {
    it('should create a valid url with multiple queries', function () {
        var request = new network_request_1.NetworkRequest();
        request.
            setProtocol('http');
        request
            .setHostname('example.com')
            .setPort(8080)
            .addPath('main');
        request.addQuery('key1', 'value1');
        request.addQuery('key2', 'value2');
        expect(request.getUrl()).toBe('http://example.com:8080/main?key1=value1&key2=value2');
    });
    it('should create a valid url with a query containing multiple values', function () {
        var request = new network_request_1.NetworkRequest();
        request
            .setProtocol('http')
            .setHostname('example.com')
            .setPort(8080)
            .addPath('main')
            .appendQuery('key1', 'value1')
            .appendQuery('key1', 'value2');
        expect(request.getUrl()).toBe('http://example.com:8080/main?key1=value1,value2');
    });
    it('should override former queries and create a valid url', function () {
        var request = new network_request_1.NetworkRequest();
        request.
            setProtocol('http');
        request
            .setHostname('example.com')
            .setPort(8080)
            .addPath('main');
        request.addQuery('key1', 'value1');
        request.addQuery('key1', 'value2');
        expect(request.getUrl()).toBe('http://example.com:8080/main?key1=value2');
    });
});
//# sourceMappingURL=network.request.spec.js.map