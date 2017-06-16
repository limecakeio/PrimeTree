import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { RecreationRequestFormComponent } from './recreation-request-form.component';
import { RecreationRequestPreviewComponent } from './recreation-request-preview.component';
import { RecreationRequestComponent } from './recreation-request.component';
import { RecreationRequestFactory } from './recreation-request.factory';
import { RecreationRequest } from './recreation-request.model';

export class RecreationRequestDescriptor extends ListingDescriptor {

  public getListing() : RecreationRequest {
    return new RecreationRequest();
  }

  public getListingPreviewComponentTypeClassName() : Type<RecreationRequestPreviewComponent> {
    return RecreationRequestPreviewComponent;
  }

  public getListingFormComponentTypeClassName() : Type<RecreationRequestFormComponent> {
    return RecreationRequestFormComponent;
  }

  public getListingType() : string {
    return 'RecreationRequest';
  }

  public getListingFactory() : RecreationRequestFactory {
    return new RecreationRequestFactory('RecreationRequest');
  }

  public getListingComponentTypeClassName() : Type<RecreationRequestComponent> {
    return RecreationRequestComponent;
  }

}

export { RecreationRequestPreviewComponent, RecreationRequestFormComponent, RecreationRequestComponent }
