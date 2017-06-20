import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from '@angular/platform-browser';

import { PurchaseRequest } from './purchase-request.model';
import { UserService } from '../../../user/user';
import { ListingComponent } from '../../listing/detail/listing.component';
import { DetailViewService } from '../../../../view/detail/detail.service';

import { EMail } from '../../../../view/detail/call-to-action/call-to-action.component';

import { Employee } from '../../../user/employee.model';
import { UserController } from '../../../user/user.controller';

@Component({
  selector: 'listing-detail-view-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['../../../listing/detail/listing-detail-view.component.css'], // JIT
  // styleUrls: ['../../listing/detail/listing-detail-view.component.css'], // AOT
  providers: [
    DetailViewService
  ]
})

export class PurchaseRequestComponent extends ListingComponent implements OnInit {

  @Input() listing : PurchaseRequest;
  isOwner : boolean = false;
  listingIcon : string = "listing-sell";
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
      this.eMail.subject = 'Kaufsanfrage für ' + this.listing.id;
      this.eMail.body = 'Hallo ' + employee.firstName + ',%0Aich habe Interesse an dein Inserat (' + this.listing.title + ') und möchte es dir gerne verkaufen.%0A%0AMit freundlichen Grüßen%0A' + this.userService.userInformation.firstName + ' ' + this.userService.userInformation.lastName;
    });
  }
}
