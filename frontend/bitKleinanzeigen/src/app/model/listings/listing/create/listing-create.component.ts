import { Component, Type, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

// import { FormService } from '../../../form/forms.service';
import { FormContextService } from '../../../../form/form-context.service';

import { ListingController } from '../listing.controller';
import { ListingRepository } from '../listing.repository';
import { ListingDescriptorHandler } from '../listing-descriptor.handler';
import { ListingInformationService } from '../../listings-information.service';
import { UserService } from '../../../user/user.service';

import { ListingModule } from '../listing.module';
import { ListingDescriptor } from '../listing.descriptor';
import { Listing } from '../listing.model';
import { ListingSubmit } from '../form/listing-form.component';

import { MessageService, Message } from '../../../../shared/message.service';

@Component({
  selector: 'listing-create',
  templateUrl: './listing-create.component.html',
  styleUrls: [ './listing-create.component.css' ],
  providers: [
    FormContextService
  ]
})
export class ListingCreateComponent {

  @Output() showOverlay : EventEmitter<void> = new EventEmitter<void>();

  @Output() closeOverlay : EventEmitter<void> = new EventEmitter<void>();

  public createActive : boolean = false;

  // ListingCreateFormComponent will be instanciated if this property holds a proper listing type.
  public listingType : string = '';

  public listingKind : string = '';

  public listing : Listing;

  constructor(
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private listingInformationService : ListingInformationService,
    private messageService : MessageService
  ) {
  }

  public setListingKind(listingKind : string) : void {
    this.listingKind = listingKind;
  }

  public setListingType(listingType : string) : void {
    this.listingType = listingType;
    this.listing = this.listingInformationService.listingDescriptorHandler.getListingFromListingType(listingType);
  }

  /**
   * Completes additional needed listing properties and submits it to the server.
   * Execute possible callback functions in ListingFormEventModel.
   */
  public submitListing(event : ListingSubmit) : void {
    event.model.location = this.userService.userInformation.location;
    event.model.type = this.listingType;
    event.model.isActive = true;
    event.model.createDate = new Date().getTime();
    if (event.model.expiryDate) { // add the create Date
      event.model.expiryDate = parseInt(event.model.expiryDate) + event.model.createDate;
    }
    this.listingController.createListing(event.model).subscribe((listingId : number) => {
      if (event.callback) {
        event.callback(listingId);
      } else {
        this.updateRepository();
      }
    }, (error : Error) => {
      console.error(error);
    });
  }

  /** Calls the ListingRepository update method, hides the overlay and navigates to the overview page.*/
  public updateRepository() : void {
    this.listingKind = '';
    this.listingType = '';
    this.listingRepository.update();
    this.messageService.sendMessage({
      message: "resetViewport"
    });
  }

  public closeForm() : void {
    this.listingType = '';
    this.listingKind = '';
    this.closeOverlay.emit();
    this.messageService.sendMessage({
      message: 'resetViewport'
    })
    this.router.navigate(['home']);
  }

  public returnForm() : void {
    if (this.listingType) {
      this.listingType = '';
    } else if (this.listingKind) {
      this.listingKind = '';
    }

  }

}
