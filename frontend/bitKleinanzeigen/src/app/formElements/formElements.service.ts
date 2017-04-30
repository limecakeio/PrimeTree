import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Listing } from '../model/listings/listing.model';

@Injectable()
export class FormElementsService {
  public form : FormGroup = new FormGroup({});
  public model : any;

  public addFormControl(name : string, control : FormControl) {
    this.form.addControl(name, control);
  }
}
