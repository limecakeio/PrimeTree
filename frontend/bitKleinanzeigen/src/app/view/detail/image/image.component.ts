import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';
import { NetworkService } from '../../../network/network.service';

@Component({
  selector: 'view-detail-image',
  templateUrl: './image.component.html',
  styleUrls: [ './image.component.css' ]
})
export class ImageDetailViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService,
    private networkService : NetworkService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      if (this.model.mainImage && this.model.mainImage.indexOf(this.networkService.getServerAddress()) === -1) {
        this.model.mainImage = this.networkService.getServerAddress() + this.model.mainImage;
        this.isDataAvailable = true;
      }
    });
  }


}
