import {
  Component,
  Input,
  OnChanges,
  ComponentFactoryResolver,
  Type,
  SimpleChanges,
  SimpleChange
} from '@angular/core';

import { ListingDetailViewPlaceholderComponent } from './listing-detail-view-placeholder.component';
import { ListingInformationService } from '../../listings-information.service';
import { ListingDescriptorHandler } from '../listing-descriptor.handler';
import { ListingComponent } from './listing.component';
import { ListingController } from '../listing.controller';
import { Listing } from '../listing.model';

@Component({
  selector: 'listing-detail-view-overlay',
  templateUrl: './listing-detail-view-overlay.component.html',
  styleUrls: [ './listing-detail-view-overlay.component.css' ]
})
export class ListingDetailViewOverlayComponent implements OnChanges {

  @Input() listingID : number;

  @Input() lisitingDetailViewOverlayDisplayState : boolean;

  public listingComponentType : Type<ListingComponent>;

  private listingDescriptorHandler : ListingDescriptorHandler;

  public listing : Listing;

  public displayDetailViewOverlay : string = 'none';

  constructor(
    private listingInformationService : ListingInformationService,
    private listingController : ListingController
  ) {
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
  }

  public deactivateDetailViewOverlay() : void {
    this.displayDetailViewOverlay = 'none';
  }

  public activateDetailViewOverlay() : void {
    console.log('reshow detail overlay view')
    this.displayDetailViewOverlay = 'block';
  }


  ngOnChanges(simpleChanges : SimpleChanges) : void {
    /**Check whether only the detail view nedds to redraw*/
    if (!simpleChanges['listingID'] && simpleChanges['lisitingDetailViewOverlayDisplayState']) {
      this.activateDetailViewOverlay();
      return;
    }
    if (simpleChanges['listingID']['currentValue'] === null) { // skip if no detail view selected
      return;
    }
    this.displayDetailViewOverlay = "block";
    this.listingController.getListing(this.listingID)
    .subscribe((listing : Listing) => {
      this.listing = listing;
      this.listingComponentType = this.listingDescriptorHandler.getListingComponentTypeFromListingType(listing.type);
    }, (error : Error) => {
      console.error(error);
    }, () => {
      console.log('get request finished')
    })
  }

}
