import { Component, Input, OnInit } from '@angular/core';

import { DetailViewService } from '../detail.service';

import { DateService } from '../../../shared/date.service';

export interface BorrowDate {
  propertyName : string;
  displayText : string;
  displayIcon : string;
}

@Component({
  selector: 'view-detail-borrow-date',
  templateUrl: './borrow-date.component.html',
  styleUrls: [ './borrow-date.component.css' ]
})
export class BorrowDateViewComponent implements OnInit {

  @Input() borrowDate : BorrowDate;

  public borrowDatePropertyName : string;

  public borrowDateDisplayText : string;

  public borrowIconName : string;

  public isInputAvailable : boolean = false;

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService,
    private dateService : DateService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.isDataAvailable = true;
    });
  }

  public ngOnInit() : void {
    if (this.borrowDate) {
      this.borrowDateDisplayText = this.borrowDate.displayText;
      this.borrowDatePropertyName = this.borrowDate.propertyName;
      this.borrowIconName = this.borrowDate.displayIcon;
      this.isInputAvailable = true;
    }
  }

  /**Returns a proper formatted time string which are equal to the unix time stamp */
  getLocalizedTime(property : string) : string {
    return this.dateService.dateFromUnixTime(this.model[property]);
  }

}
