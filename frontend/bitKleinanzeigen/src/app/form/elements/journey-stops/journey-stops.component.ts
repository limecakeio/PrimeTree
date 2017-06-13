import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormService } from '../../forms.service';


@Component({
  selector: 'form-element-journey-stops',
  templateUrl: './journey-stops.component.html',
  styleUrls: [ './journey-stops.component.css' ]
})
export class JourneyStopsFormComponent {

  form : FormGroup;

  model : any;

  data : any;

  constructor(private formService : FormService) {
    this.model = this.formService.model;
    this.data = this.formService.data;
    this.form = this.formService.form;
    if (!this.model.journeyStops) {
      this.model.journeyStops = [];
    }
  }

}
