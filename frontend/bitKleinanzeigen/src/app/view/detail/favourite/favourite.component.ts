import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';
import { UserService } from '../../../model/user/user.service';
import { ListingController } from '../../../model/listings/listing/listing.controller';
import { Listing } from '../../../model/listings/listing/listing.model';

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
    private userService : UserService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      if (this.userService.isFavourite(this.model.id)) {
        this.favouriteStatus = 'active';
      }
    });
  }

  public toggleFavourite() : void {
    if (this.userService.isFavourite(this.model.id)) {
      this.userService.removeFavourite(this.model.id).subscribe(() => {
        this.favouriteStatus = '';
      });
    } else {
      this.userService.addFavourite(this.model.id).subscribe(() => {
        this.favouriteStatus = 'active';
      });
    }
  }

}
