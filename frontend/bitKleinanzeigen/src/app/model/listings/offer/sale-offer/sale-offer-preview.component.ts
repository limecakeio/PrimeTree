import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle,
  SafeUrl
} from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SaleOffer } from './sale-offer.model';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { PreviewService } from '../../../../view/preview/preview.service';

@Component({
  selector: 'sale-offer-preview',
  templateUrl: './sale-offer-preview.component.html',
  // styleUrls: [ '../../../listing/preview/listing-preview.component.css' ], // JIT
  styleUrls: [ '../../listing/preview/listing-preview.component.css' ], // AOT
  providers: [
    PreviewService
  ]
})
export class SaleOfferPreviewComponent extends ListingPreviewComponent implements OnChanges, OnInit {

  @Input() listing : SaleOffer = null;

  isOwner : boolean = false;

  image : SafeStyle;

  imagesrc : SafeUrl = '';

  constructor(
    private domSanitizer : DomSanitizer,
    private router : Router,
    public previewService : PreviewService
  ) {
    super(previewService);
  }

  ngOnInit() : void {
    console.log('ngOnInit', 'SaleOfferPreviewComponent', this.listing)
  //   if (this.listing.mainImage) {
  //     this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
  //   }
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    console.log(this.listing, 'ngOnChanges')
    this.previewService.sendModelToObservers(this.listing);
  }
}
