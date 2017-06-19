import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';

import { DateService } from '../../../shared/date.service';

@Component({
  selector: 'view-preview-start-date-and-time',
  templateUrl: './start-date-and-time.component.html',
  styleUrls: [ './start-date-and-time.component.css' ]
})
export class StartDateAndTimePreviewViewComponent {

  public model : {
    title : string,
    id : number
  };

  public isModelAvailable : boolean = false;

  constructor(
    private previewService : PreviewService,
    private dateService : DateService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isModelAvailable = true;
      this.model = model;
    });
  }

  getLocalizedTime(unixTime : number) : string {
    let time : string = 'Am ';
    time += this.dateService.fullDateFromUnixTime(unixTime, ' um ');
    return time;
  }

}
