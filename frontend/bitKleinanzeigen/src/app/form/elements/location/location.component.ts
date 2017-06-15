import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

export interface LocationProperty {
  property : string,
  display : string
}

@Component({
  selector: 'form-element-location',
  templateUrl: './location.component.html',
  styleUrls: [ './location.component.css' ]
})
export class LocationFormComponent implements OnInit {

  public isModelAvailable : boolean = false;

  @Input() location : LocationProperty;

  public model : any;

  public form : FormGroup;

  public locationProperty : string;

  public locationDisplay : string;

  constructor(
    private formContextService : FormContextService
  ) {
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      this.isModelAvailable = true;
    })
  }

  /** Checks whether an input property name was submitted and throws an Error if not.*/
  public ngOnInit() : void {
    this.form.addControl(this.location.property, new FormControl(this.location.property, Validators.required));
    this.locationProperty = this.location.property;
    this.locationDisplay = this.location.display;
  }

}
