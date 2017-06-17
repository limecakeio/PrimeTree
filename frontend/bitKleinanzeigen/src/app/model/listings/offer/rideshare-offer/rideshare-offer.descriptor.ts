import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { RideShareOfferComponent } from './rideshare-offer.component';
import { RideShareOfferPreviewComponent } from './rideshare-offer-preview.component';
import { RideShareOfferFactory } from './rideshare-offer.factory';
import { RideShareOffer } from './rideshare-offer.model';
import { RideshareOfferFormComponent } from './rideshare-offer-form.component';

export class RideShareOfferDescriptor extends ListingDescriptor {

  public getListing() : RideShareOffer {
    return new RideShareOffer();
  }

  public getListingPreviewComponentTypeClassName() : Type<ListingPreviewComponent> {
    return RideShareOfferPreviewComponent;
  }

  public getListingFormComponentTypeClassName() : Type<ListingFormComponent> {
    return RideshareOfferFormComponent;
  }

  public getListingType() : string {
    return 'RideShareOffer';
  }

  public getListingFactory() : RideShareOfferFactory {
    return new RideShareOfferFactory('SaleOffer');
  }

  public getListingComponentTypeClassName() : Type<ListingComponent> {
    return RideShareOfferComponent;
  }

}

export { RideShareOfferPreviewComponent, RideShareOfferComponent,  RideShareOfferCreateFormComponent, RideshareOfferFormComponent}
