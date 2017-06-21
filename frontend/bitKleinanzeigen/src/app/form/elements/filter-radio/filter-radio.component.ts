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
  selector: 'form-element-filter-radio',
  templateUrl: './filter-radio.component.html',
  styleUrls: [ './filter-radio.component.css' ]
})
export class FilterRadioComponent implements OnChanges {

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
    event.preventDefault();
    if (this.filterValueChecked) { // filter is set
      if (this.model[this.filterPropertyName] === this.filterPropertyValue) { // if filter value is from this checkbox
        this.model[this.filterPropertyName] = '';
        this.filterValueChecked = !this.filterValueChecked;
        this.filterChanged.emit();
      } // else is omitted because many checkboxes can share the same filter
    } else { // filter is not set
      this.filterValueChecked = !this.filterValueChecked;
    }
  }

  public  changeFilterValue2(event : Event) : void {
    event.preventDefault();
    if (this.filterValueChecked) { // filter is set
      if (this.model[this.filterPropertyName] === this.filterPropertyValue) { // if filter value is from this checkbox
        this.model[this.filterPropertyName] = '';
        this.filterValueChecked = !this.filterValueChecked;
        this.filterChanged.emit();
      } // else is omitted because many checkboxes can share the same filter
    } else {
      if (this.model[this.filterPropertyName] === '') { // filter is not set
        this.model[this.filterPropertyName] = this.filterPropertyValue;
        this.filterValueChecked = !this.filterValueChecked;
        this.filterChanged.emit();
      }
    }
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (
      !simpleChanges.hasOwnProperty('filterPropertyName')
      ||
      !simpleChanges.hasOwnProperty('filterPropertyValue')
    ) {
      throw new Error('No filter name set for FilterRadioComponent! Please add one as an input property.');
    }
  }

}
