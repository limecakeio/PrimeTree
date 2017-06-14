import {
  Component,
  Input,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { RideShareOffer } from './rideshare-offer.model';

import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { PreviewService } from '../../../../view/preview/preview.service';

@Component({
  selector: 'rideshare-offer-preview',
  templateUrl: './rideshare-offer-preview.component.html',
  // styleUrls: [ '../../../listing/preview/listing-preview.component.css'], // JIT
  styleUrls: [ '../../listing/preview/listing-preview.component.css'], // AOT
  providers: [
    PreviewService
  ]
})
export class RideShareOfferPreviewComponent extends ListingPreviewComponent implements OnInit {

  @Input() listing : RideShareOffer;

  constructor(
    public previewService : PreviewService
  ) {
    super(previewService);
  }

  ngOnInit() {

  }
}
