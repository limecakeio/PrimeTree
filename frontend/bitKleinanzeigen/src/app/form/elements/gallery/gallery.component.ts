import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';

/**
 * Provides templates and models for adding a price to a listing.
 */
@Component({
  selector: 'form-element-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryFormComponent {

  form : FormGroup;

  model : any;

  data : any;

  constructor(private formService : FormService) {
    this.model = this.formService.model;
    this.data = this.formService.data;
    this.form = this.formService.form;
    if (!this.model.price) {
      this.model.gallery = [];
    }
    // this.form.addControl(
    //   'gallery',
    //   new FormControl(
    //     'gallery',
    //     Validators.required,
    //   )
    // );
  }

}
