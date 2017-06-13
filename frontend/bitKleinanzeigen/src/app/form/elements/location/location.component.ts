import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';

@Component({
  selector: 'form-element-location',
  templateUrl: './location.component.html',
  styleUrls: [ './location.component.css' ]
})
export class LocationFormComponent implements OnInit {

  @Input() locationPropertyName : string;

  @Input() labelText : string;

  public model : any;

  public form : FormGroup;

  public isDataAvailable : boolean = false;

  constructor(
    private formService : FormService
  ) {
    this.model = this.formService.model;
    this.form = this.formService.form;
  }

  /** Checks whether an input property name was submitted and throws an Error if not.*/
  public ngOnInit() : void {
    if (typeof this.locationPropertyName !== 'string') {
      throw new Error('No property name found for LocationFormComponent. Please add one as an @Input');
    } else {
      if (!this.model[this.locationPropertyName]) { // check whether a property of this name exisits and create it if not
        this.model[this.locationPropertyName] = '';
      }
    }
    if (typeof this.labelText !== 'string') {
      this.labelText = this.locationPropertyName;
    }
  }

}
