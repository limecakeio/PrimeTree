"use strict";
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
var forms_1 = require("@angular/forms");
var formElements_service_1 = require("../../../../formElements/formElements.service");
var listing_controller_1 = require("../../network/listing.controller");
var listing_reposetory_1 = require("../../listing.reposetory");
var router_1 = require("@angular/router");
var security_model_1 = require("../../../../security/security.model");
var SellItemCreateFormComponent = (function () {
    function SellItemCreateFormComponent(service, listingNetworkService, repo, router, securityModel) {
        this.service = service;
        this.listingNetworkService = listingNetworkService;
        this.repo = repo;
        this.router = router;
        this.securityModel = securityModel;
        this.service.form = new forms_1.FormGroup({});
        this.service.model = {};
        this.form = this.service.form;
        this.listing = this.service.model;
        this.listing.creator = this.securityModel.username;
        this.data = this.service.data;
    }
    SellItemCreateFormComponent.prototype.submit = function () {
        var _this = this;
        if (this.form.valid) {
            // console.log('sellitem-create');
            var date = new Date();
            var listingRequestBody = {};
            listingRequestBody.title = this.listing.title;
            listingRequestBody.createDate = date.getTime();
            listingRequestBody.description = this.listing.description;
            listingRequestBody.expiryDate = null;
            listingRequestBody.location = 'mannheim';
            listingRequestBody.price = this.listing.price;
            listingRequestBody.type = 'SellItem';
            listingRequestBody.condition = 'bad';
            this.listingNetworkService.postListing(listingRequestBody).subscribe(function (id) {
                if (typeof _this.data.imageAsByteArray !== 'undefined') {
                    _this.listingNetworkService.putImage(id, _this.data.imageAsByteArray).subscribe(function (response) {
                        console.log('image upload success', response);
                    }, function (error) {
                        console.log(error.message);
                    }, function () {
                        console.log('image upload finished');
                    });
                }
                _this.repo.update();
                _this.router.navigate(['home']);
            }, function (error) {
                console.log(error.message);
            });
        }
    };
    SellItemCreateFormComponent.prototype.byteToFile = function (byteArray) {
        var file = new File(byteArray, (Math.random() * 1000) + '.jpg', 'image/jpg');
        return file;
    };
    return SellItemCreateFormComponent;
}());
SellItemCreateFormComponent = __decorate([
    core_1.Component({
        selector: 'form-create-sellitem',
        templateUrl: './sellitem-create.component.html',
        // styleUrls: [ '../global.form.css' ],
        providers: [formElements_service_1.FormElementsService]
    }),
    __metadata("design:paramtypes", [formElements_service_1.FormElementsService,
        listing_controller_1.ListingController,
        listing_reposetory_1.ListingReposetory,
        router_1.Router,
        security_model_1.SecurityModel])
], SellItemCreateFormComponent);
exports.SellItemCreateFormComponent = SellItemCreateFormComponent;
//# sourceMappingURL=sellitem-create.component.js.map