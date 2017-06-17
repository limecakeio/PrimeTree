import { Type } from '@angular/core';

import { ListingPreviewComponent } from './preview/listing-preview.component';
import { ListingFormComponent } from './form/listing-form.component';
import { ListingFactory } from './listing.factory';
import { ListingComponent } from './detail/listing.component';
import { Listing } from './listing.model';

/**
 *
 */
export class ListingDescriptor {

  /**Returns the class name associated with a particular listing preview component*/
  public getListingPreviewComponentTypeClassName() : Type<ListingPreviewComponent> {
    return ListingPreviewComponent;
  }

  /**Returns the listing type of which this listing descriptor belongs to */
  public getListingType() : string {
    return 'Listing';
  };

  public getListingFormComponentTypeClassName() : Type<ListingFormComponent> {
    return ListingFormComponent;
  }

  /**Returns an ListingFactory thaat converts a request body form a listing. */
  public getListingFactory() : ListingFactory {
    return new ListingFactory('Listing');
  }

  /**Returns the class name associated with a particular listing component*/
  public getListingComponentTypeClassName() : Type<ListingComponent> {
    return ListingComponent;
  }

  /**Returns a new instance from a listing.*/
  public getListing() : Listing {
    return new Listing();
  }

}

export { ListingPreviewComponent, ListingComponent, ListingFormComponent }
