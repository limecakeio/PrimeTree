import { Component, Type } from '@angular/core';

import { ListingSearchService } from './search.service';
import { ListingInformationService } from '../../listings-information.service'; // remove this
import { Listing } from '../listing.model';
import { ListingList } from '../listing.list';
import { ListingPreviewComponent } from '../preview/listing-preview.component'; // remove this

@Component({
  selector: 'listing-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class ListingSearchComponent {


  constructor(
    public listingSearchService : ListingSearchService,
    private listingInformationService : ListingInformationService // remove this
  ) {

  }

  /**Remove this method!!! */
  public getListingPreviewTypeFromListingType(listingType : string) : Type<ListingPreviewComponent> {
    return this.listingInformationService.listingDescriptorHandler.getListingPreviewComponentTypeFromListingType(listingType);
  }

  public updateListingCounter(event : any) : void {
    console.log(event);
  }

}
