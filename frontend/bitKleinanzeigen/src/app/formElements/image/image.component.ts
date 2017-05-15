import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormElementsService } from '../formElements.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
      console.log(event);
      this.data.imageAsFile = event.dataTransfer.files[0];
      this.fileToBase(this.data.imageAsFile, (base : string) => {
        this.data.imageAsBase = base;
        this.data.imageAsByteArray = this.baseToByte(base);
        let file : File = this.byteToFile(this.data.imageAsByteArray);
        // URL.createObjectURL(file);
        this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
        
        console.log(this.data);
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
    let file : File = new File(byteArray, (Math.random()*1000) +'.jpg', {
      type: 'image/jpg'
    });
    return file;
  }

  private byteToBase(byteArray : Uint8Array) : string {
    let base : string = 'data:image/jpg;base64,';
    let binary : string = '';
    const length : number = byteArray.length;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(byteArray[i]);
    }
    return base + window.btoa(binary);
  }
}
