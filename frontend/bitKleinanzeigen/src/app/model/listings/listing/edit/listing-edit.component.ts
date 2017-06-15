import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

import { FormContextService } from '../../../../form/form-context.service';

import { UserService } from '../../../user/user.service';

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
export class ListingEditComponent {

  @Output() showOverlay : EventEmitter<void> = new EventEmitter<void>();

  @Output() closeOverlay : EventEmitter<void> = new EventEmitter<void>();

  public listingType : string;

  public listing : Listing;

  constructor(
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) {
    this.router.events.subscribe((event : any) => {
      if (event instanceof NavigationEnd) {
        if (
          this.activatedRoute.snapshot.url.length === 2 &&
          this.activatedRoute.snapshot.url[0].path === 'edit'
        ) {
          this.getListingFromServer(this.activatedRoute.snapshot.params['listingID'])
          this.showOverlay.emit();
        }
      }
    });
  }

  public getListingFromServer(listingID : number) : void {
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
    this.closeOverlay.emit();
    this.router.navigate(['home']);
  }

  public closeForm() : void {
    this.listing = null;
    this.listingType = '';
    this.router.navigate(['home']);
  }

  public returnForm() : void {
    this.listing = null;
    this.listingType = '';
    this.router.navigate(['user', 'profil']);
  }

}
