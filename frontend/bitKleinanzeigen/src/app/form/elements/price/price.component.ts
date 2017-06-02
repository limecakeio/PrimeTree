import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';

/**
 * Provides templates and models for adding a price to a listing.
 */
@Component({
  selector: 'form-element-price',
  templateUrl: './price.component.html'
})
export class PriceFormComponent {

  form : FormGroup;

  model : any;

  data : any;

  constructor(private formService : FormService) {
    this.model = this.formService.model;
    this.data = this.formService.data;
    this.form = this.formService.form;
    if (!this.model.price) {
      this.model.price = null;
    }
    this.form.addControl(
      'price',
      new FormControl(
        'price',
        Validators.compose(
          [Validators.required,
            Validators.pattern("^[0-9\.]+$")
          ]
        )
      )
    );
  }

}
