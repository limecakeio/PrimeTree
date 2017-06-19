import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserController } from '../../user.controller';
import { ListingController } from '../../../listings/listing/listing.controller';
import { StatisticsService } from '../../../../shared/statistics.service';

import { MessageService, Message } from '../../../../shared/message.service';

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
    private statisticsService : StatisticsService,
    private router : Router,
    private messageService : MessageService
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
    if (this.page.pageNumber === this.page.pages) { // check whether there are more Pages available
      return;
    }
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

  /**Sends a request and deactivates the listing with the corresponding listing. */
  public deactivateListing(listingID : number) : void {
    this.listingController.activateListing(listingID).subscribe(() => {
      this.listings.find(listing => listing.id === listingID).isActive = false;
    });
  }

  /**Appoints the employee with the userID to an admin. */
  public appointAdmin(userID : number) : void {
    this.userController.appointAdmin(userID).subscribe(() => {
      this.users.find(user => user.userId === userID).isAdmin = true;
    });
  }

  /**Routes to the listing overview and opens an edit form for the argument listing. */
  public editListing(listing : Listing) : void {
    this.router.navigate(['home']).then(() => {
      this.messageService.sendMessage({
        message : 'changeListing',
        payload: listing
      })
    })
  }

}
