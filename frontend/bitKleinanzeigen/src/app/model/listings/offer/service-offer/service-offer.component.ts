import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { ServiceOffer } from './service-offer.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

@Component({
  selector: 'listing-detail-view-service-offer',
  templateUrl: './service-offer.component.html',
  styleUrls: [ '../../../listing/detail/listing-detail-view.component.css' ], // JIT
  // styleUrls: [ '../../listing/detail/listing-detail-view.component.css' ], // AOT
  providers: [
    DetailViewService
  ]
})

export class ServiceOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : ServiceOffer;
  isOwner : boolean = false;
  listingIcon : string = "listing-service";
  //TODO Insert a callToAction String to be used throughout the listings like the listingIcon
  image : SafeStyle;

  constructor(
    private detailViewService : DetailViewService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
  }
}
