import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { MessageService, Message } from '../../../shared/message.service'
import { NetworkService } from '../../../network/network.service';

import { FormService } from '../../forms.service';

import { FormContextService } from '../../../form/form-context.service';

@Component({
  selector: 'form-element-image',
  templateUrl: './image.component.html',
  styleUrls: [ './image.component.css' ]
})
export class ImageFormComponent {

  public isModelAvailable : boolean = false;

  constructor(
    private formContextService : FormContextService,
    private domSanitizer : DomSanitizer,
    private networkService : NetworkService,
    private messageService : MessageService
  ) {
    this.formContextService.getContext().subscribe(() => {
      this.data = this.formContextService.data;
      this.model = this.formContextService.model;
      this.form = this.formContextService.form;
      if (typeof this.data.imageAsFile === 'undefined') {
        this.data.imageAsFile = null;
      }
      if (this.model.mainImage) {
        this.loadImageFromPath(this.model.mainImage);
      }
      this.isModelAvailable = true;
    });
  }
  model : any;
  @ViewChild("imageInputContainer") imageInputContainer : ElementRef;
  form : FormGroup;

  data : any;

  /*IMAGE RULES*/
  minImageWidth = 600;
  minImageHeight = 315;
  validFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']

  /**ORIGINAL IMAGE*/
  imageElement: HTMLImageElement;
  imgWidth: number;
  imgHeight: number;
  imgRatio : number;

  /*PARSED IMAGE RESULT [DYNAMIC]*/
  imgPosX: number = 0;
  imgPosY: number = 0;
  backgroundImgSize : string;
  @ViewChild("resultImage") resultImage : ElementRef;
  resultImageContainerHeight: number;
  @ViewChild("zoomRange") zoomRange : ElementRef;

  /*CANVAS FOR FINAL IMAGE*/
  targetCanvasWidth: number = 600;
  targetCanvasHeight: number = 315;
  ogRatio: number = 0.525;

  /*FINAL IMAGE*/
  @ViewChild("finalImageContainer") finalImageContainer : ElementRef;
  @ViewChild("finalImage") finalImage : ElementRef;

  private div : Element;
  private addMulipleEventListener(element : Element, eventstring : string, handle : any) : void {
    let events : string[] = eventstring.split(' ');
    events.forEach((event : string) => {
      element.addEventListener(event, handle);
    });
  }

