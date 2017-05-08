import { Injectable } from '@angular/core';
import { Listing } from './listing.model';
import { SellItem } from './sellitem/sellitem.model'
import { ListingController } from './network/listing.controller';

@Injectable()
export class ListingReposetory {
  listings : Listing[] = [];

  addListing(listing : Listing) : void {
    this.listings.push(listing);
  }

  constructor(private controller : ListingController) {
    this.update();
  }

  removeListing(id : number) : boolean {
    let isRemoved : boolean = false;
    for (let i = 0; i < this.listings.length && !isRemoved; i++) {
        if (this.listings[i].id === id) {
          this.listings.splice(i, 1);
          isRemoved = true;
          this.controller.removeListing(id).subscribe(res => {
            console.log('listing removed');
            console.log(res);
            console.log('listing removed');
          })
        }
    }
    return isRemoved;
  }

  update() : void {
    this.listings = [];
    this.controller.getAll().subscribe(res => {
      let caster : any = res.json();
      caster.forEach((id : number) => {
          this.controller.getListing(id).subscribe(res => {
            let casterios : any = res.json();
            console.log('casterios');
            console.log(res);
            console.log('casterios');
            let listing : SellItem = new SellItem();
            listing.title = casterios.title;
            listing.description = casterios.description;
            listing.id = id;
            listing.price = listing.price;
            this.listings.push(casterios);
          });
      });
      console.log('getall');
      console.log(res);
      console.log('getall');
    });
  }

}
