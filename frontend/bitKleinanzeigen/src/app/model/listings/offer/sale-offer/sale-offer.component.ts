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

import { EMail } from '../../../../view/detail/call-to-action/call-to-action.component';

@Component({
  selector: 'listing-detail-view-sale-offer',
  templateUrl: './sale-offer.component.html',
  styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  // styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})

export class SaleOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : SaleOffer;
  isOwner : boolean = false;
  listingIcon : string = "listing-sell";
  //TODO Insert a callToAction String to be used throughout the listings like the listingIcon
  image : SafeStyle;

  public eMail : EMail = {
    subject: '',
    body: ''
  };

  constructor(
    private detailViewService : DetailViewService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
    this.eMail.subject = 'Kaufanfrage für ' + this.listing.title;
    this.eMail.body = 'Hallo ich möchte kaufen!';
  }
}
