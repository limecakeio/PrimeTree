"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var Observable_1 = require("rxjs/Observable");
var rest_network_service_1 = require("../../app/network/rest-network.service");
var authentication_controller_1 = require("../../app/authentication/authentication.controller");
var user_service_1 = require("../../app/model/user/user.service");
var statistics_service_1 = require("../../app/shared/statistics.service");
var network_service_1 = require("../../app/network/network.service");
var user_controller_1 = require("../../app/model/user/user.controller");
var statistics_controller_1 = require("../../app/shared/statistics.controller");
var user_model_1 = require("../../app/model/user/user.model");
describe('AuthenticationController', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                {
                    provide: http_1.XHRBackend,
                    useClass: testing_2.MockBackend
                }, {
                    provide: network_service_1.NetworkService,
                    useClass: rest_network_service_1.RESTNetworkService
                },
                authentication_controller_1.AuthenticationController,
                user_service_1.UserService,
                statistics_service_1.StatisticsService,
                user_controller_1.UserController,
                statistics_controller_1.StatisticsController
            ]
        });
    });
    it('should autenticate a user with valid credentionals', testing_1.inject([authentication_controller_1.AuthenticationController, http_1.XHRBackend], function (AuthenticationController, mockBackend) {
        it('should authenticate a valid user', function () {
            mockBackend.connections.subscribe(function (connection) {
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify({})
                })));
            });
            var user = new user_model_1.User;
            user.password = '123';
            user.username = 'akessler';
            AuthenticationController.authenticate(user);
            expect(AuthenticationController.authenticate(user) instanceof Observable_1.Observable).toBe(true);
        });
    }));
});
//# sourceMappingURL=authentication.controller.spec.js.map