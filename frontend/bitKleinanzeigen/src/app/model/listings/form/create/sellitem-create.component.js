var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SellItem } from '../../sellItem/sellItem.model';
import { FormGroup } from '@angular/forms';
import { FormElementsService } from '../../../../formElements/formElements.service';
import { ListingController } from '../../network/listing.controller';
var SellItemCreateFormComponent = (function () {
    function SellItemCreateFormComponent(service, listingNetworkService) {
        this.service = service;
        this.listingNetworkService = listingNetworkService;
        this.service.form = new FormGroup({});
        this.service.model = new SellItem();
        this.form = this.service.form;
        this.listing = this.service.model;
    }
    SellItemCreateFormComponent.prototype.submit = function () {
        if (this.form.valid) {
            console.log('sellitem create form');
            this.listingNetworkService.postListing('SellItem', this.listing);
        }
    };
    return SellItemCreateFormComponent;
}());
SellItemCreateFormComponent = __decorate([
    Component({
        selector: 'form-create-sellitem',
        templateUrl: 'sellitem-create.component.html',
        styleUrls: ['../global.form.css'],
        providers: [FormElementsService]
    }),
    __metadata("design:paramtypes", [FormElementsService, ListingController])
], SellItemCreateFormComponent);
export { SellItemCreateFormComponent };
//# sourceMappingURL=sellitem-create.component.js.map