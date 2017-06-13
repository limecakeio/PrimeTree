import {
  Component,
  Type,
  Input,
  OnInit,
  Output,
  EventEmitter,
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

@Component({
  selector: 'listing-detail-view',
  templateUrl: './listing-detail-view.component.html',
  styleUrls: [ './listing-detail-view.component.css' ]
})
export class ListingDetailViewComponent implements OnInit, OnChanges {

  @Input() listingID : number = 0;

  @Output() closeOverlay : EventEmitter<void> = new EventEmitter<void>();

  public listingDescriptorHandler : ListingDescriptorHandler;

  public listingComponentType : Type<ListingComponent>;

  public listing : Listing;

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

  ngOnInit() : void {
    // if (this.listingID >= 0) {
    //   this.setListingAndLisitingType(this.listingID);
    // } else {
    //   this.setListingAndLisitingType(this.activatedRoute.snapshot.params['id']);
    // }
  }

  public hideOverlay() : void {
    // this.closeOverlay.emit();
  }

  private setListingAndLisitingType(listingID : number) {
    this.listingController.getListing(listingID)
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
