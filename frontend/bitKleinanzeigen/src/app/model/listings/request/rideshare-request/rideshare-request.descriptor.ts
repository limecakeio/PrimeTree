import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { RideShareRequestComponent } from './rideshare-request.component';
import { RideShareRequestPreviewComponent } from './rideshare-request-preview.component';
import { RideshareRequestFormComponent } from './rideshare-request-form.component';
import { RideShareRequestFactory } from './rideshare-request.factory';
import { RideShareRequest } from './rideshare-request.model';

export class RideShareRequestDescriptor extends ListingDescriptor {

  public getListing() : RideShareRequest {
    return new RideShareRequest();
  }

  public getListingPreviewComponentTypeClassName() : Type<RideShareRequestPreviewComponent> {
    return RideShareRequestPreviewComponent;
  }

  public getListingFormComponentTypeClassName() : Type<RideshareRequestFormComponent> {
    return RideshareRequestFormComponent;
  }

  public getListingType() : string {
    return 'RideShareRequest';
  }

  public getListingFactory() : RideShareRequestFactory {
    return new RideShareRequestFactory('RideShareRequest');
  }

  public getListingComponentTypeClassName() : Type<RideShareRequestComponent> {
    return RideShareRequestComponent;
  }

}

export { RideShareRequestPreviewComponent, RideShareRequestComponent,  RideshareRequestFormComponent }
