import { Component, Input, OnInit } from '@angular/core';

import { DetailViewService } from '../detail.service';

export interface DateAndTimeProperty {
  name : string,
  displayText : string;
}

import { DateService } from '../../../shared/date.service';

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

  public isPropertyAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService,
    public dateService : DateService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.isDataAvailable = true;
    });
  }

  public ngOnInit() : void {
    if (this.dateAndTimeProperty) {
      this.dateAndTimePropertyDisplayText = this.dateAndTimeProperty.displayText;
      this.dateAndTimePropertyName = this.dateAndTimeProperty.name;
      this.isInputAvailable = true;
      console.log(this.dateAndTimeProperty, this.model)
      if (this.model[this.dateAndTimePropertyName]) {
        this.isPropertyAvailable = true;
      }
    }
  }

  /**Converts the unix time stamp located in the model property to an formatted date and time string.*/
  public getDateAndTimeStringFromProperty(property : string) : string {
    return this.dateService.fullDateFromUnixTime(this.model[property], ' um ');
  }

}
