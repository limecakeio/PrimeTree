"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var Observable_1 = require("rxjs/Observable");
var network_request_1 = require("../../app/network/network.request");
var rest_network_service_1 = require("../../app/network/rest-network.service");
describe('RESTNetworkService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                {
                    provide: http_1.XHRBackend,
                    useClass: testing_2.MockBackend
                },
                rest_network_service_1.RESTNetworkService
            ]
        });
    });
    it('should return an Observable', testing_1.inject([rest_network_service_1.RESTNetworkService, http_1.XHRBackend], function (rESTNetworkService, mockBackend) {
        var mockResponse = {
            data: [
                { id: 0, name: 'Video 0' },
                { id: 1, name: 'Video 1' },
                { id: 2, name: 'Video 2' },
                { id: 3, name: 'Video 3' },
            ]
        };
        mockBackend.connections.subscribe(function (connection) {
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });
        expect(rESTNetworkService.send(new network_request_1.NetworkRequest()) instanceof Observable_1.Observable).toBe(true);
    }));
});
//# sourceMappingURL=rest-network.service.spec.js.map