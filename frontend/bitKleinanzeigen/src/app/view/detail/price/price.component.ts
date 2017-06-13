import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-price',
  templateUrl: './price.component.html',
  styleUrls: [ './price.component.css' ]
})
export class PriceDetailViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.isDataAvailable = true;
    });
  }

}
