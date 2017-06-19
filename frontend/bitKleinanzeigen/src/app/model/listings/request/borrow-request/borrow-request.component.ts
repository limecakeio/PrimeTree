import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { BorrowRequest } from './borrow-request.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

import { BorrowDate } from '../../../../view/detail/borrow-date/borrow-date.component';

@Component({
  selector: 'listing-detail-view-borrow-request',
  templateUrl: './borrow-request.component.html',
  styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  // styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})

export class BorrowRequestComponent extends ListingComponent implements OnInit {

  @Input() listing : BorrowRequest;
  isOwner : boolean = false;
  listingIcon : string = "listing-sell";
  //TODO Insert a callToAction String to be used throughout the listings like the listingIcon
  image : SafeStyle;

  public borrowFromDate : BorrowDate = {
    propertyName : 'borrowFromDate',
    displayText: 'Von: ',
    displayIcon: 'listing-request'
  }

  public borrowToDate : BorrowDate = {
    propertyName : 'borrowToDate',
    displayText: 'Bis: ',
    displayIcon: 'listing-offer'
  }

  constructor(
    private detailViewService : DetailViewService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
  }
}
