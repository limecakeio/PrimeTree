import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

interface ExpiryDateOption {
  displayText: string,
  timeInMilliseconds: number
}

@Component({
  selector: 'form-element-expiry-date',
  templateUrl: './expiry-date.component.html',
  styleUrls: [ './expiry-date.component.css' ]
})
export class ExpiryDateFormComponent {

  public isModelAvailable : boolean = false;

  public expiryDateOptions : ExpiryDateOption[] = [
    {
      displayText: 'ein Tag',
      timeInMilliseconds: 86400000
    }, {
      displayText: 'eine Woche',
      timeInMilliseconds: 604800000
    }, {
      displayText: 'zwei Wochen',
      timeInMilliseconds: 1209600000
    }, {
      displayText: 'einen Monat',
      timeInMilliseconds: 2592000000
    }, {
      displayText: 'drei Monate',
      timeInMilliseconds: 7776000000
    }, {
      displayText: 'kein Ablaufdatum',
      timeInMilliseconds: null
    }
  ];

  public expiryDate : number = null;

  form : FormGroup;

  model : any;

  data : any;

  public days : number[] = this.createNumberArrayAscending(1, 31);
  public months : number[] = this.createNumberArrayAscending(1, 12);
  public years : number[] = this.createNumberArrayAscending(new Date().getFullYear(), new Date().getFullYear() + 20);

  public day : number;

  public month : number;

  public year : number;

  constructor(
    private formContextService : FormContextService
  ) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.expiryDate) {
        this.expiryDate = null;
      } else {
        this.expiryDate = this.getExpiryDateFromUnixTime();
      }
      this.form.addControl('expiryDate', new FormControl(''))
      this.isModelAvailable = true;
    })
  }

  /**Retranslates the expiry date unix time stemp to the selected time span. */
  private getExpiryDateFromUnixTime() : number {
    return this.model.expiryDate - this.model.createDate;
  }

  /**Adds the expiryDate as unix time to the model. */
  public addExpiryDateToModel() : void {
    this.model.expiryDate = this.expiryDate;
  }


  /**Creates an ascending numeric array with: form <= x <= to */
  private createNumberArrayAscending(from : number, to : number) : number[] {
    let numbers : number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    return numbers;
  }


}
