import { Component } from '@angular/core';

import { UserController } from '../../user.controller';
import { ListingController } from '../../../listings/listing/listing.controller';
import { StatisticsService } from '../../../../shared/statistics.service';

import { UserMin } from '../../user-min.model';
import { Listing } from '../../../listings/listing/listing.model';
import { Page } from '../../../listings/listing/page.model';

@Component({
  selector: 'user-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class UserAdminDashboardComponent {

  public listings : Listing[] = [];

  private page : Page;

  public users : UserMin[];

  constructor(
    private userController : UserController,
    private listingController : ListingController,
    private statisticsService : StatisticsService
  ) {
    this.listingController.getListings().subscribe((page : Page) => {
      this.page = page;
      page.listings.forEach((listing : Listing) => {
        this.listings.push(listing);
      });
    });
    this.userController.getUsers().subscribe((users : UserMin[]) => {
      this.users = users;
    });
  }

  public loadMoreListings() : void {
    this.listingController.loadNewPageSite(this.page).subscribe((page : Page) => {
      this.page = page;
      page.listings.forEach((listing : Listing) => {
        this.listings.push(listing);
      });
    });
  }

  public removeListing(listingID : number) : void {
    this.listingController.removeListing(listingID).subscribe(() => {
      // Cannot use .splice(listingID, 1) because listings with an id less than listingID could have been removed before
      let found : boolean = false;
      for (let i = 0; i < this.listings.length && !found; i++) {
        if (this.listings[i].id === listingID) {
          found = true;
          this.listings.splice(i, 1);
        }
      }
    });
  }

  public activeListing(listingID : number) : void {
    this.listingController.activateListing(listingID).subscribe(() => {
      this.listings.find(listing => listing.id === listingID).isActive = true;
    });
  }

  public deactivateListing(listingID : number) : void {
    this.listingController.activateListing(listingID).subscribe(() => {
      this.listings.find(listing => listing.id === listingID).isActive = false;
    });
  }

  public appointAdmin(userID : number) : void {
    this.userController.appointAdmin(userID).subscribe(() => {
      this.users.find(user => user.userId === userID).isAdmin = true;
    });
  }

}
