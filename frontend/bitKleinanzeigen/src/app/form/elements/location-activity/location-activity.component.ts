import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding a price to a listing.
 */
@Component({
  selector: 'form-element-location-activity',
  templateUrl: './location-activity.component.html'
})
export class LocationActivityFormComponent {

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
      if (!this.model.activityLocation) {
        this.model.activityLocation = '';
      }
      this.form.addControl('activityLocation', new FormControl('activityLocation', Validators.required));
      this.isModelAvailable = true;
    })
  }

}
