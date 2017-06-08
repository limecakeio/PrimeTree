import {
  Component,
  Type
} from '@angular/core';

import { ListingInformationService } from '../../listings/listings-information.service';

import { Listing } from '../../listings/listing/listing.model';
import { ListingController } from '../../listings/listing/listing.controller';

import { UserController } from '../user.controller';

@Component({
  selector: 'user-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: [ './favourites.component.css' ]
})
export class FavouritesComponent {

  public favouriteListings : Listing[] = [];

  windowWidth: number;
  windowHeight: number;
  scrollOffset: number;
  listingWrapper: any;
  listingWidth: number;
  listingCounter : number = 0;
  listingCount : number = 0;

  constructor(
    private userController : UserController,
    private listingController : ListingController,
    private listingInformationService : ListingInformationService
  ) {
    this.getFavourites();

  }

  public getListingPreviewTypeFromListingType(listingType : string) {
    return this.listingInformationService.listingDescriptorHandler.findListingPreviewComponentTypeFromListingType(listingType);
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
    console.log('favourite listing Counter', this.listingCounter);
    if (this.listingCounter === this.listingCount) {
      console.log(this.listingCounter)
      this.setViewport();
    }
  }

  public triggerDetailViewOverlay(e : any) : void {

  }

  setViewport(): void {
    //Calculate the availble space for the viewport
    const headerHeight = document.querySelector("#header").clientHeight;
    const listingViewport = <any>document.querySelector("#listing-viewport");
    const viewportHeight = this.windowHeight - headerHeight;
    listingViewport.style.height = viewportHeight + "px";

    /*Regardless of the device we are accessed from if a screen's height smaller
    than 650px we display the listings on a single line*/
    const viewPortMargin = 100; //Don't allow a listing to fill the entire container.

    let listings = document.querySelectorAll(".listing");
    let listingCubicSize;

    if(viewportHeight < 650) {
      //Display listings on a single row
      for(let i = 0; i < listings.length; i++) {
        listings[i].classList.add("single-row");
      }
      //Set the listing dimension
      listingCubicSize = viewportHeight - viewPortMargin;
    } else {
      //Display listings wihtin two rows
      for(let i = 0; i < listings.length; i++) {
        listings[i].classList.remove("single-row");
      }
      listingCubicSize = (viewportHeight/2)- viewPortMargin;
    }

    //Apply the size to each listing and set its image-preview
    let listingPreviews = <any>document.querySelectorAll(".listing-preview");
    for(let i = 0; i < listings.length; i++) {
      listingPreviews[i].style.width = listingCubicSize + "px";
      listingPreviews[i].style.height = listingCubicSize + "px";
      //Images to display in the OpenGraph ratio of 1:0.525
      listingPreviews[i].querySelector(".listing-image").style.height = listingCubicSize * 0.525 + "px";
    }
  }

}
