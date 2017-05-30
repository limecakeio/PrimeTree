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
        /**User drops a file into the dropper*/
        this.addMulipleEventListener(this.div, 'drop', function (event) {
            console.log("DATA TRANSFER", event.dataTransfer);
            _this.preloadImage(event.dataTransfer.files[0]);
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
        /**User clicks on the file-upload*/
        // this.addMulipleEventListener(this.div, 'click', (event : any) => {
        //   console.log("DATA TRANSFER", event);
        //   this.preloadImage(event.dataTransfer.files[0]);
        // });
    };
    ;
    /**Generates and presents an image file from the uploader*/
    ImageFormComponent.prototype.preloadImage = function (imageFile) {
        /*GENERATE IMAGE PREVIEW*/
        var imageResult = new Image();
        var ImageComponent = this;
        imageResult.onload = function () {
            /*Hide the image upload*/
            var imageInputContainer = document.querySelector(".image-input-container");
            imageInputContainer.classList.remove("active");
            /*Show the image preview - HAVE TO DO THIS FIRST TO GRAB CONTAINER DIMENSIONS*/
            var resultImageContainer = document.querySelector(".result-image-container");
            resultImageContainer.classList.add("active");
            //Workaround to calling "this" within a callback
            ImageComponent.setImageContainerDimensions();
            /*Inject image into preview as a background image and center it*/
            var imagePreviewContainer = document.querySelector("#file-input-image");
            imagePreviewContainer.style.backgroundImage = "url('" + imageResult.src + "')";
            imagePreviewContainer.style.backgroundPosition = "50% 50%";
            /*Get the image's as well as its container's dimensions
            to calculate the perfect initial display*/
            var imgWidth = imageResult.width;
            var imgHeight = imageResult.height;
            var ipcWidth = imagePreviewContainer.clientWidth;
            var ipcHeight = imagePreviewContainer.clientHeight;
            /*Get the image's orientation*/
            var isLandscape = false;
            if (imgWidth > imgHeight) {
                isLandscape = true;
            }
            /**Calculate and set initial display size*/
            var imgRatio;
            var zoomRange = document.querySelector("#zoom-range");
            if (isLandscape) {
                imgRatio = imgHeight / imgWidth;
                if (ipcWidth * imgRatio < ipcHeight) {
                    imagePreviewContainer.style.backgroundSize = "auto " + ipcHeight + "px";
                    zoomRange.min = ipcHeight + "";
                    zoomRange.max = imgHeight + "";
                    zoomRange.value = imgHeight + "";
                }
                else {
                    imagePreviewContainer.style.backgroundSize = "auto " + (ipcWidth * imgRatio) + "px";
                    zoomRange.min = ipcWidth * imgRatio + "";
                    zoomRange.max = imgWidth + "";
                    zoomRange.value = ipcWidth * imgRatio + "";
                }
            }
            else {
                imagePreviewContainer.style.backgroundSize = "auto " + ipcHeight + "px";
                zoomRange.min = "0";
                zoomRange.max = imgHeight + "";
                zoomRange.value = ipcHeight + "";
            }
        };
        imageResult.src = URL.createObjectURL(imageFile);
    };
    ImageFormComponent.prototype.zoomImage = function () {
        var rangeSlider = document.querySelector("#zoom-range");
        var imageContainer = document.querySelector("#file-input-image");
        //Adapt zoom-level to image-container background-image
        imageContainer.style.backgroundSize = "auto " + rangeSlider.value + "px";
    };
    ImageFormComponent.prototype.moveImage = function (direction) {
        var imagePreviewContainer = document.querySelector("#file-input-image");
        var currentXpos = parseFloat(imagePreviewContainer.style.backgroundPositionX);
        var currentYpos = parseFloat(imagePreviewContainer.style.backgroundPositionY);
        var moveBy = 5;
        if (direction === 'up') {
            imagePreviewContainer.style.backgroundPositionY = currentYpos + moveBy + "%";
        }
        else if (direction === 'down') {
            imagePreviewContainer.style.backgroundPositionY = currentYpos - moveBy + "%";
        }
        else if (direction === 'left') {
            imagePreviewContainer.style.backgroundPositionX = currentXpos - moveBy + "%";
        }
        else if (direction === 'right') {
            imagePreviewContainer.style.backgroundPositionX = currentXpos + moveBy + "%";
        }
    };
    ImageFormComponent.prototype.removeImage = function () {
        var imagePreviewContainer = document.querySelector(".result-image-container");
        var imagePreview = document.querySelector("#file-input-image");
        //Reset the image
        imagePreview.innerHTML = "";
        //Hide the image preview
        imagePreviewContainer.classList.remove("active");
        //Show the image dropper
        document.querySelector(".image-input-container").classList.add("active");
    };
    /**Sets the image container to the OpenGraph dimension of 1:0.525*/
    ImageFormComponent.prototype.setImageContainerDimensions = function () {
        var resultImageContainer = document.querySelector(".result-image-container");
        resultImageContainer.style.height = resultImageContainer.clientWidth * 0.525 + "px";
    };
    ImageFormComponent.prototype.input = function (event) {
        var _this = this;
        this.data.imageAsFile = event.target.files[0];
        this.preloadImage(event.target.files[0]);
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