import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ServiceOffer } from './service-offer.model';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { ListingPreviewComponent } from '../../listing/listing-preview.component';

@Component({
  selector: 'service-offer-preview',
  templateUrl: './service-offer-preview.component.html',
  styleUrls: [ './service-offer-preview.component.css' ]
})
export class ServiceOfferPreviewComponent extends ListingPreviewComponent implements OnInit {

  @Input() listing : ServiceOffer;

  isOwner : boolean = false;

  image : SafeStyle;

  imagesrc : SafeUrl = '';

  constructor(
    private domSanitizer : DomSanitizer
  ) {
    super();
  }

  ngOnInit() {
    if (this.listing.mainImage) {
      this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
    }
  }
}
