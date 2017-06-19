import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { RideShareOffer } from './rideshare-offer.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

import { EMail } from '../../../../view/detail/call-to-action/call-to-action.component';
import { DateService } from '../../../../shared/date.service';

@Component({
  selector: 'listing-detail-view-rideshare-offer',
  templateUrl: './rideshare-offer.component.html',
  styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  // styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})

export class RideShareOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : RideShareOffer;

  isOwner : boolean = false;
  listingIcon : string = "listing-rideshare";

  public eMail : EMail = {
    subject: '',
    body: ''
  };

  constructor(
    private detailViewService : DetailViewService,
    public dateService : DateService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
    this.eMail.subject = 'Mitfahrgelegenheit ' + this.listing.title + ' am ' + this.dateService.dateFromUnixTime(this.listing.travelDateAndTime) + ' um ' + this.dateService.timeFromUnixTime(this.listing.travelDateAndTime);
    this.eMail.body = 'Hallo ich möchte mitfahren!';
  }
}
