import { Component, Input } from '@angular/core';
import { SellItem } from './sellitem.model';
import { ListingController } from '../network/listing.controller';
import { ListingReposetory } from '../listing.reposetory';

@Component({
  selector: 'sellitem',
  templateUrl: 'sellitem.component.html'
})
export class SellItemComponent {

  @Input() listing : SellItem;

  constructor(private listingController : ListingController, private repo : ListingReposetory) {

  }

  remove() : void {
   this.repo.removeListing(this.listing.id);
  // this.repo.update();
  }

}
