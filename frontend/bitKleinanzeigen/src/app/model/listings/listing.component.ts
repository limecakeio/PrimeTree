import { Component } from '@angular/core';
import { ListingReposetory } from './listing.reposetory';
import { Listing } from './listing.model';

@Component({
  selector: 'listings',
<<<<<<< HEAD
  templateUrl: './listing.component.html'
=======
  templateUrl: 'listing.component.html'
>>>>>>> a0cfd9909733ece4b2bb3755c28934ced8d430ec
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
