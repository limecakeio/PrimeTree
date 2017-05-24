import { Component, AfterViewInit, HostListener} from '@angular/core';
import { ListingReposetory } from './listing.reposetory';
import { Listing } from './listing.model';

@Component({
  selector: 'listings',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements AfterViewInit {
  listings : Listing[];
  windowWidth: number;
  windowHeight: number;
  scrollOffset: number;
  listingWrapper: any;
  listingWidth: number;

  constructor(public repo : ListingReposetory) {
    this.listings = this.repo.listings;
  }

  getListings() : Listing[] {
    return this.repo.listings;
  }

  /**Scrolls the displayed listings either forwards or backwards*/
  scrollListings(direction:string): void {
    const leftPos = parseInt(this.listingWrapper.style.left.replace("[^\\d-]", ""));

    /**Determine how far to shift the container per click in any direction*/
    let listingWidth = document.querySelector(".listing-container").clientWidth;

    /*Define the scroll distance based on the device viewport size*/
    if(this.windowWidth < 480) { //Mobile - scroll one listing per viewport
      this.scrollOffset = listingWidth / 2; //We are displaying them side-by-side
    } else  { //Anything bigger than a smartphone - scroll 3 Listings per viewport
      this.scrollOffset = 3 * listingWidth;
    }

    /*Scroll the listings*/
    if(direction === "forward") {
      this.listingWrapper.style.left = (leftPos - this.scrollOffset) + "px";
    } else {
      this.listingWrapper.style.left = (leftPos + this.scrollOffset) + "px";
    }

    this.setSliderControls();
  }

  /*Determines, based on the listings wrapper's position within the viewport,
  if controls are required*/
  public setSliderControls(): void {

      const backwardControl = <any>document.querySelector("#viewport-control-backward");
      const forwardControl = <any>document.querySelector("#viewport-control-forward");
      const leftPos = parseInt(this.listingWrapper.style.left.replace("[^\\d-]", ""));
      const listingWidth = document.querySelector(".listing-container").clientWidth;

      if(this.listingWrapper) {
        //See if we require a forward button
        if(this.listingWrapper.clientWidth < this.windowWidth) {
          forwardControl.classList.add("hidden");
        } else if (-(leftPos) > this.listingWrapper.clientWidth - listingWidth || this.listingWrapper.clientWidth <= this.windowWidth) {
          /*Potentially the end of the listings*/
          //TODO try to load more listings
          forwardControl.classList.add("hidden");
        } else {
          forwardControl.classList.remove("hidden");
        }

        //See if we require a backward button
        if(leftPos >= 0) { //We cannot go further back
          backwardControl.classList.add("hidden");
        } else {
          backwardControl.classList.remove("hidden");
        }
      }
  }

  setListingDimensions() {
    /*Determine how many listings to display horizontally based on the screen size*/
    let divisionFactor = 0;
    if(this.windowWidth < 375) {
      divisionFactor = 1;
    } else if (this.windowWidth < 700) {
      divisionFactor = 2;
    } else if (this.windowWidth < 900) {
      divisionFactor = 3;
    } else {
      divisionFactor = 4;
    }

    //Set the updated with on all listings
    let listings = <any>document.querySelectorAll(".listing-preview");
    for(let i = 0; i < listings.length; i++) {
      let margin = listings[i].offsetLeft;
      listings[i].style.width = (this.windowWidth/divisionFactor)-margin + "px";
    }
  }

  ngAfterViewInit(): void {
    /*Set required window dimensions*/
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    /*Set the listing container once component's been loaded*/
    this.listingWrapper = document.querySelector("#listing-container-wrapper");
  }

  /**Keeping an eye if the window size changes to adapt the listing viewport*/
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    event.target.innerWidth;
    event.target.innerHeight;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.setListingDimensions();
    this.setSliderControls();
  }

}
