import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormElementsService } from '../formElements.service';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'input-image',
  templateUrl: './image.component.html',
  styleUrls: [ './image.component.css' ]
})
export class ImageFormComponent implements OnInit {
  model : any;
  form : FormGroup;
  data : any;
  imagesrc : SafeUrl = '';
  image : SafeStyle;

  private div : Element;

  private addMulipleEventListener(element : Element, eventstring : string, handle : any) : void {
    let events : string[] = eventstring.split(' ');
    events.forEach((event : string) => {
      element.addEventListener(event, handle);
    });
  }

  private handleEvents() : void {
    this.div = document.querySelector('.image-box');
    console.log(this.div);
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

    this.addMulipleEventListener(this.div, 'drop', (event : any) => {
      // console.log(event);
      this.data.imageAsFile = event.dataTransfer.files[0];

      /*GENERATE IMAGE PREVIEW*/
      let imageResult = document.createElement("img");
      imageResult.src = URL.createObjectURL(this.data.imageAsFile);

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

    this.addMulipleEventListener(this.div, 'click', (event : any) => {
      // console.log(event, 'click');
    });
  };

  input(event : any) {
    this.data.imageAsFile = event.target.files[0];
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


  constructor(
    private formElementsService : FormElementsService,
    private domSanitizer : DomSanitizer
  ) {
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
}
