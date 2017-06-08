import { Component, Type, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

// import { FormService } from '../../../form/forms.service';

import { ListingController } from '../listing.controller';
import { ListingRepository } from '../listing.repository';
import { ListingDescriptorHandler } from '../listing-descriptor.handler';
import { ListingInformationService } from '../../listings-information.service';
import { UserService } from '../../../user/user.service';

export interface ListingFormEventModel {
  model : any;
  callback?: (id : number) => void
  updateRepository : boolean;
}

import { ListingCreateFormComponent } from './listing-create-form.component';
import { ListingModule } from '../listing.module';
import { ListingDescriptor } from '../listing.descriptor';

@Component({
  selector: 'listing-create',
  templateUrl: './listing-create.component.html'
})
export class ListingCreateComponent {

  private listingDescriptorHandler : ListingDescriptorHandler;

  @Output() showOverlay : EventEmitter<void> = new EventEmitter<void>();

  @Output() closeOverlay : EventEmitter<void> = new EventEmitter<void>();

  public createActive : boolean = false;

  // ListingCreateFormComponent will be instancieted if this property holds a proper listing type.
  public listingType : string;

  constructor(
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private userService : UserService,
  ) {
    // this.userLocation = this.userService.userInformation.location;
    this.router.events.subscribe((event : any) => {
      if (event instanceof NavigationEnd) {
        if (
          this.activatedRoute.snapshot.url.length === 2 &&
          this.activatedRoute.snapshot.url[0].path === 'create'
        ) {
          this.listingType = this.activatedRoute.snapshot.params['listingType'];
          this.showOverlay.emit();
        }
      }
    });
  }

  /**
   * Completes additional needed listing properties and submits it to the server.
   * Execute possible callback functions in ListingFormEventModel.
   */
  public submitListing(event : ListingFormEventModel) : void {
    event.model.creator = this.userService.user.username;
    event.model.location = this.userService.userInformation.location;
    event.model.type = this.listingType;
    event.model.isActive = true;
    event.model.createDate = new Date().getTime();
    this.listingController.createListing(event.model).subscribe((listingId : number) => {
      if (event.hasOwnProperty('callback')) {
        event.callback(listingId);
      }
      if (event.updateRepository) {
        this.updateRepository();
      }
    }, (error : Error) => {
      console.error(error);
    });
  }

  /** Calls the ListingRepository update method, hides the overlay and navigates to the overview page.*/
  public updateRepository() : void {
    this.listingRepository.update();
    this.closeOverlay.emit();
    this.router.navigate(['home']);
  }

}
