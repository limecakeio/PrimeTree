import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

import { Condition } from '../../../model/listings/listing/condition.model';

interface ConditionOption {
  displayText : string;
  value : string;
}

@Component({
  selector: 'view-detail-condition',
  templateUrl: './condition.component.html',
  styleUrls: [ './condition.component.css' ]
})
export class ConditionViewComponent {

  private conditionOptions : ConditionOption[] = [
    {
      displayText: 'Neu',
      value: Condition.New
    }, {
      displayText: 'Gebraucht',
      value: Condition.Used
    }
  ];

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.isDataAvailable = true;
    });
  }

  public getConditionDisplayTextFromCategory(condition : Condition) : string {
    this.conditionOptions.forEach((conditionOption : ConditionOption) => {
      if (conditionOption.value === condition) {
        return conditionOption.displayText;
      }
    })
    return null;
  }


}
