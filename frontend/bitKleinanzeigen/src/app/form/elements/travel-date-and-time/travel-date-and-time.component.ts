import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

/**
 * Provides templates and models for adding a description to a listing.
 */
@Component({
  selector: 'form-element-travel-date-and-time',
  templateUrl: './travel-date-and-time.component.html',
  styleUrls: [ './travel-date-and-time.component.css' ]
})
export class TravelDateAndTimeFormComponent {

  public isModelAvailable : boolean = false;

  form : FormGroup;

  model : any;

  data : any;

  public days : number[] = this.createNumberArrayAscending(1, 31);
  public months : number[] = this.createNumberArrayAscending(1, 12);
  public years : number[] = this.createNumberArrayAscending(new Date().getFullYear(), new Date().getFullYear() + 20);
  public hours : number[] = this.createNumberArrayAscending(0, 23);
  public minutes : number[] = [0, 15, 30, 45];

  public day : number;

  public month : number;

  public year : number;

  public hour : number;

  public minute : number;

  constructor(
    private formContextService : FormContextService
  ) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.expiryDate) {
        this.model.expiryDate = null;
      }
      this.form.addControl('day', new FormControl('day', Validators.required));
      this.form.addControl('month', new FormControl('month', Validators.required));
      this.form.addControl('year', new FormControl('year', Validators.required));
      this.form.addControl('hour', new FormControl('hour', Validators.required));
      this.form.addControl('minute', new FormControl('minute', Validators.required));
      this.isModelAvailable = true;
    })
  }

  public addTravelDateAndTimeToModel() : void {
    if (this.day && this.month && this.year && this.hour && this.minute) {
      let unixDate : number = new Date(this.year, this.month, this.day, this.hour, this.minute).getTime();
      this.model.travelDateAndTime = unixDate;
    }
  }

  private createNumberArrayAscending(from : number, to : number) : number[] {
    let numbers : number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }

}
