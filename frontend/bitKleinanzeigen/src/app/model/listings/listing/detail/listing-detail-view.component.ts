import {
  Component,
  Type,
  Input,
  OnChanges,
  SimpleChanges
 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListingModule } from '../listing.module';
import { ListingDescriptorHandler } from '../listing-descriptor.handler';
import { ListingComponent } from './listing.component';
import { ListingController } from '../listing.controller';
import { ListingInformationService } from '../../listings-information.service';
import { Listing } from '../listing.model';

/**This class acts as a container for the actual listing component.  */
@Component({
  selector: 'listing-detail-view',
  templateUrl: './listing-detail-view.component.html',
  styleUrls: [ './listing-detail-view.component.css' ]
})
export class ListingDetailViewComponent implements OnChanges {

  @Input() listingID : number = 0;

  public listingDescriptorHandler : ListingDescriptorHandler;

  public listingComponentType : Type<ListingComponent>;

  public listing : Listing;

  public showListingDetailView : boolean = false;

  constructor(
    private activatedRoute : ActivatedRoute,
    private listingController : ListingController,
    private listingInformationService : ListingInformationService
  ) {
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (typeof simpleChanges['listingID']['currentValue'] === 'number') {
      this.setListingAndLisitingType(this.listingID);
    }
  }

  /**Retrives the listing with the listingID and set the listing type property accordingly. */
  private setListingAndLisitingType(listingID : number) {
    this.listingController.getListing(listingID)
    .subscribe((listing : Listing) => {
      this.listing = listing;
      this.listingComponentType = this.listingDescriptorHandler.getListingComponentTypeFromListingType(listing.type);
      this.showListingDetailView = true;
    }, (error : Error) => {
      console.error(error);
    }, () => {

    })
  }

}
