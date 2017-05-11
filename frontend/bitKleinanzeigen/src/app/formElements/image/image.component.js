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
var ImageFormComponent = (function () {
    function ImageFormComponent(formElementsService) {
        this.formElementsService = formElementsService;
        this.imagesrc = '';
        this.model = this.formElementsService.model;
        this.form = this.formElementsService.form;
        //  this.form.addControl('image', new FormControl('', Validators.required));
    }
    ImageFormComponent.prototype.submitImage = function (event) {
        if (event === null || event.target === null || event.target.files === null) {
            return;
        }
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = this.readerOnload.bind(this);
        reader.readAsDataURL(file);
        this.model.imageObj = file;
    };
    ImageFormComponent.prototype.readerOnload = function (e) {
        var reader = e.target;
        this.imagesrc = reader.result;
        this.model.image = this.imagesrc;
        // console.log(this.model);
    };
    return ImageFormComponent;
}());
ImageFormComponent = __decorate([
    core_1.Component({
        selector: 'input-image',
        templateUrl: './image.component.html'
    }),
    __metadata("design:paramtypes", [formElements_service_1.FormElementsService])
], ImageFormComponent);
exports.ImageFormComponent = ImageFormComponent;
//# sourceMappingURL=image.component.js.map