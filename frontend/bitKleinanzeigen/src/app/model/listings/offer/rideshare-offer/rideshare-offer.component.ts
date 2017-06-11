import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { ListingComponent } from '../../listing/detail/listing.component';

import { RideShareOffer } from './rideshare-offer.model';

@Component({
  selector: 'listing-detail-view-service-offer',
  templateUrl: './rideshare-offer.component.html',
  styleUrls: [ './rideshare-offer.component.css' ]
})
export class RideShareOfferComponent extends ListingComponent {

  @Input() listing : RideShareOffer;


}
