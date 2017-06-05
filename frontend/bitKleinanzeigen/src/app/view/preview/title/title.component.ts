import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';

@Component({
  selector: 'view-preview-title',
  templateUrl: './title.component.html',
  styleUrls: [ './title.component.css' ]
})
export class TitlePreviewViewComponent {

  public model : {
    title : string,
    id : number
  };

  public isDataAvailable : boolean = false;

  constructor(
    private previewService : PreviewService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      console.log(model, 'previewService.model')
      this.isDataAvailable = true;
      this.model = model;
    }, (error : Error) => {
      console.error(error, 'title, model');
    });
  }

}
