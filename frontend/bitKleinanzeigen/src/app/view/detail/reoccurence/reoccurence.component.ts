import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

import { Reoccurence } from '../../../model/listings/request/recreation-request/reoccurence.model';

interface ReoccurenceOption {
  displayText : string;
  value : string;
}

@Component({
  selector: 'view-detail-reoccurence',
  templateUrl: './reoccurence.component.html',
  styleUrls: [ './reoccurence.component.css' ]
})
export class ReoccurenceViewComponent {

  private reoccurenceOptions : ReoccurenceOption[] = [
    {
      displayText: 'Einmalig',
      value: Reoccurence.OneOf
    }, {
      displayText: 'Täglich',
      value: Reoccurence.Daily
    }, {
      displayText: 'Wöchentlich',
      value: Reoccurence.Weekly
    }, {
      displayText: 'Zweitwöchentlich',
      value: Reoccurence.Fortnightly
    }, {
      displayText: 'Monatlich',
      value: Reoccurence.Monthly
    }, {
      displayText: 'Verschieden',
      value: Reoccurence.Randomly
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

  public getReoccurenceDisplayTextFromCategory(reoccurence : Reoccurence) : string {
    this.reoccurenceOptions.forEach((reoccurenceOption : ReoccurenceOption) => {
      if (reoccurenceOption.value === reoccurence) {
        return reoccurenceOption.displayText;
      }
    })
    return null;
  }


}
