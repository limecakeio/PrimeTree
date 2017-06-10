import { Component } from '@angular/core';

import { ListingSearchService } from './search.service';
import { Listing } from '../listing.model';
import { ListingList } from '../listing.list';

@Component({
  selector: 'listing-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class ListingSearchComponent {


  constructor(
    public listingSearchService : ListingSearchService,
  ) {

  }

}
