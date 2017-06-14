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
  imageElement: HTMLImageElement;
  imgWidth: number;
  imgHeight: number;
  imgSize : string;
  imgRatio : number;
  targetCanvasWidth: number = 600;
  targetCanvasHeight: number = 315;
  ogRatio: number = 0.525;
  imageContainerHeight: number;
  imagePreviewContainer: any;
  private div : Element;
  private addMulipleEventListener(element : Element, eventstring : string, handle : any) : void {
    let events : string[] = eventstring.split(' ');
    events.forEach((event : string) => {
      element.addEventListener(event, handle);
    });
  }

  /*
  * These events enable the user to drag and drop an image file into the uploader
  */
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
    });
  };

  /*
  * We also allow the user to click and choose a file from their system
  */
  imageInput(event : any) {
    console.log('asd')
    this.preloadImage(event.target.files[0]);
    let path : string = URL.createObjectURL(this.data.imageAsFile);
    let reader : FileReader = new FileReader();
    reader.onloadend = () => {
      this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + reader.result + ')');
    }
    reader.readAsDataURL(this.data.imageAsFile);
  }

  /*
  * Generates and presents a preview from the uploader
  * @imageFile the file submitted by the uploader
  */
  private preloadImage(imageFile : File) : void {
    this.data.imageAsFile = imageFile;
    /*GENERATE IMAGE PREVIEW*/
    let imageResult = new Image();
    imageResult.src = URL.createObjectURL(imageFile);

    let ImageComponent : ImageFormComponent = this; //Binding this to async method
    imageResult.onload = function() {
      /**Save the image*/
      ImageComponent.imageElement = imageResult;
      /*Set the images dimensions*/
      ImageComponent.imgWidth = imageResult.width;
      ImageComponent.imgHeight = imageResult.height;
      /*Set the image's ratio*/
      ImageComponent.imgRatio = imageResult.height / imageResult.width;

      /*Hide the image upload*/
      let imageInputContainer = document.querySelector(".image-input-container");
      imageInputContainer.classList.remove("active");
      /*Show the image preview - HAVE TO DO THIS FIRST TO GRAB CONTAINER DIMENSIONS LATER*/
      let resultImageContainer = document.querySelector(".result-image-container");
      resultImageContainer.classList.add("active");
      ImageComponent.setImageContainerDimensions();
      /*Inject image into preview as a background image*/
      ImageComponent.imagePreviewContainer.style.backgroundImage = "url('" + imageResult.src + "')";
      ImageComponent.setDimensionsAndZoomer();
    }
  }
  zoomImage() : void {
    let rangeSlider = <HTMLInputElement>document.querySelector("#zoom-range");
    //Adapt zoom-level to image-container background-image
    this.imgSize = "auto " + rangeSlider.value + "px";
  }
  /**Calculates the best position for an image to be displayed within the cropper
  and sets the zommer function accordingly*/
  private setDimensionsAndZoomer() : void {

    let zoomRange = <HTMLInputElement>document.querySelector("#zoom-range");

    /*Get the image container's dimensions to calculate the perfect width*/
    let ipcWidth = this.imagePreviewContainer.clientWidth;
    let ipcHeight = this.imagePreviewContainer.clientHeight;
    if(this.isLandscape()) {
      /*Center the image position for lanscape images*/
      this.imagePreviewContainer.style.backgroundPosition = "0px 0px";

      if(ipcWidth * this.imgRatio < ipcHeight) {
        this.imgSize = "auto " + ipcHeight + "px";
        zoomRange.min = ipcHeight + "";
        zoomRange.max = this.imgHeight + "";
        zoomRange.value = ipcHeight + "";
      } else {
        this.imgSize = "auto " + (ipcWidth * this.imgRatio) + "px";
        zoomRange.min = ipcWidth * this.imgRatio + "";
        zoomRange.max = this.imgWidth + "";
        zoomRange.value = ipcWidth * this.imgRatio + "";
      }
    } else { //TODO...do we really want to allow this? There might be a better way!
      /*Center the image position for profile/square images*/
      this.imagePreviewContainer.style.backgroundPosition = ipcWidth/2 - this.imgWidth/4 + "px 0px";
      this.imagePreviewContainer.style.backgroundSize = "auto " + ipcHeight + "px";
      zoomRange.min = "0";
      zoomRange.max = this.imgHeight + "";
      zoomRange.value = ipcHeight + "";
    }
  }

  /*
  * Returns true if the current image's orientation is landscape
  */
  private isLandscape() : any {
    if(this.imgWidth > this.imgHeight) {
      return true;
    }
    return false;
  }
  /**Sets the image container to the OpenGraph dimension of 1:0.525*/
  private setImageContainerDimensions() : void {
    let resultImageContainer = <HTMLElement>document.querySelector(".result-image-container");
    this.imageContainerHeight = resultImageContainer.clientWidth * this.ogRatio;
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

  /*
  * Resets the image container's contents to their initial state
  */
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
    //The image container is fluid, we need to adjust the image to reflect the current position and size
    //in order to draw it correctly onto the canvas
    let xPos = parseFloat(this.imagePreviewContainer.style.backgroundPositionX);
    let yPos = parseFloat(this.imagePreviewContainer.style.backgroundPositionY);

    let dimensionFactor = this.targetCanvasHeight - this.imageContainerHeight;
     //Filter out the first size then convert and add the factor
    let backgroundHeight = parseFloat(this.imgSize.replace(/^\S+/, "")) + dimensionFactor;
    let backgroundWidth = backgroundHeight / this.imgRatio;

    //Create a canvas for the image
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", this.targetCanvasWidth + "px");
    canvas.setAttribute("height", this.targetCanvasHeight + "px");
    canvas.setAttribute("id", "capture-canvas");
    let ctx = canvas.getContext('2d');

    ctx.drawImage(this.imageElement, xPos, yPos, backgroundWidth, backgroundHeight, 0, 0, this.targetCanvasWidth, this.targetCanvasHeight);
    //Save the canvas image
    // this.data.imageAsFile = canvas.toDataURL();
    canvas.toBlob((image : Blob) => {
      this.data.imageAsFile = image;
      this.data.imageFileType = '.png';
    }, 'image/png')
    // let image : File = new File(canvas.toDataURL(), 'main-image.png', "image/png")
    console.log("Final image result as base64", this.data.imageAsFile);

    //Display the result to the user
    this.imagePreviewContainer.appendChild(canvas);
  }

  //  dataURItoBlob(dataURI : string) {
  //   var byteString = atob(dataURI.split(',')[1]);
  //   var ab = new ArrayBuffer(byteString.length);
  //   var ia = new Uint8Array(ab);
  //   for (var i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ab], { type: 'image/jpeg' });
  // }


  ngAfterViewInit() : void {
    this.imagePreviewContainer = <HTMLElement>document.querySelector("#file-input-image");
  }

  /**Handle events*/
  ngOnInit() : void {
    this.handleEvents();
  }

  /**Listen to the window to adapt image container on changes*/
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setImageContainerDimensions();
    this.setDimensionsAndZoomer();
  }
}
