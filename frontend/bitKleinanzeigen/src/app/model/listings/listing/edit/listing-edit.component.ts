import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormContextService } from '../../../../form/form-context.service';

import { UserService } from '../../../user/user.service';

import { MessageService, Message } from '../../../../shared/message.service';

import { ListingController } from '../listing.controller';
import { ListingRepository } from '../listing.repository';
import { Listing } from '../listing.model';
import { ListingSubmit } from '../form/listing-form.component';

@Component({
  selector: 'listing-edit',
  templateUrl: './listing-edit.component.html',
  styleUrls: [ './listing-edit.component.css' ],
  providers: [
    FormContextService
  ]
})
export class ListingEditComponent implements OnChanges {

  @Input() listing : Listing;

  public listingType : string;

  // public listing : Listing;

  constructor(
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private router : Router,
    private messageService : MessageService
  ) {

  }

  private getListingFromServer(listingID : number) : void {
    this.listingController.getListing(listingID).subscribe((listing : Listing) => {
      this.listing = listing;
      this.listingType = listing.type;
    });
  }

  /**
   * Completes additional needed listing properties and submits it to the server.
   * Execute possible callback functions in ListingFormEventModel.
   */
  public submitListing(event : ListingSubmit) : void {
    if (event.model.expiryDate) { // add the create Date
      event.model.expiryDate = parseInt(event.model.expiryDate) + event.model.createDate;
    }
    this.listingController.editListing(event.model).subscribe(() => {
      if (event.callback) {
        event.callback(event.model.id);
      } else {
        this.listingRepository.update();
      }
    })
  }

  /** Calls the ListingRepository update method, hides the overlay and navigates to the overview page.*/
  public updateRepository() : void {
    this.listingRepository.update();
  }

  public closeForm() : void {
    this.listing = null;
    this.listingType = '';
    this.messageService.sendMessage({
      message: 'resetViewport'
    })
  }

  public returnForm() : void {
    this.listing = null;
    this.listingType = '';
    this.router.navigate(['user', 'profil']);
  }

  ngOnChanges() : void {
    if (this.listing) {
      this.listingType = this.listing.type;
    }
  }

}
