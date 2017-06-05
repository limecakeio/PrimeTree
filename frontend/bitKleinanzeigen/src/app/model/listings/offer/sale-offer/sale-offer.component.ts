import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { SaleOffer } from './sale-offer.model';

import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';

@Component({
  selector: 'listing-detail-view-sale-offer',
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
