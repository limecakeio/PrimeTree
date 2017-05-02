import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormElementsService } from '../formElements.service';

@Component({
  selector: 'input-image',
  templateUrl: 'image.component.html',
  styleUrls: ['../elements.form.css']
})
export class ImageFormComponent {
  model : any;
  form : FormGroup;

  imagesrc : string = '';

  constructor(private formElementsService : FormElementsService) {
    this.model = this.formElementsService.model;
    this.form = this.formElementsService.form;
  //  this.form.addControl('image', new FormControl('', Validators.required));
  }

  submitImage(event : any) : void {
    if (event === null || event.target === null || event.target.files === null) {
      return;
    }
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = this.readerOnload.bind(this);
    reader.readAsDataURL(file);
    this.model.imageObj = file;
  }

  private readerOnload(e : any) {
    let reader = e.target;
    this.imagesrc = reader.result;
    this.model.image = this.imagesrc;
    console.log(this.model);
  }
}
