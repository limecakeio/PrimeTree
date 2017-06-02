import { Component, Input, OnInit } from '@angular/core';
import { SaleOffer } from './sale-offer.model';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { ListingController } from '../../network/listing.controller';
import { UserService } from '../../../user/user';
import { ListingReposetory } from '../../listing.reposetory';
import { ListingComponent } from '../../listing/listing.component';

@Component({
  selector: 'saleoffer',
  templateUrl: './sale-offer.component.html'
})
export class SaleOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : SaleOffer;

  isOwner : boolean = false;
  image : SafeStyle;

  constructor(

  ) {
    super();
  }



  ngOnInit() {

  }
}
