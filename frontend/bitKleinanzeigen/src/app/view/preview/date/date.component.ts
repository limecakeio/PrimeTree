import { Component, Input, OnInit } from '@angular/core';

import { PreviewService } from '../preview.service';

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
    private previewService : PreviewService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isModelAvailable = true;
      this.model = model;
    });
  }

  getLocalizedTime(property : string) : string {
    let localTime : string = 'am ';
    let date : Date = new Date(this.model[property]);
    localTime += date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() + ' um ' + date.getHours() + ':' + date.getMinutes();
    return localTime;
  }

  public ngOnInit() : void {
    if (this.dateProperty) {
      this.dateDisplayPropertyName = this.dateProperty.propertyName;
      this.dateDisplayText = this.dateProperty.displayText;
      this.isInputAvailable = true;
    }
  }

}
