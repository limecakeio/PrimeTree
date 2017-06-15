import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding a price to a listing.
 */
@Component({
  selector: 'form-element-location-to',
  templateUrl: './location-to.component.html'
})
export class LocationToFormComponent {

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
      if (!this.model.toLocation) {
        this.model.toLocation = '';
      }
      this.form.addControl('toLocation', new FormControl('toLocation', Validators.required));
      this.isModelAvailable = true;
    })
  }

}
