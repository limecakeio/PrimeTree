import { Injectable } from '@angular/core';
import { Listing } from './listing.model';
import { SellItem } from './sellitem/sellitem.model'
import { ListingController } from './network/listing.controller';
import { ListingRequest } from './network/listing.request';

@Injectable()
export class ListingReposetory {
  listings : any[] = [];
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
    // console.log('update');
    this.controller.getActiveListings(new ListingRequest()).subscribe((ids : number[]) => {
      // console.log(ids)
      let i = 0;
      let pairArray : Listing[] = [];
      ids.forEach((id : number) => {
          this.controller.getListing(id).subscribe((listing : Listing) => {
            if(i % 2 === 0) {
              pairArray = [];
              pairArray.push(listing);
            } else {
              pairArray.push(listing);
              this.listings.push(pairArray);
            }
            i++;
          });
      });
      if(i % 2 === 1){//The last listing was even and hence never saved
        this.listings.push(pairArray);
      }
      console.log(this.listings);
    }, (error : any) => {
      console.log('getall - error')
      console.log(error);
    }, () => {
      console.log('getall - complete')
    });
  }

}
