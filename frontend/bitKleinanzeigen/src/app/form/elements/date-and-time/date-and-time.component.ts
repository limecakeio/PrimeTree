import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

export interface DateAndTimeProperty {
  name : string,
  displayText : string
}

/**
 * Provides templates and models for adding a description to a listing.
 */
@Component({
  selector: 'form-element-date-and-time',
  templateUrl: './date-and-time.component.html',
  styleUrls: [ './date-and-time.component.css' ]
})
export class DateAndTimeFormComponent implements OnInit {

  @Input() dateAndTimeProperty : DateAndTimeProperty;

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
      this.form.addControl('day', new FormControl('', Validators.required));
      this.form.addControl('month', new FormControl('', Validators.required));
      this.form.addControl('year', new FormControl('', Validators.required));
      this.form.addControl('hour', new FormControl('', Validators.required));
      this.form.addControl('minute', new FormControl('', Validators.required));
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

  private createNumberArrayAscending(from : number, to : number) : number[] {
    let numbers : number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  public ngOnInit() : void {
    if (this.dateAndTimeProperty) {
      this.dateAndTimePropertyDisplayText = this.dateAndTimeProperty.displayText;
      this.dateAndTimePropertyName = this.dateAndTimeProperty.name;
      this.isInputAvailable = true;
    }
  }

}
