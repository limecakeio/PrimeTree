import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';

import { DateService } from '../../../shared/date.service';

@Component({
  selector: 'view-preview-travel-date-and-time',
  templateUrl: './travel-date-and-time.component.html',
  styleUrls: [ './travel-date-and-time.component.css' ]
})
export class TravelDateAndTimePreviewViewComponent {

  public model : {
    title : string,
    id : number,
    travelDateAndTime: number
  };

  public isModelAvailable : boolean = false;

  constructor(
    private previewService : PreviewService,
    private dateService : DateService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.model = model;
      if (this.model.travelDateAndTime) {
        this.isModelAvailable = true;
      }
    });
  }

  getLocalizedTime(unixTime : number) : string {
    let time : string = 'Am ';
    time += this.dateService.fullDateFromUnixTime(unixTime, ' um ')
    return time;
  }

}
