import {
  Component,
  ViewChild
} from '@angular/core';

import { PreviewService } from '../preview.service';
import { UserService } from '../../../model/user/user.service';
import { UserController } from '../../../model/user/user.controller';

import { MessageService, Message } from '../../../shared/message.service';

@Component({
  selector: 'view-preview-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: [ './favourite.component.css' ]
})
export class FavouritePreviewViewComponent {

  public model : any;

  public favouriteStatus : string = '';
  public favouriteHoverTitle : string = 'Inserat favorisieren.';


  constructor(
    private previewService : PreviewService,
    private userService : UserService,
    private userController : UserController,
    private messageService : MessageService
  ) {
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.model = model;
      if (this.userService.isFavourite(this.model.id)) {
        this.favouriteStatus = 'active';
        this.favouriteHoverTitle = 'Inserat unfavorisieren.';
      }
    });
  }

  public toggleFavourite() : void {
    if (this.userService.isFavourite(this.model.id)) {
      this.userService.removeFavourite(this.model.id).subscribe(() => {
        this.favouriteStatus = '';
        this.favouriteHoverTitle = 'Inserat favorisieren.';
      });
      this.messageService.sendMessage({
        message: 'favourite-toogle-on',
        payload: this.model.id
      });
    } else {
      this.userService.addFavourite(this.model.id).subscribe(() => {
        this.favouriteStatus = 'active';
        this.favouriteHoverTitle = 'Inserat unfavorisieren.';
      });
      this.messageService.sendMessage({
        message: 'favourite-toogle-off',
        payload: this.model.id
      });
    }
  }

}
