import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-available-seats',
  templateUrl: './available-seats.component.html',
  styleUrls: [ './available-seats.component.css' ]
})
export class AvailableSeatsViewComponent {

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
