import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { ServiceOfferPreviewComponent } from './service-offer-preview.component';
import { ServiceOfferFactory } from './service-offer.factory';
import { ServiceOfferComponent } from './service-offer.component';
import { ServiceOffer } from './service-offer.model';
import { ServiceOfferFormComponent } from './service-offer-form.component';


export class ServiceOfferDescriptor extends ListingDescriptor {

  public getListing() : ServiceOffer {
    return new ServiceOffer();
  }

  public getListingFormComponentTypeClassName() : Type<ServiceOfferFormComponent> {
    return ServiceOfferFormComponent;
  }

  public getListingPreviewComponentTypeClassName() : Type<ListingPreviewComponent> {
    return ServiceOfferPreviewComponent;
  }

  public getListingType() : string {
    return 'ServiceOffer';
  }

  public getListingFactory() : ServiceOfferFactory {
    return new ServiceOfferFactory('ServiceOffer');
  }

  public getListingComponentTypeClassName() : Type<ListingComponent> {
    return ServiceOfferComponent;
  }

}

export { ServiceOfferPreviewComponent, ServiceOfferComponent, ServiceOfferFormComponent }
