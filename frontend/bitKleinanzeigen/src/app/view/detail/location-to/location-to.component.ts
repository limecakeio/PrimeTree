import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-location-to',
  templateUrl: './location-to.component.html',
  styleUrls: [ './location-to.component.css' ]
})
export class LocationToViewComponent {

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
