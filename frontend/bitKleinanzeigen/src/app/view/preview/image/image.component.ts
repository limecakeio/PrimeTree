import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { PreviewService } from '../preview.service';

import { NetworkService } from '../../../network/network.service';

@Component({
  selector: 'view-preview-image',
  templateUrl: './image.component.html',
  styleUrls: [ './image.component.css' ]
})
export class ImagePreviewViewComponent {

  public model : {
    mainImage : string;
  };

  public imagesrc : SafeUrl = '';

  public isDataAvailable : boolean = false;

  constructor(
    private previewService : PreviewService,
    private domSanitizer : DomSanitizer,
    private networkService : NetworkService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      //If we have an image set it
      if (this.model.mainImage) {
        if (this.model.mainImage.indexOf(this.networkService.getServerAddress()) === -1) {
          this.model.mainImage = this.networkService.getServerAddress() + this.model.mainImage;
        }
        this.imagesrc = this.domSanitizer.bypassSecurityTrustStyle('url(' + this.model.mainImage + ')');
      }
    });
  }

}
