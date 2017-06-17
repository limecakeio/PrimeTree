import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Reoccurence } from '../../../model/listings/request/recreation-request/reoccurence.model';

import { FormContextService } from '../../form-context.service';

interface ReoccurenceOptions {
  name : string;
  value : string;
}

@Component({
  selector: 'form-element-reoccurence',
  templateUrl: './reoccurence.component.html'
})
export class ReoccurenceFormComponent {

  public isModelAvailable : boolean = false;

  public reoccurenceOptions : ReoccurenceOptions[] = [
    {
      name: 'Einmalig',
      value: Reoccurence.OneOf
    }, {
      name: 'Täglich',
      value: Reoccurence.Daily
    }, {
      name: 'Wöchentlich',
      value: Reoccurence.Weekly
    }, {
      name: 'Zweitwöchentlich',
      value: Reoccurence.Fortnightly
    }, {
      name: 'Monatlich',
      value: Reoccurence.Monthly
    }, {
      name: 'Verschieden',
      value: Reoccurence.Randomly
    }
  ];

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
      if (!this.model.reoccurence) {
        this.model.reoccurence = null;
      }
      this.form.addControl('reoccurence', new FormControl('', Validators.required));
      this.isModelAvailable = true;
    })
  }

}
