import { Component } from '@angular/core';

import { ListingController } from '../listing.controller';
import { ListingRequest } from '../listing.request';
import { ListingRepository } from '../listing.repository';
import { FormService } from '../../../../form/forms.service';

interface FilterCriteria {
  location : string[];
  type : string[];
  kind : string;
  price_min : number;
  price_max : number;
}

@Component({
  selector: 'listing-filter',
  templateUrl: './filter.component.html',
  styleUrls: [ './filter.component.css' ],
  providers: [
    FormService
  ]
})
export class ListingFilterComponent {

  public price_min : number;

  public price_max : number;

  public model : FilterCriteria = {
    location : [],
    kind : '',
    price_max : 0,
    price_min: 0,
    type : []
  }

  private listingRequest : ListingRequest;

  constructor(
    private formService : FormService,
    private listingController : ListingController,
    private listingRepository : ListingRepository
  ) {
     this.listingRequest = this.listingController.listingRequest();
     this.formService.model = this.model;
  }

  public filterChanged() : void {
    console.log('listingRepository.update faked', this.model);
  }

}
