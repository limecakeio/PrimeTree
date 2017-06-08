import { Component } from '@angular/core';

import { PreviewService } from '../preview.service';
import { UserService } from '../../../model/user/user.service';

@Component({
  selector: 'view-preview-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: [ './favourite.component.css' ]
})
export class FavouritePreviewViewComponent {

  public model : any;

// TODO: Write user method to check whether the listing is a favourite.
  public isFavourite : boolean;

  constructor(
    private previewService : PreviewService,
    private userService : UserService
  ) {
    console.log(this.userService)
    this.previewService.getModelObservable().subscribe((model : any) => {
      this.model = model;
    });
  }

}
