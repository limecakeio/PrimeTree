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
var formElements_service_1 = require("../formElements.service");
var PriceFormComponent = (function () {
    function PriceFormComponent(service) {
        this.service = service;
        this.form = this.service.form;
        this.model = this.service.model;
    }
    PriceFormComponent.prototype.ngOnInit = function () {
        this.form.addControl('price', new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[0-9\.]+$")])));
    };
    return PriceFormComponent;
}());
PriceFormComponent = __decorate([
    core_1.Component({
        selector: 'input-price',
        templateUrl: './price.component.html'
    }),
    __metadata("design:paramtypes", [formElements_service_1.FormElementsService])
], PriceFormComponent);
exports.PriceFormComponent = PriceFormComponent;
//# sourceMappingURL=price.component.js.map