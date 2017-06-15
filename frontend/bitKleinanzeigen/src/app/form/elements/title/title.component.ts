import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding the title to a listing.
 */
@Component({
  selector: 'form-element-title',
  templateUrl: './title.component.html'
})
export class TitleFormComponent {

  public isModelAvailable : boolean = false;

  form : FormGroup;

  model : any;

  data : any;

  constructor(
    private formContextService : FormContextService
  ) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.title) {
        this.model.title = null;
      }
      this.form.addControl('title', new FormControl('title', Validators.required));
      this.isModelAvailable = true;
    })
  }

}
