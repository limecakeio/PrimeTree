import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Comment } from '../../../model/listings/listing/comment.model';
import { DetailViewService } from '../detail.service';
import { ListingController } from '../../../model/listings/listing/listing.controller';
import { Listing } from '../../../model/listings/listing/listing.model';
import { UserService } from '../../../model/user/user.service';

@Component({
  selector: 'view-detail-description',
  templateUrl: './description.component.html',
  styleUrls: [ './description.component.css' ]
})
export class DescriptionDetailViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  public form : FormGroup = new FormGroup({});

  public commentText : string = '';

  constructor(
    private detailViewService : DetailViewService,
    private listingController : ListingController,
    public userService : UserService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      this.form.addControl('comment', new FormControl('comment', Validators.required));
    });
  }

  public removeComment(commentID : number) : void {
    this.listingController.removeComment(this.model.id, commentID).subscribe(() => {
      this.model.comments.splice(commentID - 1, 1);
    });
  }

  public addCommment() : void {
    this.listingController.createComment(this.model.id, this.commentText).subscribe(() => {
      this.commentText = '';
      this.listingController.getListing(this.model.id).subscribe((listing : Listing) => {
        this.model.comments = listing.comments;
      });
    });
  }

}
