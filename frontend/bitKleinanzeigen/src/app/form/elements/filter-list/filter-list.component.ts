import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { FormService } from '../../forms.service';

export interface FilterListItem {
  value : string;
  displayText? : string;
}


@Component({
  selector: 'filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: [ './filter-list.component.css' ]
})
export class FilterListComponent  implements OnChanges {


  @Input() filterListItems : FilterListItem[] | string[];

  /** after activating a filter formService.model['filterPropertyName'] will be set with the filter value*/
  @Input() filterPropertyName : string;

  /** Only one or no filter can be activated*/
  @Input() mutuallyExclusive : boolean = false;

  /** adds a select all filter at the end*/
  @Input() selectAll : boolean | FilterListItem | string = false;

  @Output() filterChanged : EventEmitter<void> = new EventEmitter<void>();

  public model : any;

  public filterList : FilterListItem[] = [];

  private mutuallyExclusiveItemSet : boolean = false;

  public selectAllFilterListItem : FilterListItem;

  public selectAllEnabled : boolean = false;

  constructor(
    private formService : FormService,
    private elementRef : ElementRef
  ) {
    this.model = this.formService.model;

  }

  public triggerFilter(event : Event) : void {
    // let filter : string = event.srcElement.innerHTML;
    if (this.mutuallyExclusive) {
      this.handleMutuallyExclusiveFilter(event.target || event.srcElement);
    } else {
      this.handleFilterWithMultipleValues(event.target || event.srcElement);
    }
    this.filterChanged.emit();
  }

  private triggerAll() : void {
    let elements = this.elementRef.nativeElement.querySelectorAll("#element-list li");
    this.model[this.filterPropertyName] = [];
    elements.forEach((element : any) => {
        if (element.dataset.id) {
          element.classList.add('active');
        }
    });
    this.filterList.forEach((filterListItem : FilterListItem) => {
      this.model[this.filterPropertyName].push(filterListItem.value);
    });
    this.filterChanged.emit();
  }

  private handleFilterWithMultipleValues(element : any) : void {
    if (element.classList.contains('active')) {
      let found : boolean = false;
      for (let i = 0; i < this.model[this.filterPropertyName].length && !found; i++) {
        if (this.model[this.filterPropertyName][i] === this.getFilterValueFromFilterDisplayText(element.innerHTML)) {
          found = true;
          this.model[this.filterPropertyName].splice(i, 1);
          element.classList.remove('active');
        }
      }
    } else {
      this.model[this.filterPropertyName].push(this.getFilterValueFromFilterDisplayText(element.innerHTML));
      element.classList.add('active');
    }
  }

  private handleMutuallyExclusiveFilter(element : any) : void {
    if (element.classList.contains('active')) { // user wants to deactivate this filter
      this.model[this.filterPropertyName] = '';
      this.mutuallyExclusiveItemSet = false;
      element.classList.remove('active');
    } else {
      if (this.mutuallyExclusiveItemSet) {
        this.elementRef.nativeElement.querySelector('.active').classList.remove('active');
      }
      this.model[this.filterPropertyName] = this.getFilterValueFromFilterDisplayText(element.innerHTML);
      this.mutuallyExclusiveItemSet = true;
      element.classList.add('active');
    }
  }

  private getFilterValueFromFilterDisplayText(name : string) : string {
    let found : boolean = false;
    let value : string;
    for (let i = 0; i < this.filterList.length && !found; i++) {
      // if (this.filterList[i].displayText === name) {
      if (name.indexOf(this.filterList[i].displayText) > -1) {
        found = true;
        value = this.filterList[i].value;
      }
    }
    return value;
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (typeof simpleChanges['filterListItems']['currentValue'][0] === 'string') {
      simpleChanges['filterListItems']['currentValue'].forEach((filterName : string) => {
          this.filterList.push({
            value: filterName,
            displayText: filterName
          });
      });
    } else if (simpleChanges['filterListItems']['currentValue'][0].hasOwnProperty('value')) {
      simpleChanges['filterListItems']['currentValue'].forEach((filterItem : FilterListItem) => {
          this.filterList.push({
            value: filterItem.value,
            displayText: filterItem.displayText || filterItem.value
          });
      });
    }
    if (typeof simpleChanges['selectAll'] === 'undefined') {
      return;
    }
    if (typeof simpleChanges['selectAll']['currentValue'] === 'boolean') {
      this.selectAllFilterListItem = {
        value: '',
        displayText: 'Select All'
      };
    } else if (typeof simpleChanges['selectAll']['currentValue'] === 'string') {
      this.selectAllFilterListItem = {
        value: simpleChanges['selectAll']['currentValue'],
        displayText: simpleChanges['selectAll']['currentValue']
      }
    } else if (simpleChanges['selectAll']['currentValue'].hasOwnProperty('value')) {
      this.selectAllFilterListItem = {
        value: simpleChanges['selectAll']['currentValue'].value,
        displayText: simpleChanges['selectAll']['currentValue'].displayText || simpleChanges['selectAll']['currentValue'].value
      }
    }
    this.selectAllEnabled = true;
  }

}
