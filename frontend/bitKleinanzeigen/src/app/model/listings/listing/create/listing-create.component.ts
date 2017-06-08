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

  constructor(
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private listingInformationService : ListingInformationService
  ) {
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
    this.userLocation = this.userService.userInformation.location;
    this.router.events.subscribe((event : any) => {
      if (event instanceof NavigationEnd) {
        if (
          this.activatedRoute.snapshot.url.length > 1 &&
          this.activatedRoute.snapshot.url[0].path === 'create'
        ) {
          this.setUpListingCreateFormData();
        }
      }
    });
  }

  private setUpListingCreateFormData() : void {
    this.createActive = true;
    this.listingType = this.activatedRoute.snapshot.params['listingType'];
    this.listingDescriptorHandler.findListingCreateFormComponentTypeFromLisitingType(this.listingType);
    this.listingCreateFormComponentType = this.listingDescriptorHandler.findListingCreateFormComponentTypeFromLisitingType(this.activatedRoute.snapshot.params['listingType']);
    this.showOverlay.emit();
  }

  public listingCreateFormComponentType : Type<ListingCreateFormComponent>;

  public userLocation : string;

  private listingType : string;

  /**
   * Submits all properties.
   */
  public create(event : ListingFormEventModel) : void {
    event.model.creator = this.userService.user.username;
    event.model.location = this.userService.userInformation.location;
    event.model.type = this.listingType;
    this.listingController.createListing(event.model).subscribe((listingId : number) => {
      if (event.hasOwnProperty('callback')) {
        event.callback(listingId);
      }
      if (event.updateRepository) {
        this.updateRepository();
      }
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

  public updateRepository() : void {
    this.listingRepository.update();
    this.closeOverlay.emit();
    this.createActive = false;
  }

}
