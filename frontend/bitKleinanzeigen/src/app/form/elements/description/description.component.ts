import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';

/**
 * Provides templates and models for adding a description to a listing.
 */
@Component({
  selector: 'form-element-description',
  templateUrl: './description.component.html'
})
export class DescriptionFormComponent {

  form : FormGroup;

  model : any;

  data : any;

  constructor(private formService : FormService) {
    this.model = this.formService.model;
    this.data = this.formService.data;
    this.form = this.formService.form;
    if (!this.model.description) {
      this.model.description = null;
    }
    this.form.addControl('description', new FormControl('description', Validators.required));
  }

}
