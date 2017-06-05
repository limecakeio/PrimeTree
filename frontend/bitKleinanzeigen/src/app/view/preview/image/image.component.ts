import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { PreviewService } from '../preview.service';

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
    private domSanitizer : DomSanitizer
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      if (this.model.mainImage) {
        this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.model.mainImage);
      }
    });
  }

}
