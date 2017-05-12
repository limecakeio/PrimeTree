"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var listing_controller_1 = require("./network/listing.controller");
var formElements_module_1 = require("../../formElements/formElements.module");
var sellitem_create_component_1 = require("./form/create/sellitem-create.component");
var listing_reposetory_1 = require("./listing.reposetory");
var listing_component_1 = require("./listing.component");
var sellitem_component_1 = require("./sellitem/sellitem.component");
var ListingModule = (function () {
    function ListingModule() {
    }
    return ListingModule;
}());
ListingModule = __decorate([
    core_1.NgModule({
        imports: [formElements_module_1.FormElementsModule],
        declarations: [sellitem_create_component_1.SellItemCreateFormComponent, listing_component_1.ListingComponent, sellitem_component_1.SellItemComponent],
        exports: [sellitem_create_component_1.SellItemCreateFormComponent, listing_component_1.ListingComponent, sellitem_component_1.SellItemComponent],
        providers: [listing_controller_1.ListingController, listing_reposetory_1.ListingReposetory]
    })
], ListingModule);
exports.ListingModule = ListingModule;
//# sourceMappingURL=listing.modul.js.map