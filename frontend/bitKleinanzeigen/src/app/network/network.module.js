"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var network_service_1 = require("./network.service");
<<<<<<< HEAD
var security_module_1 = require("../security/security.module");
var security_model_1 = require("../security/security.model");
var mockNetwork_service_1 = require("./mockNetwork.service");
=======
var mock_network_service_1 = require("./mock-network.service");
>>>>>>> e42f4dda6ecbeaa6ca0d7299a5cb631871241c21
var NetworkModule = (function () {
    function NetworkModule() {
    }
    return NetworkModule;
}());
NetworkModule = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule],
        declarations: [],
        providers: [{
                provide: network_service_1.NetworkService,
<<<<<<< HEAD
                useClass: mockNetwork_service_1.MockNetworkService
            }, security_model_1.SecurityModel],
        exports: [http_1.HttpModule]
=======
                useClass: mock_network_service_1.MockNetworkService
            }],
        exports: []
>>>>>>> e42f4dda6ecbeaa6ca0d7299a5cb631871241c21
    })
], NetworkModule);
exports.NetworkModule = NetworkModule;
//# sourceMappingURL=network.module.js.map