import { Component, AfterViewInit, HostListener, ViewChild,
  ComponentFactoryResolver, ViewContainerRef, Type, ElementRef } from '@angular/core';

import { ListingRepository } from './listing/listing.repository';
import { Listing } from './listing/listing.model';
import { ListingPreviewComponent } from './listing/listing-preview.component';
// import { ListingsDirective } from './listings.directive';
import { SaleOfferPreviewComponent } from './offer/sale-offer/sale-offer-preview.component';
import { ListingModule } from './listing/listing.module';
import { ListingDescriptor } from './listing/listing.descriptor';

import { ListingDescriptorHandler } from './listing/listing-descriptor.handler';
import { ListingInformationService } from './listings-information.service';

declare var jQuery: any;

@Component({
  selector: 'listing-overview-viewport',
  templateUrl: './listing-overview-viewport.component.html',
  styleUrls: [ './listing-overview-viewport.component.css' ]
})
export class ListingOverviewViewportComponent implements AfterViewInit {


  private listingDescriptorHandler : ListingDescriptorHandler;

  listings : Listing[];
  windowWidth: number;
  windowHeight: number;
  scrollOffset: number;
  listingWrapper: any;
  listingWidth: number;
  listingCounter : number = 0;

  @ViewChild('listingScroller') listingScroller: ElementRef;

  public findListingPreviewComponentTypeFromListingType(listingType : string) : Type<ListingPreviewComponent> {
    return this.listingDescriptorHandler.findListingPreviewComponentTypeFromListingType(listingType);
  }

  constructor(
    public listingRepository : ListingRepository,
    private componentFactoryResolver : ComponentFactoryResolver,
    private listingInformationService : ListingInformationService
  ) {
    this.listings = this.listingRepository.listings;
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
  }

  getListings() : Listing[] {
    return this.listingRepository.listings;
  }

  /**Scrolls the displayed listings either forwards or backwards.
  Also calls to load more listings if user has scrolled to the end*/
  scrollListings(direction:string): void {
    const scrollSpeed = 750;
    let finalScrollPosition;

    /**Determine how far to shift the container per click in any direction*/
    let listingWidth = document.querySelector(".listing").clientWidth;

    /*Define the scroll distance based on the device viewport size*/
    if(this.windowWidth < 480) {
      this.scrollOffset = listingWidth;
    } else  {
      this.scrollOffset = listingWidth * 2;
    }

    /*Set the distance and direction*/
    let scrollDistance;
    if(direction === "forward") {
      scrollDistance = '+=' + this.scrollOffset;
    } else {
      scrollDistance = '-=' + this.scrollOffset;
    }

    /*Scroll the listings*/
    jQuery(this.listingScroller.nativeElement).animate({
      scrollLeft: scrollDistance
    }, scrollSpeed, function() {
      console.log("Load listings now!");
      /*If we have scrolled to the end we need to check for more listings*/
      let scrollPosition = this.setSliderControls();
      if(scrollPosition > this.listingWrapper.scrollWidth - this.listingWrapper.clientWidth-100) {
        this.loadMoreListings()
      }
    }.bind(this));
  }

  loadMoreListings() : void {
    //Show user that we are working
    let loadScreen = document.querySelector("#listing-loader");
    loadScreen.classList.add("active");
    this.listingRepository.getNextListings();
    loadScreen.classList.remove("active");
    this.setViewport();
    // this.listingRepository.getNextListings();
    // loadScreen.classList.add("active");
    // this.listingRepository.getNextListings();

  }

  /**Sets the slider controls based on if they are required and returns the
  final scroll position as a number*/
  public setSliderControls(): Number {
    if (typeof this.listingWrapper === 'undefined') {
      this.listingWrapper = document.querySelector("#listing-wrapper")
    }
    //Get the scroll position
    let scrollPosition = this.listingWrapper.scrollLeft;
    let scrollMax = this.listingWrapper.scrollWidth - this.listingWrapper.clientWidth;

    //Check if we even need to offer scroll
    if(scrollMax > 0) {
      //Grab the controls
      const backwardControl = document.querySelector("#viewport-control-backward");
      const forwardControl = document.querySelector("#viewport-control-forward");

      if(scrollPosition > 0){//User should be able to scroll left
        backwardControl.classList.add("active");
      } else {
        backwardControl.classList.remove("active");
      }
      if(scrollPosition < scrollMax) {//User should be able to scroll right
        forwardControl.classList.add("active");
      } else {
        forwardControl.classList.remove("active");
      }
    }
    return this.listingWrapper.scrollLeft;
  }


  updateListingCounter() {
    this.listingCounter++;

    //Check when all the listings have been created and served before setting the viewport
    if (this.listingCounter === this.listingRepository.listingCount) {
      this.setViewport();
    }
  };

  /**Sets the listing viewport to achieve an optimal display across all devices*/
  setViewport(): void {
    console.log('setViewport');
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
    this.setSliderControls();
  }

  ngAfterViewInit(): void {
    /*Set required window dimensions*/
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    console.log('ngAfterViewInit')
    /*Set the listing container once component's been loaded*/
    this.listingWrapper = document.querySelector("#listing-wrapper");

    /**Set an event listener for when scroll occurs*/
    document.addEventListener('scroll', (e)=>{
      /*If we have scrolled to the end we need to check for more listings*/
      let scrollPosition = this.setSliderControls();
      if(scrollPosition > this.listingWrapper.scrollWidth - this.listingWrapper.clientWidth) {
        this.loadMoreListings()
      }
    }, true);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    event.target.innerWidth;
    event.target.innerHeight;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.setViewport();
  }

}
