import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { RecreationRequest } from './recreation-request.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

import { DateAndTimeProperty } from '../../../../view/detail/date-and-time/date-and-time.component';

@Component({
  selector: 'listing-detail-view-recreation-request',
  templateUrl: './recreation-request.component.html',
  styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  // styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})
export class RecreationRequestComponent extends ListingComponent implements OnInit {

  @Input() listing : RecreationRequest;
  isOwner : boolean = false;
  listingIcon : string = "listing-sell";
  //TODO Insert a callToAction String to be used throughout the listings like the listingIcon
  image : SafeStyle;

  public startDateAndTime : DateAndTimeProperty = {
    name: 'startDateAndTime',
    displayText: 'Startdatum'
  };

  public endDateAndTime : DateAndTimeProperty = {
    name: 'endDateAndTime',
    displayText: 'Endzeit'
  };

  constructor(
    private detailViewService : DetailViewService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
  }
}
