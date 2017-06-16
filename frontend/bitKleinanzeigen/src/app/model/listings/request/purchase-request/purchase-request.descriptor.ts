import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { PurchaseRequestFormComponent } from './purchase-request-form.component';
import { PurchaseRequestPreviewComponent } from './purchase-request-preview.component';
import { PurchaseRequestComponent } from './purchase-request.component';
import { PurchaseRequestFactory } from './purchase-request.factory';
import { PurchaseRequest } from './purchase-request.model';

export class PurchaseRequestDescriptor extends ListingDescriptor {

  public getListing() : PurchaseRequest {
    return new PurchaseRequest();
  }

  public getListingPreviewComponentTypeClassName() : Type<PurchaseRequestPreviewComponent> {
    return PurchaseRequestPreviewComponent;
  }

  public getListingFormComponentTypeClassName() : Type<PurchaseRequestFormComponent> {
    return PurchaseRequestFormComponent;
  }

  public getListingType() : string {
    return 'PurchaseRequest';
  }

  public getListingFactory() : PurchaseRequestFactory {
    return new PurchaseRequestFactory('PurchaseRequest');
  }

  public getListingComponentTypeClassName() : Type<PurchaseRequestComponent> {
    return PurchaseRequestComponent;
  }

}

export { PurchaseRequestPreviewComponent, PurchaseRequestFormComponent, PurchaseRequestComponent }
