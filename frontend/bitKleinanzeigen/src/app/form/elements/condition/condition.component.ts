import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';

/**
 * Provides templates and models for adding a description to a listing.
 */
@Component({
  selector: 'form-element-condition',
  templateUrl: './condition.component.html',
  styleUrls: [ './condition.component.css' ]
})
export class ConditionFormComponent {

  form : FormGroup;

  model : any;

  data : any;

  constructor(private formService : FormService) {
    this.model = this.formService.model;
    this.data = this.formService.data;
    this.form = this.formService.form;
    if (!this.model.condition) {
      this.model.condition = '';
    }
    this.form.addControl('condition', new FormControl('condition'));
  }

  public console(event : Event) : void {
    console.log(event);
  }

}
