import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { ServiceOffer } from './service-offer.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

import { EMail } from '../../../../view/detail/call-to-action/call-to-action.component';

import { Employee } from '../../../user/employee.model';
import { UserController } from '../../../user/user.controller';

@Component({
  selector: 'listing-detail-view-service-offer',
  templateUrl: './service-offer.component.html',
  styleUrls: [ '../../../listing/detail/listing-detail-view.component.css' ], // JIT
  // styleUrls: [ '../../listing/detail/listing-detail-view.component.css' ], // AOT
  providers: [
    DetailViewService
  ]
})

export class ServiceOfferComponent extends ListingComponent implements OnInit {

  @Input() listing : ServiceOffer;
  isOwner : boolean = false;
  listingIcon : string = "listing-service";
  //TODO Insert a callToAction String to be used throughout the listings like the listingIcon
  image : SafeStyle;

  public eMail : EMail = {
    subject: '',
    body: ''
  };

  constructor(
    private detailViewService : DetailViewService,
    private userController : UserController,
    private userService : UserService
  ) {
    super();
  }

  ngOnInit() {
    this.detailViewService.sendModelToSubscribers(this.listing);
    this.userController.getUser(this.listing.creatorID).subscribe((employee : Employee) => {
      this.eMail.subject = 'Dienstanfrage für ' + this.listing.title;
      this.eMail.body = 'Hallo ' + employee.firstName + ',%0Aich möchte deine ' + this.listing.title + ' in Anspruch nehmen.%0A%0AMit freundlichen Grüßen%0A' + this.userService.userInformation.firstName + ' ' + this.userService.userInformation.lastName;
    })
  }
}
