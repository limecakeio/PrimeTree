import {
  Component,
  Input,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { ServiceOffer } from './service-offer.model';

import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { PreviewService } from '../../../../view/preview/preview.service';

@Component({
  selector: 'service-offer-preview',
  templateUrl: './service-offer-preview.component.html',
  styleUrls: [ './service-offer-preview.component.css' ],
  providers: [
    PreviewService
  ]
})
export class ServiceOfferPreviewComponent extends ListingPreviewComponent implements OnInit {

  @Input() listing : ServiceOffer;

  isOwner : boolean = false;

  image : SafeStyle;

  imagesrc : SafeUrl = '';

  constructor(
    private domSanitizer : DomSanitizer,
    public previewService : PreviewService
  ) {
    super(previewService);
  }

  ngOnInit() {
    if (this.listing.mainImage) {
      this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
    }
  }
}
