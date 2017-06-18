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

  getLocalizedTime(unixTime : number) : string {
    let time : string = 'Am ';
    let date : Date = new Date(unixTime);
    let dateOfMonth : number = date.getDate();
    let month : number = date.getMonth();
    let year : number = date.getFullYear();
    let hours : number = date.getHours();
    let minutes : number = date.getMinutes();
    let seconds : number = date.getSeconds();

    time += this.prefixTime(dateOfMonth) + '.' + this.prefixTime(month) + '.' + year;

    if (hours > 0 || minutes > 0 || seconds > 0) {
      time += ' um ' + this.prefixTime(hours) + ':' + this.prefixTime(minutes);
      if (seconds > 0) {
        time += ':' + this.prefixTime(seconds);
      }
    }

    return time;
  }

  private prefixTime(time : number) : string {
    return (time < 10) ? '0' + time : '' + time;
  }

}
