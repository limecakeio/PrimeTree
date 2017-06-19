import { Component, Input, OnInit } from '@angular/core';

import { DetailViewService } from '../detail.service';

export interface DateAndTimeProperty {
  name : string,
  displayText : string;
}

@Component({
  selector: 'view-detail-date-and-time',
  templateUrl: './date-and-time.component.html',
  styleUrls: [ './date-and-time.component.css' ]
})
export class DateAndTimeViewComponent implements OnInit {

  @Input() dateAndTimeProperty : DateAndTimeProperty;

  public dateAndTimePropertyName : string;

  public dateAndTimePropertyDisplayText : string;

  public isDataAvailable : boolean = false;

  public isInputAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.isDataAvailable = true;
    });
  }

  public getLocalizedTime(property : string) : string {
    let localTime : string = '';
    let date : Date = new Date(this.model[property]);
    localTime += date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes() + " Uhr.";
    return localTime;
  }

  public ngOnInit() : void {
    if (this.dateAndTimeProperty) {
      this.dateAndTimePropertyDisplayText = this.dateAndTimeProperty.displayText;
      this.dateAndTimePropertyName = this.dateAndTimeProperty.name;
      console.log(this.dateAndTimePropertyDisplayText, this.dateAndTimePropertyName, this.model)
      if (this.model[this.dateAndTimePropertyName]) {
        this.isInputAvailable = true;
      }
    }
  }


}
