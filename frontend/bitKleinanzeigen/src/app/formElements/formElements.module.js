"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var description_component_1 = require("./description/description.component");
var title_component_1 = require("./title/title.component");
var price_component_1 = require("./price/price.component");
var image_component_1 = require("./image/image.component");
var formElements_service_1 = require("./formElements.service");
var FormElementsModule = (function () {
    function FormElementsModule() {
    }
    return FormElementsModule;
}());
FormElementsModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        declarations: [description_component_1.DescriptionFormComponent, title_component_1.TitleFormComponent, price_component_1.PriceFormComponent, image_component_1.ImageFormComponent],
        exports: [common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            description_component_1.DescriptionFormComponent,
            title_component_1.TitleFormComponent,
            price_component_1.PriceFormComponent,
            image_component_1.ImageFormComponent],
        providers: [formElements_service_1.FormElementsService]
    })
], FormElementsModule);
exports.FormElementsModule = FormElementsModule;
//# sourceMappingURL=formElements.module.js.map