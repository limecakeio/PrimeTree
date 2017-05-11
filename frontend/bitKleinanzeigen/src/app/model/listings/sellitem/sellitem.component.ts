import { Component, Input, OnInit } from '@angular/core';
import { SellItem } from './sellitem.model';
import { ListingController } from '../network/listing.controller';
import { ListingReposetory } from '../listing.reposetory';
import { SecurityModel } from '../../../security/security.model';

@Component({
  selector: 'sellitem',
  templateUrl: './sellitem.component.html'
})
export class SellItemComponent implements OnInit {

  @Input() listing : SellItem;

  isOwner : boolean = false;

  constructor(private listingController : ListingController,
    private repo : ListingReposetory,
    private securityModel : SecurityModel) {

  }

  remove() : void {
    this.repo.removeListing(this.listing.id);
  }

  ngOnInit() {
    if (this.listing.owner === this.securityModel.username) {
      this.isOwner = true;
    }
  }

}
