import { Component } from '@angular/core';
import { ListingReposetory } from './listing.reposetory';
import { Listing } from './listing.model';

@Component({
  selector: 'listings',
  templateUrl: 'listing.component.html'
})
export class ListingComponent {

  listings : Listing[];
  constructor(private repo : ListingReposetory) {
    this.listings = this.repo.listings;
  }

  getListings() : Listing[] {
    return this.repo.listings;
  }
}
