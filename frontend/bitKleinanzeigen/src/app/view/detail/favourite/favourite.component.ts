import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';
import { UserService } from '../../../model/user/user.service';
import { ListingController } from '../../../model/listings/listing/listing.controller';
import { Listing } from '../../../model/listings/listing/listing.model';

import { MessageService, Message } from '../../../shared/message.service';

@Component({
  selector: 'view-detail-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: [ './favourite.component.css' ]
})
export class FavouriteDetailViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  public favouriteStatus : string = '';


  constructor(
    private detailViewService : DetailViewService,
    private userService : UserService,
    private messageService : MessageService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      if (this.userService.isFavourite(this.model.id)) {
        this.favouriteStatus = 'active';
      }
    });
    this.messageService.getObservable().subscribe((message : Message) => { // check if the listing was followed or unfollowed in the detail view
      if (message.message === 'favourite-toogle-off') {
        if (message.payload.id === this.model.id) {
          this.favouriteStatus = '';
        }
      } else if (message.message === 'favourite-toogle-on') {
        if (message.payload.id === this.model.id) {
          this.favouriteStatus = 'active';
        }
      }
    });
  }

  public toggleFavourite() : void {
    if (this.userService.isFavourite(this.model.id)) {
      this.userService.removeFavourite(this.model.id).subscribe(() => {
        this.favouriteStatus = '';
        this.messageService.sendMessage({
          message: 'favourite-toogle-off',
          payload: this.model
        });
      });
    } else {
      this.userService.addFavourite(this.model.id).subscribe(() => {
        this.favouriteStatus = 'active';
        this.messageService.sendMessage({
          message: 'favourite-toogle-on',
          payload: this.model
        });
      });
    }
  }

}
