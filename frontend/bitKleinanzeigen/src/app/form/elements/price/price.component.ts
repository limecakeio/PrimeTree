import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding a price to a listing.
 */
@Component({
  selector: 'form-element-price',
  templateUrl: './price.component.html'
})
export class PriceFormComponent {

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
      if (!this.model.price) {
        this.model.price = null;
      }
      this.form.addControl('price', new FormControl('price', Validators.required));
            // Validators.compose(
            //   [Validators.required,
            //     Validators.pattern("^[0-9\.]+$")
            //   ]
      setTimeout(() => { // Angular does not want to trigger change detection after AfterViewInit, we need to trigger ist automatically with a timeout
        this.form.controls['price'].setValidators(Validators.compose([Validators.required, Validators.pattern("^[0-9\.]+$")]));
      }, 100)
      this.isModelAvailable = true;
    })
  }

}
