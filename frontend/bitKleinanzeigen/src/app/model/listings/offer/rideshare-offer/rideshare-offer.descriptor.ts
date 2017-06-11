import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { ListingComponent } from '../../listing/detail/listing.component';

import { RideShareOfferCreateFormComponent } from './rideshare-offer-create-form.component';
import { RideShareOfferComponent } from './rideshare-offer.component';
import { RideShareOfferPreviewComponent } from './rideshare-offer-preview.component';
import { RideShareOfferFactory } from './rideshare-offer.factory';

export class RideShareOfferDescriptor extends ListingDescriptor {

  public listingPreviewComponentType() : Type<ListingPreviewComponent> {
    return RideShareOfferPreviewComponent;
  }

  public listingType() : string {
    return 'RideShareOffer';
  }

  public listingCreateForm() : Type<ListingCreateFormComponent> {
    return RideShareOfferCreateFormComponent;
  }

  public listingFactory() : RideShareOfferFactory {
    return new RideShareOfferFactory('SaleOffer');
  }

  public getListingComponentTypeClassName() : Type<ListingComponent> {
    return RideShareOfferComponent;
  }

}
