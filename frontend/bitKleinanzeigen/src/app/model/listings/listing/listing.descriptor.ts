import { Type } from '@angular/core';

import { ListingPreviewComponent } from './preview/listing-preview.component';
import { ListingCreateFormComponent } from './create/listing-create-form.component';
import { ListingFactory } from './listing.factory';
import { ListingComponent } from './detail/listing.component';

/**
 *
 */
export class ListingDescriptor {

  public listingPreviewComponentType() : Type<ListingPreviewComponent> {
    return ListingPreviewComponent;
  }

  public listingType() : string {
    return 'Listing';
  };

  public listingCreateForm() : Type<ListingCreateFormComponent> {
    return ListingCreateFormComponent;
  }

  public listingFactory() : ListingFactory {
    return new ListingFactory('Listing');
  }

  /**Returns the class name associated with a particular listing component*/
  public getListingComponentTypeClassName() : Type<ListingComponent> {
    return ListingComponent;
  }

}

export { ListingPreviewComponent, ListingCreateFormComponent, ListingComponent }