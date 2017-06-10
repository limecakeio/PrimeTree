import {
  Component,
  ViewChild
} from '@angular/core';

import { PreviewService } from '../preview.service';
import { UserService } from '../../../model/user/user.service';
import { UserController } from '../../../model/user/user.controller';

@Component({
  selector: 'view-preview-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: [ './favourite.component.css' ]
})
export class FavouritePreviewViewComponent {

  public model : any;

// TODO: Write user method to check whether the listing is a favourite.
  public favouriteStatus : string = '';


  constructor(
    private previewService : PreviewService,
    private userService : UserService,
    private userController : UserController
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
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
