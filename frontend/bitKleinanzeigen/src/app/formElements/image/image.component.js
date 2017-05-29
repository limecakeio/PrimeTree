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
            // console.log(event);
            _this.data.imageAsFile = event.dataTransfer.files[0];
            /*GENERATE IMAGE PREVIEW*/
            var imageResult = document.createElement("img");
            imageResult.src = URL.createObjectURL(_this.data.imageAsFile);
            /*Ensure the parent container dictates the dimensions*/
            imageResult.style.width = "100%";
            imageResult.style.height = "auto";
            document.querySelector("#file-input-image").appendChild(imageResult);
            // this.fileToBase(this.data.imageAsFile, (base : string) => {
            //   this.data.imageAsBase = base;
            //   this.data.imageAsByteArray = this.baseToByte(base);
            //   let file : File = this.byteToFile(this.data.imageAsByteArray);
            //   // let str : StreamReader = new StreamReader();
            //   this.imagesrc = 'data:image/jpeg;base64,' + this.data.imageAsByteArray;
            //
            // });
            // this.fileToByteArray(this.data.imageAsFile, (bytearray : Uint8Array) => {
            //   // let src : string = String.fromCharCode.apply(null, bytearray);
            //   this.data.imageAsByteArray = bytearray;
            //   let ele = document.querySelector('#file-input-image');
            //   ele.appendChild(this.decodeArrayBuffer(bytearray, () => {
            //
            //   }));
            // });
        });
        this.addMulipleEventListener(this.div, 'click', function (event) {
            // console.log(event, 'click');
        });
    };
    ;
    ImageFormComponent.prototype.input = function (event) {
        var _this = this;
        this.data.imageAsFile = event.target.files[0];
        var path = URL.createObjectURL(this.data.imageAsFile);
        var reader = new FileReader();
        reader.onloadend = function () {
            _this.image = _this.domSanitizer.bypassSecurityTrustStyle('url(' + reader.result + ')');
        };
        reader.readAsDataURL(this.data.imageAsFile);
        console.log(this.data.imageAsFile, path);
        // this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + path + ')');
    };
    // http://stackoverflow.com/questions/4564119/javascript-convert-byte-to-image
    ImageFormComponent.prototype.decodeArrayBuffer = function (buffer, onLoad) {
        var mime;
        // var a = new Uint8Array(buffer);
        var a = buffer;
        var nb = a.length;
        if (nb < 4)
            return null;
        var b0 = a[0];
        var b1 = a[1];
        var b2 = a[2];
        var b3 = a[3];
        if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
            mime = 'image/png';
        else if (b0 == 0xff && b1 == 0xd8)
            mime = 'image/jpeg';
        else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
            mime = 'image/gif';
        else
            return null;
        var binary = "";
        for (var i = 0; i < nb; i++)
            binary += String.fromCharCode(a[i]);
        var base64 = window.btoa(binary);
        var image = new Image();
        image.onload = onLoad;
        image.src = 'data:' + mime + ';base64,' + base64;
        return image;
    };
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
    ImageFormComponent.prototype.fileToByteArray = function (file, callback) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
            callback(new Uint8Array(reader.result));
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
        var file = new File(byteArray, 'abcdef' + '.jpg', {
            type: 'image/jepg'
        });
        return file;
    };
    ImageFormComponent.prototype.byteToBase = function (byteArray) {
        var base = 'data:image/jpeg;base64,';
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