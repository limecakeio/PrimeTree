import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-travel-date-and-time',
  templateUrl: './travel-date-and-time.component.html',
  styleUrls: [ './travel-date-and-time.component.css' ]
})
export class TravelDateAndTimeViewComponent {

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

  getLocalizedTime(unixtime : number) : string {
    let localTime : string = 'Am ';
    let date : Date = new Date(unixtime);
    localTime += date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
    return localTime;
  }


}
