import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

import { ListingComponent } from '../../listing/detail/listing.component';
import { ServiceOffer } from './service-offer.model';

@Component({
  selector: 'listing-detail-view-service-offer',
  templateUrl: './service-offer.component.html',
  styleUrls: [ './service-offer.component.css' ]
})
export class ServiceOfferComponent extends ListingComponent {

  @Input() listing : ServiceOffer;


}
