import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../forms.service';

@Component({
  selector: 'form-element-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: [ './filter-checkbox.component.css' ]
})
export class FilterCheckboxComponent implements OnChanges {

  /**
   * Property name
   */
  @Input() filterPropertyName : string;


  @Input() filterString : string;

  @Input() filterPropertyValue : string;

  @Output() filterChanged : EventEmitter<void> = new EventEmitter<void>();

  public model : any;

  public data : any;

  public filterValueChecked : boolean = false;

  constructor(
    private formService : FormService
  ) {
    this.model = this.formService.model;
    if (typeof this.formService.data === 'undefined') {
      this.formService.data = {};
    }
    this.data = this.formService.data;
  }

  public changeFilterValue(event : Event) : boolean {
    // event.preventDefault();
    // event.stopPropagation();
    let checkboxStatus : boolean = this.filterValueChecked;
    if (this.filterValueChecked) {
      this.filterValueChecked = false;
      this.data[this.filterPropertyName + 'FilterCheckboxChecked'] = false;
      checkboxStatus = false;
    } else {
      if (this.data[this.filterPropertyName + 'FilterCheckboxChecked']) {
        checkboxStatus = false;
      } else {
        this.filterValueChecked = true;
        this.data[this.filterPropertyName + 'FilterCheckboxChecked'] = true;
        checkboxStatus = true;
      }
    }
    return !checkboxStatus;
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (
      !simpleChanges.hasOwnProperty('filterPropertyName')
      ||
      !simpleChanges.hasOwnProperty('filterPropertyValue')
    ) {
      throw new Error('No filter name set for FilterCheckboxComponent! Please add one as an input property.');
    }
    if (typeof this.data[this.filterPropertyName + 'FilterCheckboxChecked'] === 'undefined') {
      this.data[this.filterPropertyName + 'FilterCheckboxChecked'] = false;
    }
  }

}
