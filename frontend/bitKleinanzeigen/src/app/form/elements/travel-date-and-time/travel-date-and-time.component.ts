import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

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
      if (!this.model.travelDateAndTime) {
        this.model.travelDateAndTime = null;
      } else {
        this.setTimeFromUnixTime(this.model.travelDateAndTime);
      }
      this.form.addControl('day', new FormControl('', Validators.required));
      this.form.addControl('month', new FormControl('', Validators.required));
      this.form.addControl('year', new FormControl('', Validators.required));
      this.form.addControl('hour', new FormControl('', Validators.required));
      this.form.addControl('minute', new FormControl('', Validators.required));
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

  private setTimeFromUnixTime(unixTime : number) {
    let date : Date = new Date(unixTime);
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
  }

}
