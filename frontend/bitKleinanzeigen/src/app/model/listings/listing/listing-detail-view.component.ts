import {
  Component,
  Type,
  OnInit
 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListingModule } from './listing.module';
import { ListingDescriptorHandler } from './listing-descriptor.handler';
import { ListingComponent } from './listing.component';
import { ListingController } from './listing.controller';
import { ListingInformationService } from '../listings-information.service';
import { Listing } from './listing.model';

@Component({
  selector: 'listing-detail-view',
  templateUrl: './listing-detail-view.component.html',
  styleUrls: [ './listing-detail-view.component.css' ]
})
export class ListingDetailViewComponent implements OnInit {

  public listingDescriptorHandler : ListingDescriptorHandler;

  public listingComponentType : Type<ListingComponent>;

  public listing : Listing;

  constructor(
    private activatedRoute : ActivatedRoute,
    private listingController : ListingController,
    private listingInformationService : ListingInformationService
  ) {
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
    console.log('abcdef')
    this.listing = this.activatedRoute.snapshot.data['listing'];
    console.log(this.activatedRoute.snapshot)
    // this.listingComponentType = this.listingDescriptorHandler.getListingComponentTypeFromListingType(this.listing.type);
  }

  ngOnInit() : void {
    this.listingController.getListing(this.activatedRoute.snapshot.params['id'])
    .subscribe((listing : Listing) => {
      console.log(listing, 'listing');
      this.listing = listing;
      this.listingComponentType = this.listingDescriptorHandler.getListingComponentTypeFromListingType(listing.type);
    }, (error : Error) => {
      console.error(error);
    }, () => {
      console.log('get request finished')
    })
  }

}
