import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

@Component({
  selector: 'form-element-available-seats',
  templateUrl: './available-seats.component.html'
})
export class AvailableSeatsFormComponent {

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
      this.model = this.formContextService.model; // connect the shared model
      if (!this.model.availableSeats) {
        this.model.availableSeats = null;
      }
      this.form.addControl('availableSeats', new FormControl(''));
      this.isModelAvailable = true;
    })
  }

}
