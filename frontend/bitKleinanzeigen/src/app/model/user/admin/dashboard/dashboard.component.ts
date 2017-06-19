import { Component } from '@angular/core';

import { UserController } from '../../user.controller';
import { ListingController } from '../../../listings/listing/listing.controller';
import { StatisticsService } from '../../../../shared/statistics.service';

import { UserMin } from '../../user-min.model';
import { Listing } from '../../../listings/listing/listing.model';
import { Page } from '../../../listings/listing/page.model';
import {MessageService, Message} from '../../../../shared/message.service'

@Component({
  selector: 'user-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class UserAdminDashboardComponent {

  public listings : Listing[] = [];

  public page : Page;

  public users : UserMin[];

  constructor(
    private userController : UserController,
    private listingController : ListingController,
    private statisticsService : StatisticsService,
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
    console.log("MORE LISTINGS", this.page)
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
      let notification = "Inserat " + listingID + " wurde erfolgreich gelöscht.";
      this.listingStatusMessage('notify-success', notification);
    }), (error: Error) => {
      let notification = "Das Inserat " + listingID + " konnte nicht gelöscht werden. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    };
  }

  public activateListing(listingID : number) : void {
    this.listingController.activateListing(listingID).subscribe(() => {
      this.listings.find(listing => listing.id === listingID).isActive = true;
      let notification = "Inserat " + listingID + " wurde erfolgreich aktiviert.";
      this.listingStatusMessage('notify-success', notification);
    }), (error: Error) => {
      let notification = "Das Inserat " + listingID + " konnte nicht aktiviert werden. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    };
  }

  public deactivateListing(listingID : number) : void {
    this.listingController.activateListing(listingID).subscribe(() => {
      this.listings.find(listing => listing.id === listingID).isActive = false;
      let notification = "Inserat " + listingID + " wurde erfolgreich deaktiviert.";
      this.listingStatusMessage('notify-success', notification);
    }), (error: Error) => {
      let notification = "Das Inserat " + listingID + " konnte nicht deaktiviert werden. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    };
  }

  public appointAdmin(userID : number) : void {
    this.userController.appointAdmin(userID).subscribe(() => {
      this.users.find(user => user.userId === userID).isAdmin = true;
      let notification = "Der Benutzer mit der ID:" + userID + " wurde erfolgreich zum Administrator ernannt.";
      this.listingStatusMessage('notify-success', notification);
    }), (error : Error) => {
      let notification = "Der Benutzer mit der ID: " + userID + " konnte nicht zum Administrator ernannt werden. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    };
  }

  private listingStatusMessage(message:string, payload:string ) : void {
    this.messageService.sendMessage({
      message: message,
      payload: payload
    });
  }

}
