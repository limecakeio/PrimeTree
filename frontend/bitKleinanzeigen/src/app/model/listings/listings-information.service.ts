import { Injectable } from '@angular/core';

import { ListingDescriptorHandler } from './listing/listing-descriptor.handler';
import { ListingDescriptor } from './listing/listing.descriptor';

import { SaleOfferDescriptor } from './offer/sale-offer/sale-offer.descriptor';
import { ServiceOfferDescriptor } from './offer/service-offer/service-offer.descriptor';
import { RideShareOfferDescriptor } from './offer/rideshare-offer/rideshare-offer.descriptor';
import { BorrowRequestDescriptor } from './request/borrow-request/borrow-request.descriptor';
import { PurchaseRequestDescriptor } from './request/purchase-request/purchase-request.descriptor';
import { RideShareRequestDescriptor } from './request/rideshare-request/rideshare-request.descriptor';
import { RecreationRequestDescriptor } from './request/recreation-request/recreation-request.descriptor';
import { ServiceRequestDescriptor } from './request/service-request/service-request.descriptor';

/**This service shares the listing information over all componets which share this service. */
@Injectable()
export class ListingInformationService {

  public listingDescriptorHandler : ListingDescriptorHandler;

  constructor() {
    this.listingDescriptorHandler = new ListingDescriptorHandler();

    this.listingDescriptorHandler.addListingDescriptorTypeof(ListingDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(SaleOfferDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(ServiceOfferDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(RideShareOfferDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(BorrowRequestDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(PurchaseRequestDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(RideShareRequestDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(RecreationRequestDescriptor);
    this.listingDescriptorHandler.addListingDescriptorTypeof(ServiceRequestDescriptor);
  }

}
