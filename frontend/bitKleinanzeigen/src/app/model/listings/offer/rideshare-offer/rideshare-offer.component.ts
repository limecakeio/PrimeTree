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
import { Employee } from '../../../user/employee.model';

import { UserController } from '../../../user/user.controller';

import { EMail } from '../../../../view/detail/call-to-action/call-to-action.component';
import { DateService } from '../../../../shared/date.service';

@Component({
  selector: 'listing-detail-view-rideshare-offer',
  templateUrl: './rideshare-offer.component.html',
  // styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})

export class RideShareOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : RideShareOffer;

  isOwner : boolean = false;
  listingIcon : string = "listing-rideshare";

  public eMail : EMail;

  constructor(
    private detailViewService : DetailViewService,
    public dateService : DateService,
    private userController : UserController,
    private userService : UserService
  ) {
    super();
  }

  ngOnInit() {
    this.userController.getUser(this.listing.creatorID).subscribe((employee : Employee) => {
      this.eMail = {
        subject : 'Anfrage für die Mitfahrgelegenheit von ' + this.listing.toLocation + ' bis ' + this.listing.fromLocation +  ' am ' + this.dateService.dateFromUnixTime(this.listing.travelDateAndTime) + ' um ' + this.dateService.timeFromUnixTime(this.listing.travelDateAndTime),
        body : 'Hallo, ' + employee.firstName + ',%0Aich würde gerne bei Dir mitfahren.%0AMit freundlichen Grüßen%0A%0A' + this.userService.userInformation.firstName + ' ' + this.userService.userInformation.lastName
      }
    });
    this.detailViewService.sendModelToSubscribers(this.listing);
  }
}
