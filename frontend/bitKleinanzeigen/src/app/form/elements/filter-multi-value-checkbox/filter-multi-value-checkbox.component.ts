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
  selector: 'form-element-filter-multi-value-checkbox',
  templateUrl: './filter-multi-value-checkbox.component.html',
  styleUrls: [ './filter-multi-value-checkbox.component.css' ]
})
export class FilterMultiValueCheckboxComponent implements OnChanges {

  /**
   * Property name
   */
  @Input() filterPropertyName : string;


  @Input() filterString : string;

  @Input() filterPropertyValue : string;

  @Output() filterChanged : EventEmitter<void> = new EventEmitter<void>();

  public model : any;


  public filterValueChecked : boolean = false;

  constructor(
    private formService : FormService
  ) {
    this.model = this.formService.model;
  }

  public setFilterOnModel() : void {
    this.model[this.filterPropertyName] = this.filterPropertyValue;
    this.filterChanged.emit();
  }

  public removeFilterFromModel() : void {
    this.model[this.filterPropertyName] = '';
    this.filterChanged.emit();
  }

  public changeFilterValue(event : Event) : void {
    if (this.filterValueChecked) { // filter is set
      let found : boolean = false;
      for (let i = 0; i < this.model[this.filterPropertyName].length && !found; i++) {
        if (this.model[this.filterPropertyName][i] === this.filterPropertyValue) {
          found = true;
          this.model[this.filterPropertyName].splice(i, 1);
        }
      }
    } else {
      this.model[this.filterPropertyName].push(this.filterPropertyValue);
    }
    this.filterValueChecked = !this.filterValueChecked;
    this.filterChanged.emit();
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (
      !simpleChanges.hasOwnProperty('filterPropertyName')
      ||
      !simpleChanges.hasOwnProperty('filterPropertyValue')
    ) {
      throw new Error('No filter name set for FilterCheckboxComponent! Please add one as an input property.');
    }
  }

}
