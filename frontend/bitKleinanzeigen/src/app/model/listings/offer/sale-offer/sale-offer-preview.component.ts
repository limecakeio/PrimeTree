import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { SaleOffer } from './sale-offer.model';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ListingPreviewComponent } from '../../listing/listing-preview.component';

@Component({
  selector: 'saleoffer-preview',
  templateUrl: './sale-offer-preview.component.html',
  styleUrls: [ './sale-offer-preview.component.css' ]
})
export class SaleOfferPreviewComponent extends ListingPreviewComponent implements OnInit {

  @Input() listing : SaleOffer;

  isOwner : boolean = false;

  image : SafeStyle;

  imagesrc : SafeUrl = '';

  constructor(
    private domSanitizer : DomSanitizer,
    private router : Router
  ) {
    super();
  }

  ngOnInit() {
    console.log(this.listing, 'sale offer')
    if (this.listing.mainImage) {
      this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
    }
  }
}
