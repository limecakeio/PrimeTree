import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding a description to a listing.
 */
@Component({
  selector: 'form-element-description',
  templateUrl: './description.component.html'
})
export class DescriptionFormComponent {

  public isModelAvailable : boolean = false;

  public form : FormGroup;

  public model : any;

  private data : any;

  constructor(private formContextService : FormContextService) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.description) {
        this.model.description = '';
      }
      this.form.addControl('description', new FormControl('', Validators.required));
      this.isModelAvailable = true;
    })
  }

}
