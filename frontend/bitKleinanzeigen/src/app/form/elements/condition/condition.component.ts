import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, SelectControlValueAccessor } from '@angular/forms';

import { FormContextService } from '../../form-context.service';

import { Condition } from '../../../model/listings/listing/condition.model';

/**
 * @member {name} The name of the option that will be displayed in the select list.
 * @member {value} The value which will be added to the model when the name item is selected.
 */
interface SelectOptions {
  name : string;
  value : string;
}

@Component({
  selector: 'form-element-condition',
  templateUrl: './condition.component.html',
  styleUrls: [ './condition.component.css' ]
})
export class ConditionFormComponent {

  public isModelAvailable : boolean = false;

  public conditionOptions : SelectOptions[] = [
    {
      name: 'Neu',
      value: Condition.New
    }, {
      name : 'Gebraucht',
      value: Condition.Used
    }
  ]

  public form : FormGroup;

  public model : any;

  private data : any;

  constructor(private formContextService : FormContextService) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.condition) {
        this.model['condition'] = "";
      }
      this.form.addControl('condition', new FormControl('', Validators.required));
      this.isModelAvailable = true;
    });
  }

}
