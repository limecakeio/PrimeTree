import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-location-from',
  templateUrl: './location-from.component.html',
  styleUrls: [ './location-from.component.css' ]
})
export class LocationFromViewComponent {

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
