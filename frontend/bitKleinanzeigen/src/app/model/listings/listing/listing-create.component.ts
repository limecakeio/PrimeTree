import { Component, Type } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { FormService } from '../../../form/forms.service';

import { ListingController } from './listing.controller';
import { ListingRepository } from './listing.repository';
import { ListingDescriptorHandler } from './listing-descriptor.handler';
import { ListingInformationService } from '../listings-information.service';
import { UserService } from '../../user/user.service';

export interface ListingFormEventModel {
  model : any;
  callback?: (id : number) => void
  updateRepository : boolean;
}

import { ListingCreateFormComponent } from './listing-create-form.component';
import { ListingModule } from './listing.module';
import { ListingDescriptor } from './listing.descriptor';

@Component({
  selector: 'listing-create',
  templateUrl: './listing-create.component.html'
})
export class ListingCreateComponent {

  private listingDescriptorHandler : ListingDescriptorHandler;

  constructor(
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private listingInformationService : ListingInformationService
  ) {
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
    this.listingDescriptorHandler.findListingCreateFormComponentTypeFromLisitingType(this.activatedRoute.snapshot.params['listingType']);
    this.listingCreateFormComponentType = this.listingDescriptorHandler.findListingCreateFormComponentTypeFromLisitingType(this.activatedRoute.snapshot.params['listingType']);
    this.userLocation = this.userService.userInformation.location;
  }

  public listingCreateFormComponentType : Type<ListingCreateFormComponent>;

  public userLocation : string;

  /**
   * Submits all properties.
   */
  public create(event : ListingFormEventModel) : void {
    console.log(event.model, 'create');
    event.model.creator = this.userService.user.username;
    event.model.location = this.userService.userInformation.location;
    this.listingController.createListing(event.model).subscribe((listingId : number) => {
      if (event.hasOwnProperty('callback')) {
        event.callback(listingId);
      }
      if (event.updateRepository) {
        this.listingRepository.update();
      }
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

  public updateRepository() : void {
    console.log('updateRepository called')
    this.listingRepository.update();
    this.router.navigate(['home']);
  }

}
