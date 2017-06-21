import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { ListingController } from '../../listings/listing/listing.controller';
import { Listing } from '../../listings/listing/listing.model';
import { ListingRepository } from '../../listings/listing/listing.repository';

import { MessageService } from '../../../shared/message.service';

import { DateService } from '../../../shared/date.service';

@Component({
  selector: 'user-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class UserProfilComponent implements OnInit {

  public ownListings : Listing[] = [];

  constructor(
    public userService : UserService,
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private router : Router,
    private messageService : MessageService,
    private userController : UserController,
    public dateService : DateService
  ) {  }

  ngOnInit() : void {
    this.listingController.getOwnListings().subscribe((listings : Listing[]) => {
      this.ownListings = listings;
    });
  }

  /**Returns the listing title from the listing with the corresponding listing id. */
  private getListingTitleFromListingID(listingID : number) : string {
    return this.ownListings.filter(listing => listing.id === listingID)[0].title;
  }

  public activateListing(listingID : number) : void {
    this.listingController.activateListing(listingID).subscribe(() => {
      this.ownListings.filter(listing => listingID === listing.id)[0].isActive = true;
      this.listingRepository.update();
      let notification = "Inserat " + this.getListingTitleFromListingID(listingID) + " wurde erfolgreich aktiviert.";
      this.listingStatusMessage('notify-success', notification);
    }, (error : Error) => {
      let notification = "Aktivierung des Inserates " + this.getListingTitleFromListingID(listingID) + " ist fehlgeschlagen. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    });
  }

  public deactivateListing(listingID : number) : void {
    this.listingController.deactivateListing(listingID).subscribe(() => {
      // TODO: mark listing as deactivated
      this.ownListings.filter(listing => listingID === listing.id)[0].isActive = false;
      this.listingRepository.update();
      let notification = "Inserat " + this.getListingTitleFromListingID(listingID) + " wurde erfolgreich deaktiviert.";
      this.listingStatusMessage('notify-success', notification);
    }), (error : Error) => {
      let notification = "Deaktivierung des Inserates " + this.getListingTitleFromListingID(listingID) + " ist fehlgeschlagen. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    };
  }

  public removeListing(listingID : number) : void {
    this.listingController.removeListing(listingID).subscribe(() => {
      let found : boolean = false;
      for (let i = 0; i < this.ownListings.length && !found; i++) {
        if (this.ownListings[i].id === listingID) {
          found = true;
          this.ownListings.splice(i, 1);
        }
      }
      if (found) {
        this.listingRepository.update();
      }
      let notification = "Inserat " + listingID + " wurde erfolgreich gelöscht.";
      this.listingStatusMessage('notify-success', notification);
    }), (error : Error) => {
      let notification = "Das Inserat " + listingID + " konnte nicht gelöscht werden. Grund: " + error;
      this.listingStatusMessage('notify-error', notification);
    };
  }

  public changeListing(listing : Listing) {
    this.router.navigate(['home']).then((fulfilled : boolean) => {
      if (fulfilled) {
        this.messageService.sendMessage({
          message : 'changeListing',
          payload: listing
        })
      }
    });
  }

  private retireAsAdmin() : void {
    this.userController.relieveAdmin(this.userService.userInformation.userID).subscribe(() => {
      this.userService.userInformation.isAdmin = false;
    })
  }

  private listingStatusMessage(message:string, payload:string ) : void {
    this.messageService.sendMessage({
      message: message,
      payload: payload
    });
  }

}
