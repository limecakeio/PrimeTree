import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/listing-preview.component';
import { ListingCreateFormComponent } from '../../listing/listing-create-form.component';

import { ServiceOfferPreviewComponent } from './service-offer-preview.component';
import { ServiceOfferCreateFormComponent } from './service-offer-create-form.component';
import { ServiceOfferFactory } from './service-offer.factory';

export class ServiceOfferDescriptor extends ListingDescriptor {

  public listingPreviewComponentType() : Type<ListingPreviewComponent> {
    return ServiceOfferPreviewComponent;
  }

  public listingType() : string {
    return 'ServiceOffer';
  }

  public listingCreateForm() : Type<ListingCreateFormComponent> {
    return ServiceOfferCreateFormComponent;
  }

  public listingFactory() : ServiceOfferFactory {
    return new ServiceOfferFactory('ServiceOffer');
  }

}

export { ServiceOfferPreviewComponent, ServiceOfferCreateFormComponent }
