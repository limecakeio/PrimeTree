import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { BorrowRequestFormComponent } from './borrow-request-form.component';
import { BorrowRequestPreviewComponent } from './borrow-request-preview.component';
import { BorrowRequestComponent } from './borrow-request.component';
import { BorrowRequestFactory } from './borrow-request.factory';
import { BorrowRequest } from './borrow-request.model';

export class BorrowRequestDescriptor extends ListingDescriptor {

  public getListing() : BorrowRequest {
    return new BorrowRequest();
  }

  public getListingPreviewComponentTypeClassName() : Type<BorrowRequestPreviewComponent> {
    return BorrowRequestPreviewComponent;
  }

  public getListingFormComponentTypeClassName() : Type<BorrowRequestFormComponent> {
    return BorrowRequestFormComponent;
  }

  public getListingType() : string {
    return 'BorrowRequest';
  }


  public getListingFactory() : BorrowRequestFactory {
    return new BorrowRequestFactory('BorrowRequest');
  }

  public getListingComponentTypeClassName() : Type<BorrowRequestComponent> {
    return BorrowRequestComponent;
  }

}

export { BorrowRequestPreviewComponent, BorrowRequestComponent, BorrowRequestFormComponent }
