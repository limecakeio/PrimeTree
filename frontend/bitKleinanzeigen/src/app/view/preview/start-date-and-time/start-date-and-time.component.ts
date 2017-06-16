import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';

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
    private previewService : PreviewService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isModelAvailable = true;
      this.model = model;
    });
  }

  getLocalizedTime(unixtime : number) : string {
    let localTime : string = 'am ';
    let date : Date = new Date(unixtime);
    localTime += date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
    return localTime;
  }

}
