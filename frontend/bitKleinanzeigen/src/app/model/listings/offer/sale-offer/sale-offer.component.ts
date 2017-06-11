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

import { DetailViewService } from '../../../../view/detail/detail.service';

@Component({
  selector: 'listing-detail-view-sale-offer',
  templateUrl: './sale-offer.component.html',
  providers: [
    DetailViewService
  ]
})
export class SaleOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : SaleOffer;

  isOwner : boolean = false;
  image : SafeStyle;

  constructor(
    private detailViewService : DetailViewService
  ) {
    super();
  }



  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
  }
}
