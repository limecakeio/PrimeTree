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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SellItem } from '../model/listing.model';
import { ListingRequest } from '../network/listing.controller';
var CreateListingFormComponent = (function () {
    function CreateListingFormComponent(network) {
        this.network = network;
        this.listing = new SellItem();
        this.formSubmitted = false;
        //  this.listing.title = 'Erik';
        //  this.listing.description = 'Ist ein Mensch';
        //  this.listing.price = 5000;
    }
    CreateListingFormComponent.prototype.ngOnInit = function () {
        this.form = new FormGroup({
            title: new FormControl("", Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9\.]+$")]))
        });
    };
    CreateListingFormComponent.prototype.submitListing = function (form) {
        console.log(this.form.controls);
        if (this.form.valid) {
            this.network.postListing('SellItem', this.listing).subscribe(function (res) { return console.log(res); });
            this.formSubmitted = true;
        }
    };
    return CreateListingFormComponent;
}());
CreateListingFormComponent = __decorate([
    Component({
        selector: 'createListingForm',
        templateUrl: 'createListingForm.component.html',
        styleUrls: ['createListingForm.component.css']
    }),
    __metadata("design:paramtypes", [ListingRequest])
], CreateListingFormComponent);
export { CreateListingFormComponent };
//# sourceMappingURL=CreateListingForm.component.js.map