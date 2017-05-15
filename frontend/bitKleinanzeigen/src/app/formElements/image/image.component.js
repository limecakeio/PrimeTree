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
var platform_browser_1 = require("@angular/platform-browser");
var ImageFormComponent = (function () {
    function ImageFormComponent(formElementsService, domSanitizer) {
        this.formElementsService = formElementsService;
        this.domSanitizer = domSanitizer;
        this.imagesrc = '';
        this.model = this.formElementsService.model;
        this.form = this.formElementsService.form;
        this.data = this.formElementsService.data;
        if (typeof this.model.image === 'undefined') {
            this.model.image = null;
        }
        if (typeof this.model.imageAsBase === 'undefined') {
            this.model.imageAsByteArray = null;
        }
        if (typeof this.data.imageAsFile === 'undefined') {
            this.data.imageAsFile = null;
        }
    }
    ImageFormComponent.prototype.addMulipleEventListener = function (element, eventstring, handle) {
        var events = eventstring.split(' ');
        events.forEach(function (event) {
            element.addEventListener(event, handle);
        });
    };
    ImageFormComponent.prototype.handleEvents = function () {
        var _this = this;
        this.div = document.querySelector('.image-box');
        console.log(this.div);
        if (!this.div) {
            return;
        }
        this.addMulipleEventListener(this.div, 'drag', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        this.addMulipleEventListener(this.div, 'dragover dragenter', function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.div.classList.add('is-dragover');
        });
        this.addMulipleEventListener(this.div, 'dragleave dragend drop', function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.div.classList.remove('is-dragover');
        });
        this.addMulipleEventListener(this.div, 'drop', function (event) {
            console.log(event);
            _this.data.imageAsFile = event.dataTransfer.files[0];
            _this.fileToBase(_this.data.imageAsFile, function (base) {
                _this.data.imageAsBase = base;
                _this.data.imageAsByteArray = _this.baseToByte(base);
                var file = _this.byteToFile(_this.data.imageAsByteArray);
                // URL.createObjectURL(file);
                _this.imagesrc = _this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
                console.log(_this.data);
                // let reader : FileReader = new FileReader();
                // this.imagesrc = this.byteToBase(this.data.imageAsByteArray);
                // reader.readAsDataURL(this.data.imageAsByteArray);
                // console.log(this.data.imageAsByteArray)
                // reader.readAsArrayBuffer(this.data.imageAsByteArray);
                // reader.addEventListener('load', () => {
                // this.imagesrc = reader.result;
                // });
                // this.imagesrc = this.data.imageAsBase;
            });
        });
    };
    ;
    ImageFormComponent.prototype.submitImage = function (event) {
        var _this = this;
        if (event === null || event.target === null || event.target.files === null) {
            return;
        }
        var file = event.target.files[0];
        var reader = new FileReader();
        // reader.onload = this.readerOnload.bind(this);
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            _this.model.imageAsByteArray = _this.baseToByte(reader.result);
        };
        // this.model.imageObj = file;
    };
    ImageFormComponent.prototype.fileToBase = function (file, callback) {
        var reader = new FileReader();
        // file.
        // console.log(file);
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            callback(reader.result);
        };
    };
    ImageFormComponent.prototype.readerOnload = function (e) {
        var reader = e.target;
        this.imagesrc = reader.result;
        this.model.image = this.imagesrc;
    };
    ImageFormComponent.prototype.baseToByte = function (base) {
        // base = base.replace(/^data:image\/(png|jpg|jpeg);base64/‌​, '');
        // base = base.replace('data:image/','');
        // base = base.replace(/png|jpg|jpeg/, '');
        // base = base.replace(';base64,', '');
        base = base.replace(/^data:image\/(jpg|png|jpeg);base64,/, '');
        var byteCharacters = window.atob(base);
        var length = byteCharacters.length;
        var byteArray = new Uint8Array(new ArrayBuffer(length));
        for (var i = 0; i < length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }
        return byteArray;
    };
    ImageFormComponent.prototype.ngOnInit = function () {
        this.handleEvents();
    };
    ImageFormComponent.prototype.byteToFile = function (byteArray) {
        var file = new File(byteArray, (Math.random() * 1000) + '.jpg', {
            type: 'image/jpg'
        });
        return file;
    };
    ImageFormComponent.prototype.byteToBase = function (byteArray) {
        var base = 'data:image/jpg;base64,';
        var binary = '';
        var length = byteArray.length;
        for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(byteArray[i]);
        }
        return base + window.btoa(binary);
    };
    return ImageFormComponent;
}());
ImageFormComponent = __decorate([
    core_1.Component({
        selector: 'input-image',
        templateUrl: './image.component.html',
        styleUrls: ['./image.component.css']
    }),
    __metadata("design:paramtypes", [formElements_service_1.FormElementsService,
        platform_browser_1.DomSanitizer])
], ImageFormComponent);
exports.ImageFormComponent = ImageFormComponent;
//# sourceMappingURL=image.component.js.map