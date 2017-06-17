import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { SaleOfferPreviewComponent } from './sale-offer-preview.component';
import { SaleOfferFactory } from './sale-offer.factory';
import { SaleOfferComponent } from './sale-offer.component';
import { SaleOffer } from './sale-offer.model';
import { SaleOfferFormComponent } from './sale-offer-form.component';

export class SaleOfferDescriptor extends ListingDescriptor {

  public getListing() : SaleOffer {
    return new SaleOffer();
  }

  public getListingPreviewComponentTypeClassName() : Type<SaleOfferPreviewComponent> {
    return SaleOfferPreviewComponent;
  }

  public getListingFormComponentTypeClassName() : Type<SaleOfferFormComponent> {
    return SaleOfferFormComponent;
  }

  public getListingType() : string {
    return 'SaleOffer';
  }

  public getListingFactory() : SaleOfferFactory {
    return new SaleOfferFactory('SaleOffer');
  }

  public getListingComponentTypeClassName() : Type<SaleOfferComponent> {
    return SaleOfferComponent;
  }

}

export { SaleOfferPreviewComponent, SaleOfferComponent, SaleOfferFormComponent }
