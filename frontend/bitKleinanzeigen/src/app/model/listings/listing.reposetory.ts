import { Injectable } from '@angular/core';
import { Listing } from './listing.model';
import { SellItem } from './sellitem/sellitem.model'
import { ListingController } from './network/listing.controller';
import { ListingRequest } from './network/listing.request';

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
          this.controller.removeListing(id).subscribe((response : boolean) => {
            console.log('DEL: ' + id + ' ' + response);
          })
        }
    }
    return isRemoved;
  }

  update() : void {
    this.listings = [];
    this.controller.getActiveListings(new ListingRequest()).subscribe((ids : number[]) => {
      ids.forEach((id : number) => {
          this.controller.getListing(id).subscribe((listing : Listing) => {
            this.listings.push(listing);
          });
      });
    }, (error : any) => {
      // console.log('getall - error')
      // console.log(error);
    }, () => {
      // console.log('getall - complete')
    });
  }

}
