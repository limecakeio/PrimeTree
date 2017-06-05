import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { ListingComponent } from '../../listing/detail/listing.component';

import { SaleOfferPreviewComponent } from './sale-offer-preview.component';
import { SaleOfferCreateFormComponent } from './sale-offer-create-form.component';
import { SaleOfferFactory } from './sale-offer.factory';
import { SaleOfferComponent } from './sale-offer.component';

export class SaleOfferDescriptor extends ListingDescriptor {

  public listingPreviewComponentType() : Type<ListingPreviewComponent> {
    return SaleOfferPreviewComponent;
  }

  public listingType() : string {
    return 'SaleOffer';
  }

  public listingCreateForm() : Type<ListingCreateFormComponent> {
    return SaleOfferCreateFormComponent;
  }

  public listingFactory() : SaleOfferFactory {
    return new SaleOfferFactory('SaleOffer');
  }

  public getListingComponentTypeClassName() : Type<ListingComponent> {
    return SaleOfferComponent;
  }

}

export { SaleOfferPreviewComponent, SaleOfferCreateFormComponent, SaleOfferComponent }
