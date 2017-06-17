import { Type } from '@angular/core';

import { ListingDescriptor } from '../../listing/listing.descriptor';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { ListingComponent } from '../../listing/detail/listing.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { ServiceRequestComponent } from './service-request.component';
import { ServiceRequestPreviewComponent } from './service-request-preview.component';
import { ServiceRequestFormComponent } from './service-request-form.component';
import { ServiceRequest } from './service-request.model';
import { ServiceRequestFactory } from './service-request.factory';


export class ServiceRequestDescriptor extends ListingDescriptor {

  public getListing() : ServiceRequest {
    return new ServiceRequest();
  }

  public getListingFormComponentTypeClassName() : Type<ServiceRequestFormComponent> {
    return ServiceRequestFormComponent;
  }

  public getListingPreviewComponentTypeClassName() : Type<ServiceRequestPreviewComponent> {
    return ServiceRequestPreviewComponent;
  }

  public getListingType() : string {
    return 'ServiceRequest';
  }

  public getListingFactory() : ServiceRequestFactory {
    return new ServiceRequestFactory('ServiceRequest');
  }

  public getListingComponentTypeClassName() : Type<ServiceRequestComponent> {
    return ServiceRequestComponent;
  }

}

export { ServiceRequestPreviewComponent, ServiceRequestComponent, ServiceRequestFormComponent }
