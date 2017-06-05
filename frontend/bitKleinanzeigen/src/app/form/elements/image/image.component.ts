import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
// import * as html2canvas from "html2canvas"; // original 03062017
// import html2canvas from 'html2canvas';

import { FormService } from '../../forms.service';

@Component({
  selector: 'form-element-image',
  templateUrl: './image.component.html',
  styleUrls: [ './image.component.css' ]
})
export class ImageFormComponent {


  constructor(
    private formService : FormService,
    private domSanitizer : DomSanitizer
  ) {
    this.data = this.formService.data;
    this.model = this.formService.model;
    this.form = this.formService.form;
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

  model : any;
  form : FormGroup;
  data : any;
  imagesrc : SafeUrl = '';
  image : SafeStyle;
  imgWidth: number;
  imgHeight: number;
  imagePreviewContainer: any;


  private div : Element;

  private addMulipleEventListener(element : Element, eventstring : string, handle : any) : void {
    let events : string[] = eventstring.split(' ');
    events.forEach((event : string) => {
      element.addEventListener(event, handle);
    });
  }

  private handleEvents() : void {
    this.div = document.querySelector('.image-box');

    if (!this.div) {
      return;
    }
    this.addMulipleEventListener(this.div, 'drag', (event : any) => {
      event.preventDefault();
      event.stopPropagation();
    });

    this.addMulipleEventListener(this.div, 'dragover dragenter', (event : any) => {
      event.preventDefault();
      event.stopPropagation();
      this.div.classList.add('is-dragover');
    });

    this.addMulipleEventListener(this.div, 'dragleave dragend drop', (event : any) => {
      event.preventDefault();
      event.stopPropagation();
      this.div.classList.remove('is-dragover');
    });

    /**User drops a file into the dropper*/
    this.addMulipleEventListener(this.div, 'drop', (event : any) => {
      console.log("DATA TRANSFER", event.dataTransfer);
      this.preloadImage(event.dataTransfer.files[0]);




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

  /**Generates and presents an image file from the uploader*/
  private preloadImage(imageFile : File) : void {

    /** TODO Upload the image to the server for processing*/
    //Generate a unique, alphanumeric target name to avoid collisions
    let utn = ((+new Date) + Math.random()* 100).toString(32).replace(/\W/g, '');

    /** TODO Upload the image to the server*/
    //Track and display the progress of the upload

    /*GENERATE IMAGE PREVIEW*/
    let imageResult = new Image();
    let ImageComponent : ImageFormComponent = this;

    imageResult.onload = function() {
      /*Set the images dimensions*/
      ImageComponent.imgWidth = imageResult.width;
      ImageComponent.imgHeight = imageResult.height;

      /*Hide the image upload*/
      let imageInputContainer = document.querySelector(".image-input-container");
      imageInputContainer.classList.remove("active");

      /*Show the image preview - HAVE TO DO THIS FIRST TO GRAB CONTAINER DIMENSIONS LATER*/
      let resultImageContainer = document.querySelector(".result-image-container");
      resultImageContainer.classList.add("active");

      ImageComponent.setImageContainerDimensions();

      /*Inject image into preview as a background image*/
      ImageComponent.imagePreviewContainer.style.backgroundImage = "url('"+imageResult.src+"')";

      ImageComponent.setDimensionsAndZoomer();

    }
    imageResult.src = URL.createObjectURL(imageFile);
  }

  zoomImage() : void {
    let rangeSlider = <HTMLInputElement>document.querySelector("#zoom-range");
    let imageContainer = <HTMLElement>document.querySelector("#file-input-image");
    //Adapt zoom-level to image-container background-image
    imageContainer.style.backgroundSize = "auto " + rangeSlider.value + "px";
  }

  /**Calculates the best position for an image to be displayed within the cropper
  and sets the zommer function accordingly*/
  private setDimensionsAndZoomer() : void {
    /**Calculate and set initial display size*/
    let imgRatio = this.imgHeight / this.imgWidth;
    let zoomRange = <HTMLInputElement>document.querySelector("#zoom-range");

    /*Get the image's as well as its container's dimensions
    to calculate the perfect initial display*/
    let ipcWidth = this.imagePreviewContainer.clientWidth;
    let ipcHeight = this.imagePreviewContainer.clientHeight;

    if(this.isLandscape()) {
      /*Center the image position for lanscape images*/
      this.imagePreviewContainer.style.backgroundPosition = "0px 0px";

      if(ipcWidth * imgRatio < ipcHeight) {
        this.imagePreviewContainer.style.backgroundSize = "auto " + ipcHeight + "px";
        zoomRange.min = ipcHeight + "";
        zoomRange.max = this.imgHeight + "";
        zoomRange.value = ipcHeight + "";
      } else {
        this.imagePreviewContainer.style.backgroundSize = "auto " + (ipcWidth * imgRatio) + "px";
        zoomRange.min = ipcWidth * imgRatio + "";
        zoomRange.max = this.imgWidth + "";
        zoomRange.value = ipcWidth * imgRatio + "";
      }
    } else {
      /*Center the image position for profile/square images*/
      this.imagePreviewContainer.style.backgroundPosition = ipcWidth/2 - this.imgWidth/4 + "px 0px";
      this.imagePreviewContainer.style.backgroundSize = "auto " + ipcHeight + "px";
      zoomRange.min = "0";
      zoomRange.max = this.imgHeight + "";
      zoomRange.value = ipcHeight + "";
    }
  }

  /**Returns true if the current image's orientation is landscape*/
  private isLandscape() : any {
    if(this.imgWidth > this.imgHeight) {//If it's not landscape it's either portrait or square
      return true;
    }
    return false;
  }

  /**Sets the image container to the OpenGraph dimension of 1:0.525*/
  private setImageContainerDimensions() : void {
    let resultImageContainer = <HTMLElement>document.querySelector(".result-image-container");
    resultImageContainer.style.height = resultImageContainer.clientWidth * 0.525 + "px";
  }

  /**Moves an image into the direction as provided by the String parameter up, down, left or right*/
  public moveImage(direction : String) : void {
    let imagePreviewContainer = <HTMLElement>document.querySelector("#file-input-image");
    let currentXpos = parseFloat(imagePreviewContainer.style.backgroundPositionX);
    let currentYpos = parseFloat(imagePreviewContainer.style.backgroundPositionY);
    const moveBy = 20;
    if(direction === 'up') {
      imagePreviewContainer.style.backgroundPositionY = currentYpos - moveBy + "px";
    } else if (direction === 'down') {
      imagePreviewContainer.style.backgroundPositionY = currentYpos + moveBy + "px";
    } else if (direction === 'left') {
      imagePreviewContainer.style.backgroundPositionX = currentXpos - moveBy + "px";
    } else if (direction === 'right') {
      imagePreviewContainer.style.backgroundPositionX = currentXpos + moveBy + "px";
    }
  }

  /**Resets the image container's contents to their initial state*/
  public resetImagePosition() {
    this.setDimensionsAndZoomer();
  }

  /**Resets the image upload, displaying only the upload form*/
  public removeImage() : void {
    const imagePreviewContainer = document.querySelector(".result-image-container");
    const imagePreview = document.querySelector("#file-input-image");
    //Reset the image
    imagePreview.innerHTML="";
    //Hide the image preview
    imagePreviewContainer.classList.remove("active");
    //Show the image dropper
    document.querySelector(".image-input-container").classList.add("active");
  }

  public captureImage() : void {
    /*Hide the crop container*/
    let cropper = <HTMLElement>document.querySelector("#crop-container");
    cropper.style.display = "none";
    let test = <HTMLElement>document.querySelector("#test-image");
    // html2canvas(test).then(function(canvas : any){
    //   window.open(canvas.toDataURL("image/png"));
    // });
  }

  input(event : any) {
    this.data.imageAsFile = event.target.files[0];
    this.preloadImage(event.target.files[0]);
    let path : string = URL.createObjectURL(this.data.imageAsFile);
    let reader : FileReader = new FileReader();
    reader.onloadend = () => {
      this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + reader.result + ')');
    }
    reader.readAsDataURL(this.data.imageAsFile);
    console.log(this.data.imageAsFile, path);
    // this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + path + ')');
  }

  // http://stackoverflow.com/questions/4564119/javascript-convert-byte-to-image
  decodeArrayBuffer(buffer : any, onLoad : any) : HTMLImageElement {
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
}

  submitImage(event : any) : void {
    if (event === null || event.target === null || event.target.files === null) {
      return;
    }
    let file = event.target.files[0];
    let reader : FileReader = new FileReader();
    // reader.onload = this.readerOnload.bind(this);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.model.imageAsByteArray = this.baseToByte(reader.result);
    }
    // this.model.imageObj = file;
  }

  private fileToBase(file : File, callback : any) : void {
    let reader : FileReader = new FileReader();
    // file.
    // console.log(file);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      callback(reader.result);
    }
  }

  private fileToByteArray(file : File, callback: any) : void {
    let reader : FileReader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      callback(new Uint8Array(reader.result));
    }
  }

