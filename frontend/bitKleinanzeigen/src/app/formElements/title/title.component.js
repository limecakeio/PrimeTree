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
var formElements_service_1 = require("../formElements.service");
var forms_1 = require("@angular/forms");
var TitleFormComponent = (function () {
    function TitleFormComponent(service) {
        this.service = service;
        this.form = this.service.form;
        this.model = this.service.model;
    }
    TitleFormComponent.prototype.ngOnInit = function () {
        this.service.addFormControl('title', new forms_1.FormControl('title', forms_1.Validators.required));
    };
    return TitleFormComponent;
}());
TitleFormComponent = __decorate([
    core_1.Component({
        selector: 'input-title',
        templateUrl: './title.component.html',
        styleUrls: ['../elements.form.css']
    }),
    __metadata("design:paramtypes", [formElements_service_1.FormElementsService])
], TitleFormComponent);
exports.TitleFormComponent = TitleFormComponent;
//# sourceMappingURL=title.component.js.map