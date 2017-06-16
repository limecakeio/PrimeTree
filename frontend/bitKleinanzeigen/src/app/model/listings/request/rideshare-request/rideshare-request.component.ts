import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { RideShareRequest } from './rideshare-request.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

@Component({
  selector: 'listing-detail-view-rideshare-request',
  templateUrl: './rideshare-request.component.html',
  styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  // styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})

export class RideShareRequestComponent extends ListingComponent implements OnInit {

  @Input() listing : RideShareRequest;

  isOwner : boolean = false;
  listingIcon : string = "listing-rideshare";

  constructor(
    private detailViewService : DetailViewService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
  }
}
