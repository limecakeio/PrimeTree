import { Component, Input, OnInit } from '@angular/core';

import { PreviewService } from '../preview.service';

import { DateService } from '../../../shared/date.service';

export interface DateProperty {
  propertyName : string;
  displayText : string;
}

@Component({
  selector: 'view-preview-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.css' ]
})
export class DatePreviewViewComponent implements OnInit {

  @Input() dateProperty : DateProperty;

  public dateDisplayText : string;

  public dateDisplayPropertyName : string;

  public model : {
    title : string,
    id : number
  };

  public isModelAvailable : boolean = false;

  public isInputAvailable : boolean = false;

  constructor(
    private previewService : PreviewService,
    private dateService : DateService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.model = model;
      this.isModelAvailable = true;
    });
  }

  public ngOnInit() : void {
    if (this.dateProperty) {
      this.dateDisplayPropertyName = this.dateProperty.propertyName;
      this.dateDisplayText = this.dateProperty.displayText;
      if (this.model[this.dateDisplayPropertyName]) {
        this.isInputAvailable = true;
      }
    }
  }

  public getTimeStringFromModelProperty(propertyName : string) : string {
    return this.dateService.dateFromUnixTime(this.model[propertyName]);
  }

}