  /**
   * Generates and presents a preview from the image located at the path.
   */
  private loadImageFromPath(path : string) : void {
    if (path.indexOf('http') === -1) {
      path = this.networkService.getServerAddress() + path;
    }
    this.finalImage.nativeElement.src = path;
    this.imageInputContainer.nativeElement.classList.remove('active');
    this.finalImageContainer.nativeElement.classList.add('active');
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
      this.preloadImage(event.dataTransfer.files[0]);
    });
  };

  /*
  * We also allow the user to click and choose a file from their system
  */
  imageInput(event : any) {
    this.preloadImage(event.target.files[0]);
  }

  /*
  * Generates and presents a preview from the uploader
  * @imageFile the file submitted by the uploader
  */
  private preloadImage(imageFile : File) : void {
    try {
      this.validateImageFile(imageFile);
      /*GENERATE IMAGE PREVIEW*/
      let imageResult = new Image();
      imageResult.src = URL.createObjectURL(imageFile);

      let ImageComponent : ImageFormComponent = this; //Binding "this" to async method

      imageResult.onload = function() {
        /**Save the image*/
        ImageComponent.imageElement = imageResult;
        /*Set the images dimensions*/
        ImageComponent.imgWidth = imageResult.width;
        ImageComponent.imgHeight = imageResult.height;

        try {
          ImageComponent.validateImageDimensions();
          /*Set the image's ratio*/
          ImageComponent.imgRatio = imageResult.height / imageResult.width;

          /*Hide the image upload*/
          ImageComponent.imageInputContainer.nativeElement.classList.remove("active");

          /*Show the image preview - HAVE TO DO THIS FIRST TO GRAB CONTAINER DIMENSIONS LATER*/
          ImageComponent.resultImage.nativeElement.classList.add("active");

          ImageComponent.setImageContainerDimensions();

          /*Inject image into preview as a background image*/
          ImageComponent.resultImage.nativeElement.style.backgroundImage = "url('" + imageResult.src + "')";
          ImageComponent.setDimensionsAndZoomer();
        } catch(error) { // Validate Dimensions
          ImageComponent.messageService.sendMessage({
            message: 'notify-error',
            payload: error
          });
        }
      }
    } catch(error) {//Validate File
      this.messageService.sendMessage({
        message: 'notify-error',
        payload: error
      });
    }
  }

  /*
   * Achieves a zoom effect by manipulating a background image's height attribute, while
   * the width is auto calculated by css.
   */
  public zoomImage() : void {
    this.backgroundImgSize = "auto " + this.zoomRange.nativeElement.value + "px";
    this.centerImage();
  }

  /**Calculates the best position for an image to be displayed within the cropper
  and sets the zommer function accordingly*/
  private setDimensionsAndZoomer() : void {

    /*Get the image container's dimensions to calculate the perfect width*/
    let ipcWidth = this.resultImage.nativeElement.clientWidth;
    let ipcHeight = this.resultImageContainerHeight;

    /*See if the image is underflowing the container on any side*/
    let i = 0;
    if(this.imgWidth <= ipcWidth || this.imgHeight <= ipcHeight) {
        //Scale up the image until it at least fills the container
        i = this.imgHeight;
        while(i / this.imgRatio < ipcWidth || i < ipcHeight) {
          i++;
        }
        //Set the ranger's minimum
        this.zoomRange.nativeElement.min = i + "";
        //Then add another 25% to have a zoom effect
        i += i/4;
        //Set the remaining zoom ranger settings
        this.zoomRange.nativeElement.max = i + "";
        this.zoomRange.nativeElement.value = i + "";
    } else {
      //Scale down the image until it just fills the container
      i = this.imgHeight;
      while(i / this.imgRatio > ipcWidth && i > ipcHeight) {
        i--;
      }
      //Set the zoom ranger boundaries
      this.zoomRange.nativeElement.min = i + "";
      this.zoomRange.nativeElement.max = this.imgHeight + "";

      //Set the display value to be half-way between min and max
      i += (this.imgHeight - ipcHeight) / 4;
      this.zoomRange.nativeElement.value = i + "";
    }
    this.backgroundImgSize = "auto " + i + "px";

    //Center the image horizontally as well as vertically
    this.centerImage();
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
    this.resultImageContainerHeight = this.resultImage.nativeElement.clientWidth * this.ogRatio;
  }
  /**Moves an image into the direction as provided by the String parameter up, down, left or right*/
  public moveImage(direction : String) : void {
    //Add a gliding effect to the movement
    this.resultImage.nativeElement.style.transition = "background-position 0.25s linear";
    const moveBy = 20;

    if(direction === 'up') {
      this.imgPosY -= moveBy;
    } else if (direction === 'down') {
      this.imgPosY += moveBy;
    } else if (direction === 'left') {
      this.imgPosX -= moveBy;
    } else if (direction === 'right') {
      this.imgPosX += moveBy;
    } else {
      throw new Error("Invalid direction to move image by.");
    }

    //Check that we didn't move too far
      if(this.imgPosY > 0) {//North-breach
        this.imgPosY -= moveBy;
      } else if(this.imgPosX > 0) {// West-breach
        this.imgPosX -= moveBy;
      } else if(this.imgPosY < -(this.getBackgroundImageHeight() - this.getImageContainerHeight())) {
        this.imgPosY += moveBy;
      } else if(this.imgPosX < -(this.getBackgroundImageWidth() - this.getImageContainerWidth())) {
        this.imgPosX += moveBy;
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
    //Reset the file
    this.data.imageAsFile = null;

    //Reset and hide the final image
    this.finalImage.nativeElement.src = "";
    this.finalImageContainer.nativeElement.classList.remove("active");

    //Reset and hide the image preview
    this.imgPosY = 0;
    this.imgPosX = 0;
    this.backgroundImgSize = "auto 0px";
    this.resultImageContainerHeight = 0;
    this.imgWidth = 0;
    this.imgHeight = 0;
    this.imageElement = null;
    this.resultImage.nativeElement.classList.remove("active");

    //Restore the input form
    this.imageInputContainer.nativeElement.classList.add("active");
  }

  public captureImage() : void {
    //Get the size difference between the image container and the target canvas
    let containerToCanvasRatio = this.getImageContainerHeight() / this.targetCanvasHeight;
    //Apply this difference to the image size and positioning
    let targetImageWidth = this.getBackgroundImageWidth() / containerToCanvasRatio;
    let targetImageHeight = this.getBackgroundImageHeight() / containerToCanvasRatio;
    let targetOffsetX = this.imgPosX / containerToCanvasRatio;
    let targetOffsetY = this.imgPosY / containerToCanvasRatio;

    //Create the canvas to process the target image
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", this.targetCanvasWidth + "");
    canvas.setAttribute("height", this.targetCanvasHeight + "");
    let ctx = canvas.getContext('2d');

    ctx.drawImage(this.imageElement, targetOffsetX, targetOffsetY, targetImageWidth, targetImageHeight);

    //Convert and set the file to be uploaded
    canvas.toBlob((image : Blob) => {
      this.data.imageAsFile = image;
      this.data.imageFileType = '.png';
    }, 'image/png');

    //Hide the image editor
    this.resultImage.nativeElement.classList.remove("active");

    //Display the result to the user
    this.finalImage.nativeElement.src = canvas.toDataURL();
    this.finalImageContainer.nativeElement.classList.add("active");
  }

  /**Handle events*/
  ngOnInit() : void {
    this.handleEvents();
  }

  /*
   * Positions the image preview in the centre of its viewport
   */
  private centerImage() : void {
    //Ensure the centering is not animated
    this.resultImage.nativeElement.style.transition = "";

    //Calculate the offset based on dimensions
    let heightOffset = (this.getBackgroundImageHeight() - this.getImageContainerHeight()) / 4;
    let widthOffset = (this.getBackgroundImageWidth() - this.getImageContainerWidth()) / 4;
    //Set the new positions
    this.imgPosY = -(heightOffset);
    this.imgPosX = -(widthOffset);
  }

  private getBackgroundImageHeight() : number {
    return parseFloat(this.backgroundImgSize.replace(/^\S+/, ""));
  }

  private getBackgroundImageWidth() : number {
    return parseFloat(this.backgroundImgSize.replace(/^\S+/, "")) / this.imgRatio;
  }

  private getImageContainerHeight() : number {
    return this.resultImageContainerHeight;
  }

  private getImageContainerWidth() : number {
    return this.resultImage.nativeElement.clientWidth;
  }

  /*
  * Throws an error if a submitted file is not of the correct type
  * @argument imageFile - the image file-object
  */
  private validateImageFile(imageFile : File) : void {
    let result = this.validFileTypes.filter((fileType) => fileType === imageFile.type);
    if(result.length === 0) {
      let errorMsg = "\"" + imageFile.type + "\" ist kein erlaubter Dateityp."
      throw new Error(errorMsg);
    }
  }

  /*
   * Throws an error if an image object does not meet the preset dimension restrictions
   */
  private validateImageDimensions() : void {
    if(this.imgWidth < this.minImageWidth
      || this.imgHeight < this.minImageHeight) {
        let errorMsg = "Falsche Bild Dimension. Die Bild-Datei muss mindestens " +
        this.minImageWidth +
        "px breit und " +
        this.minImageHeight +
        "px hoch sein. Dein Bild ist " +
        this.imgWidth +
        "px breit und " +
        this.imgHeight +
        "px hoch.";
        throw new Error(errorMsg);
      }
  }

  /**Listen to the window to adapt image container on changes*/
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setImageContainerDimensions();
    this.setDimensionsAndZoomer();
  }

  /**Listen to Keyboard events for the image manipulator*/
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    //Avoid scrolling
    if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    if(event.keyCode === 38) {
      this.moveImage('up');
    } else if(event.keyCode === 39) {
      this.moveImage('right');
    } else if(event.keyCode === 40) {
      this.moveImage('down');
    } else if(event.keyCode === 37) {
      this.moveImage('left');
    }
  }

}
