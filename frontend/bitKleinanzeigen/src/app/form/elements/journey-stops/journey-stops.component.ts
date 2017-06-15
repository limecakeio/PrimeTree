import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

@Component({
  selector: 'form-element-journey-stops',
  templateUrl: './journey-stops.component.html',
  styleUrls: [ './journey-stops.component.css' ]
})
export class JourneyStopsFormComponent {

  public isModelAvailable : boolean = false;

  public journeyStop : string = '';

  form : FormGroup = new FormGroup({}); // needs it one FormGroup

  model : any;

  data : any;

  constructor(private formContextService : FormContextService) {
    this.data = this.formContextService.data;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.journeyStops) {
        this.model.journeyStops = [];
      }
      this.model = this.formContextService.model;
      this.form.addControl('journeyStop', new FormControl('journeyStop', Validators.required));
      this.isModelAvailable = true;
    })
  }

  public createJourneyStop() : void {
    this.model.journeyStops.push(this.journeyStop);
    this.journeyStop = '';
  }

}
