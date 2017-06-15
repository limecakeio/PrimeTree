import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-journey-stops',
  templateUrl: './journey-stops.component.html',
  styleUrls: [ './journey-stops.component.css' ]
})
export class JourneyStopsViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      console.log(model.journeyStops)
      this.isDataAvailable = true;
    });
  }


}
