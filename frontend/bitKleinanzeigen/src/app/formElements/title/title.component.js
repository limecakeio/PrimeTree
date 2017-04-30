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
import { FormElementsService } from '../formElements.service';
import { FormControl, Validators } from '@angular/forms';
var TitleFormComponent = (function () {
    function TitleFormComponent(service) {
        this.service = service;
        this.form = this.service.form;
        this.model = this.service.model;
    }
    TitleFormComponent.prototype.ngOnInit = function () {
        this.service.addFormControl('title', new FormControl('title', Validators.required));
    };
    return TitleFormComponent;
}());
TitleFormComponent = __decorate([
    Component({
        selector: 'input-title',
        templateUrl: './title.component.html',
        styleUrls: ['../elements.form.css']
    }),
    __metadata("design:paramtypes", [FormElementsService])
], TitleFormComponent);
export { TitleFormComponent };
//# sourceMappingURL=title.component.js.map