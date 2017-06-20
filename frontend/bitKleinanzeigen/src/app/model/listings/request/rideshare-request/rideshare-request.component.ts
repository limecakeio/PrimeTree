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

import { EMail } from '../../../../view/detail/call-to-action/call-to-action.component';

import { Employee } from '../../../user/employee.model';
import { UserController } from '../../../user/user.controller';

import { DateService } from '../../../../shared/date.service';

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

  public eMail : EMail = {
    subject: '',
    body: ''
  };

  constructor(
    private detailViewService : DetailViewService,
    private userController : UserController,
    private userService : UserService,
    private dateService : DateService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
    this.userController.getUser(this.listing.creatorID).subscribe((employee : Employee) => {
      this.eMail.subject = 'Fahrt von ' + this.listing.fromLocation + ' nach ' + this.listing.toLocation + ' am ' + this.dateService.fullDateFromUnixTime(this.listing.travelDateAndTime, ' um ');
      this.eMail.body = 'Hallo ' + employee.firstName + ',%0Aich ich fahre die Route (' + this.listing.title + ') und biete dir dich mitzunehmen.%0A%0AMit freundlichen Grüßen%0A' + this.userService.userInformation.firstName + ' ' + this.userService.userInformation.lastName;
    });
  }
}
