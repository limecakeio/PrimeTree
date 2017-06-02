import { Injectable } from '@angular/core';

import { Listing } from './listing.model';
import { ListingController } from './listing.controller';
import { User, UserService } from '../../user/user';
import { Page } from './page.model';

/**
 * This class distributes the listing and collects them.
 */
@Injectable()
export class ListingRepository {

  public listings : any[] = [];
  public listingCount : number;

  private page : Page;

  constructor(
    private listingController : ListingController,
    private userService : UserService
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

  /**
   * Updates all listings
   */
  public update() : void {
    if (this.userService.userInformation.isAdmin) {
      this.updateAsAdmin();
    } else {
      this.updateAsEmployee();
    }
  }

  private updateAsAdmin() : void {

  }

  private updateAsEmployee() : void {
    this.listingController.getActiveListings().subscribe((page : Page) => {
      this.page = page;
      this.listingCount = page.listings.length;
      this.buildPairArraysFromPage(page);
      this.getNextListings();
    }, (error : Error) => {
      console.error(error);
    }, () => {
      // this.getNextListings();
    });
  }

  public getNextListings() : void {
    if (this.page.pageNumber === this.page.pages) {
      this.page.pageNumber = 1;
    }
    this.listingController.loadNewPageSite(this.page).subscribe((page : Page) => {
      this.page = page;
      this.buildPairArraysFromPage(page);
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

  private buildPairArraysFromPage(page : Page) {
    console.log(page);
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
