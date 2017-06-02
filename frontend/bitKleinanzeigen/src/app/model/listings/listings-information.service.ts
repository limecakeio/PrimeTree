import { Injectable } from '@angular/core';

import { ListingDescriptorHandler } from './listing/listing-descriptor.handler';
import { ListingDescriptor } from './listing/listing.descriptor';

import { SaleOfferDescriptor } from './offer/sale-offer/sale-offer.descriptor';
import { ServiceOfferDescriptor } from './offer/service-offer/service-offer.descriptor';

@Injectable()
export class ListingInformationService {

  public listingDescriptorHandler : ListingDescriptorHandler;

  constructor() {
    this.listingDescriptorHandler = new ListingDescriptorHandler();

    this.listingDescriptorHandler.addListingDescriptorTypeof(ListingDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(SaleOfferDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(ServiceOfferDescriptor);
  }

}
