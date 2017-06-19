import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

export interface DateAndTimeProperty {
  name : string, // property name
  displayText : string // displayed description befor the date select
}

@Component({
  selector: 'form-element-date-and-time',
  templateUrl: './date-and-time.component.html',
  styleUrls: [ './date-and-time.component.css' ]
})
export class DateAndTimeFormComponent implements OnInit {

  @Input() dateAndTimeProperty : DateAndTimeProperty;

  @Input() required : boolean = false;

  public dateAndTimePropertyName : string;

  public dateAndTimePropertyDisplayText : string;

  public isInputAvailable : boolean = false;

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
  public dayControlName : string;

  public month : number;
  public monthControlName : string;

  public year : number;
  public yearControlName : string;

  public hour : number;
  public hourControlName : string;

  public minute : number;
  public minuteControlName : string;

  constructor(
    private formContextService : FormContextService,
  ) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      this.isModelAvailable = true;
    })
  }

  /**Checks whether the Input as well as the model is available and adds the property if it is missing. */
  private checkModel() : void {
    if (this.isInputAvailable && this.isModelAvailable) {
      if (!this.model[this.dateAndTimeProperty.name]) {
        this.model[this.dateAndTimeProperty.name] = null;
      }
    }
  }

  /**Adds the unix time of the selected date to the model. */
  public addDateAndTimeToModel() : void {
    if (this.day && this.month && this.year && this.hour && this.minute) {
      let unixDate : number = new Date(this.year, this.month, this.day, this.hour, this.minute).getTime();
      this.model[this.dateAndTimeProperty.name] = unixDate;
    }
  }

  /**Creates and returns an numeric ascending array with from <= x <= to */
  private createNumberArrayAscending(from : number, to : number) : number[] {
    let numbers : number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  public ngOnInit() : void {
    if (this.dateAndTimeProperty) {
      if (this.model[this.dateAndTimeProperty.name]) {
        this.setTimeFromUnixTime(this.model[this.dateAndTimeProperty.name]);
      }
      // this.dateAndTimePropertyDisplayText = this.dateAndTimeProperty.displayText;
      // this.dateAndTimePropertyName = this.dateAndTimeProperty.name;
      // this.dayControlName = 'day' + this.dateAndTimePropertyName;
      // this.form.addControl(this.dayControlName, new FormControl('', Validators.required));
      // this.monthControlName = 'month' + this.dateAndTimePropertyName;
      // this.form.addControl(this.monthControlName, new FormControl('', Validators.required));
      // this.yearControlName = 'year' + this.dateAndTimePropertyName;
      // this.form.addControl(this.yearControlName, new FormControl('', Validators.required));
      // this.hourControlName = 'hour' + this.dateAndTimePropertyName;
      // this.form.addControl(this.hourControlName, new FormControl('', Validators.required));
      // this.minuteControlName = 'minute' + this.dateAndTimePropertyName;
      // this.form.addControl(this.minuteControlName, new FormControl('', Validators.required));
      this.dateAndTimePropertyDisplayText = this.dateAndTimeProperty.displayText;
      this.dateAndTimePropertyName = this.dateAndTimeProperty.name;

      this.dayControlName = 'day' + this.dateAndTimePropertyName;
      this.addFormControl(this.dayControlName);
      this.monthControlName = 'month' + this.dateAndTimePropertyName;
      this.addFormControl(this.monthControlName);
      this.yearControlName = 'year' + this.dateAndTimePropertyName;
      this.addFormControl(this.yearControlName);
      this.hourControlName = 'hour' + this.dateAndTimePropertyName;
      this.addFormControl(this.hourControlName);
      this.minuteControlName = 'minute' + this.dateAndTimePropertyName;
      this.addFormControl(this.minuteControlName);
      this.isInputAvailable = true;
    }
  }

  private addFormControl(controlName: string) : void {
    if (this.required) {
      this.form.addControl(controlName, new FormControl('', Validators.required));
    } else {
      this.form.addControl(controlName, new FormControl(''));
    }
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
