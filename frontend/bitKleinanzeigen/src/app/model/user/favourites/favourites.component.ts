import {
  Component,
  ElementRef,
  Type,
  ViewChild
} from '@angular/core';

import { ListingInformationService } from '../../listings/listings-information.service';

import { Listing } from '../../listings/listing/listing.model';
import { ListingController } from '../../listings/listing/listing.controller';
import { MessageService, Message } from '../../../shared/message.service';

import { UserController } from '../user.controller';

@Component({
  selector: 'user-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: [ './favourites.component.css',
  '../../../listings/listing/preview/listing-overview-viewport.component.css' // JIZ
  // '../../listings/listing/preview/listing-overview-viewport.component.css' // AOT
]
})
export class FavouritesComponent {

  public favouriteListings : Listing[] = [];

  detailListingID : number;
  listingCounter : number = 0;
  listingCount : number = 0;

  @ViewChild('listingDetailView') listingDetailView : ElementRef;
  @ViewChild('listingViewport') listingViewport : ElementRef;

  constructor(
    private userController : UserController,
    private listingController : ListingController,
    private listingInformationService : ListingInformationService,
    private messageService : MessageService
  ) {
    this.getFavourites();
    this.messageService.getObservable().subscribe((message:Message) => {
      this.messageReceiver(message);
    });
  }

  /*
   * Listens for incoming messages and manipulates the viewport beheaviour accordingly
   */
  private messageReceiver(message : Message) : void {
    if (message.message === 'resetViewport') {
      this.resetViewport();
    } else if(message.message === 'displayListingDetail') {
      this.loadListingDetailView(message.payload);
      this.listingDetailView.nativeElement.classList.add("active");
      this.listingViewport.nativeElement.classList.add('slide-away');
    }
  };

  /*
   * Sets the listing ID in order to load it into the view
   */
  private loadListingDetailView(listingID : number) : void {
    this.detailListingID = listingID;
  }

  private getFavourites() : void {
    this.userController.getFavourites().subscribe((listingIDs : number[]) => {
      this.listingCount = listingIDs.length;
      listingIDs.forEach((listingID : number) => {
        this.listingController.getListing(listingID).subscribe((listing : Listing) => {
          this.favouriteListings.push(listing);
        }, (error : Error) => {
          console.log(error)
        });
      });
    }, (error : Error) => {
      console.log(error)
    })
  }

  public updateListingCounter(id : number) : void {
    this.listingCounter++;
    if (this.listingCounter === this.listingCount) {

    }
  }

  /*
   * Sets all levels to be hidden and returns the viewport to its
   * original state
   */
   private resetViewport() : void {
     // Hide listing detail view
     this.listingDetailView.nativeElement.classList.remove('active');
     this.listingViewport.nativeElement.classList.remove('slide-away');
   }

}
