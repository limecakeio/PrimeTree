import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';

@Component({
  selector: 'view-preview-price',
  templateUrl: './price.component.html',
  styleUrls: [ './price.component.css' ]
})
export class PricePreviewViewComponent {

  public model : {
    price : number
  };

  public isDataAvailable : boolean = false;

  constructor(
    private previewService : PreviewService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
    });
  }

}
