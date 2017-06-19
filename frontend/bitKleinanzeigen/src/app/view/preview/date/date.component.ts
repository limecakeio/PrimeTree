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
    let localTime : string = '';
    let date : Date = new Date(this.model[property]);
    localTime += this.prefixTime(date.getDate()) + '.' + this.prefixTime(date.getMonth()) + '.' + date.getFullYear();
    return localTime;
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

  private prefixTime(time : number) : string {
    return (time < 10) ? '0' + time : '' + time;
  }

}
