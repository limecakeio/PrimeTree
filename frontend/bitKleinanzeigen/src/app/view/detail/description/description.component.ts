import { Component } from '@angular/core';

import { Comment } from '../../../model/listings/listing/comment.model';
import { DetailViewService } from '../detail.service';
import { ListingController } from '../../../model/listings/listing/listing.controller';
import { Listing } from '../../../model/listings/listing/listing.model';

@Component({
  selector: 'view-detail-description',
  templateUrl: './description.component.html',
  styleUrls: [ './description.component.css' ]
})
export class DescriptionDetailViewComponent {

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService,
    private listingController : ListingController
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      this.isDataAvailable = true;
    });
  }

  public removeComment(commentID : number) : void {
    this.listingController.removeComment(this.model.id, commentID).subscribe(() => {
      this.model.comments.splice(commentID - 1, 1);
    });
  }

// TODO: Decide whether the comment is created in a form or something else
// TODO: Change this method after the decision is made
// IDEA: Change the rest interface that POST: /listing/:id/comment returns the newly created comment
  public addCommment() : void {
    this.listingController.createComment(this.model.id, 'Testkommentar').subscribe(() => {
      this.listingController.getListing(this.model.id).subscribe((listing : Listing) => {
        this.model.comments = listing.comments;
      });
    });
  }

}
