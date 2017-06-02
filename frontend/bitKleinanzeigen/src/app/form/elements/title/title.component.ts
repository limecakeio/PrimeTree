import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';

/**
 * Provides templates and models for adding the title to a listing.
 */
@Component({
  selector: 'form-element-title',
  templateUrl: './title.component.html'
})
export class TitleFormComponent {

  form : FormGroup;

  model : any;

  data : any;

  constructor(private formService : FormService) {
    this.model = this.formService.model;
    this.data = this.formService.data;
    this.form = this.formService.form;
    if (!this.model.title) {
      this.model.title = null;
    }
    this.form.addControl('title', new FormControl('title', Validators.required));
  }

}
