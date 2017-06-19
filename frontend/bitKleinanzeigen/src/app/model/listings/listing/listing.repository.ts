import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { FilterCriteria } from './filter/filter.component';

import { Listing } from './listing.model';
import { ListingController } from './listing.controller';
import { ListingRequest } from './listing.request';
import { User, UserService } from '../../user/user';
import { Page } from './page.model';

import { ListingSearchService } from './search/search.service';

enum State {
  WAITING, WORKING
}
/**
 * This class distributes the listing and collects them.
 */
@Injectable()
export class ListingRepository {

  public listings : any[] = [];
  public listingCount : number;

  private page : Page;

  private loadingSubject : Subject<boolean> = new Subject<boolean>();

  private loadingObservable : Observable<boolean> = this.loadingSubject.asObservable();

  private state : State = State.WAITING;

  constructor(
    private listingController : ListingController,
    private userService : UserService,
    private listingSearchService : ListingSearchService
  ) {
    this.update();
  }

  /**
   * Adds a listing to the repository.
   * @argument {Listing} listing
   */
  public addListing(listing : Listing) : void {
    this.listings.push(listing);
  }

  /**
   * Removes the argument listing from the repository.
   * @argument {Listing} listing
   */
  public removeListing(listing : Listing) : void {
    this.listingController.removeListing(listing.id).subscribe(() => {
      this.update();
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

  /** Creates a ListingRequest out of the criterias and updates the listing array
   and the page with listings which match the filter criteria*/
  public applyFilter(filterCriteria : FilterCriteria) : void {
    let listingRequest : ListingRequest = this.listingController.listingRequest();
    this.listingCount = 0;

    if (filterCriteria.kind) {
      listingRequest.setListingKind(filterCriteria.kind);
    }
    filterCriteria.location.forEach((location : string) => {
      listingRequest.addLocation(location);
    });
    if (filterCriteria.price_max && filterCriteria.price_min) {
      listingRequest.setPriceMax(filterCriteria.price_max);
      listingRequest.setPriceMin(filterCriteria.price_min);
    }
    filterCriteria.type.forEach((listingType : string) => {
      listingRequest.addListingType(listingType);
    });
    this.listingController.getActiveListings(listingRequest).subscribe((page : Page) => {
      this.page = page;
      this.listings = []; // remove former listing pairs
      this.buildPairArraysFromPage(page);
      this.listingCount = page.listings.length;
    }, (error : Error) => {
      console.log(error);
    });
  }

  /**
   * Updates all listings
   */
  public update() : void {
    this.listings = [];
    this.listingCount = 0;

    this.listingController.getActiveListings().subscribe((page : Page) => {
      this.page = page;
      this.listingCount = page.listings.length;
      this.buildPairArraysFromPage(page);
    }, (error : Error) => {
      console.error(error);
    }, () => {
      // this.getNextListings();
    });
  }

  /** Loads more listings from the server. The Observable returns true if the loading was successful else false*/
  public getNextListings() : Observable<boolean> {
    if (this.page.pageNumber < this.page.pages && this.state === State.WAITING) {
      this.state = State.WORKING;
      this.listingController.loadNewPageSite(this.page).subscribe((page : Page) => {
        this.state = State.WAITING;
        this.page = page;
        this.listingCount += this.page.listings.length;
        this.buildPairArraysFromPage(page);
        this.loadingSubject.next(true);
      }, (error : Error) => {
        console.error(error);
      }, () => {

      });
    } else {
      this.loadingSubject.next(false);
    }
    return this.loadingObservable;
  }

  private buildPairArraysFromPage(page : Page) {
    let i = 0;
    let pairArray : Listing[] = [];
    page.listings.forEach((listing : Listing) => {
      if(i % 2 === 0) {
        pairArray = [];
        pairArray.push(listing);
      } else {
        pairArray.push(listing);
        this.listings.push(pairArray);
      }

      if(page.listings.length === i+1 && i%2 === 0) {
        this.listings.push(pairArray);
      }

      i++;
    });
  }

}
