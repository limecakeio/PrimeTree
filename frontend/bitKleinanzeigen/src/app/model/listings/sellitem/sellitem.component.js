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
var sellitem_model_1 = require("./sellitem.model");
var listing_controller_1 = require("../network/listing.controller");
var listing_reposetory_1 = require("../listing.reposetory");
var security_model_1 = require("../../../security/security.model");
var SellItemComponent = (function () {
    function SellItemComponent(listingController, repo, securityModel) {
        this.listingController = listingController;
        this.repo = repo;
        this.securityModel = securityModel;
        this.isOwner = false;
    }
    SellItemComponent.prototype.remove = function () {
        this.repo.removeListing(this.listing.id);
    };
    SellItemComponent.prototype.ngOnInit = function () {
        if (this.listing.owner === this.securityModel.username) {
            this.isOwner = true;
        }
    };
    return SellItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", sellitem_model_1.SellItem)
], SellItemComponent.prototype, "listing", void 0);
SellItemComponent = __decorate([
    core_1.Component({
        selector: 'sellitem',
        templateUrl: 'sellitem.component.html'
    }),
    __metadata("design:paramtypes", [listing_controller_1.ListingController,
        listing_reposetory_1.ListingReposetory,
        security_model_1.SecurityModel])
], SellItemComponent);
exports.SellItemComponent = SellItemComponent;
//# sourceMappingURL=sellitem.component.js.map