  private readerOnload(e : any) {
    let reader = e.target;
    this.imagesrc = reader.result;
    this.model.image = this.imagesrc;
  }

  private baseToByte(base : string) : Uint8Array {
    // base = base.replace(/^data:image\/(png|jpg|jpeg);base64/‌​, '');
    // base = base.replace('data:image/','');
    // base = base.replace(/png|jpg|jpeg/, '');
    // base = base.replace(';base64,', '');
    base = base.replace(/^data:image\/(jpg|png|jpeg);base64,/, '');
    let byteCharacters = window.atob(base);
    let length = byteCharacters.length;
    let byteArray : Uint8Array = new Uint8Array(new ArrayBuffer(length));
    for (let i = 0; i < length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return byteArray;
  }

  ngOnInit() : void {
    this.handleEvents();
  }

  ngAfterViewInit() : void {
    this.imagePreviewContainer = <HTMLElement>document.querySelector("#file-input-image");
  }

  private byteToFile(byteArray : Uint8Array[]) : File {
    let file : File = new File(byteArray, 'abcdef' + '.jpg', {
      type: 'image/jepg'
    });
    return file;
  }

  private byteToBase(byteArray : Uint8Array) : string {
    let base : string = 'data:image/jpeg;base64,';
    let binary : string = '';
    const length : number = byteArray.length;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(byteArray[i]);
    }
    return base + window.btoa(binary);
  }

  /**Handle events*/

  /**Listen to the window to adapt image container on changes*/
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setImageContainerDimensions();
    this.setDimensionsAndZoomer();
  }



}
