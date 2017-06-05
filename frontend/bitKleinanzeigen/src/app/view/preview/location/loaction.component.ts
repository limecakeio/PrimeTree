import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';

@Component({
  selector: 'view-preview-location',
  templateUrl: './location.component.html',
  styleUrls: [ './location.component.css' ]
})
export class LocationPreviewViewComponent {

  public model : {
    location : string;
  };

  public isDataAvailable : boolean = false;

  constructor(
    private previewService : PreviewService,
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
    });
  }

}
