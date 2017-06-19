import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

import { DateService } from '../../../shared/date.service';

@Component({
  selector: 'view-detail-travel-date-and-time',
  templateUrl: './travel-date-and-time.component.html',
  styleUrls: [ './travel-date-and-time.component.css' ]
})
export class TravelDateAndTimeViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService,
    public dateService : DateService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      if (this.model.travelDateAndTime) {
        this.isDataAvailable = true;
      }
    });
  }

}
