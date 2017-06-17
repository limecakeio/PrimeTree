import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Comment } from '../../../model/listings/listing/comment.model';
import { DetailViewService } from '../detail.service';
import { ListingController } from '../../../model/listings/listing/listing.controller';
import { Listing } from '../../../model/listings/listing/listing.model';
import { UserService } from '../../../model/user/user.service';
import { NetworkService } from '../../../network/network.service';

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
    public userService : UserService,
    private networkService : NetworkService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.isDataAvailable = true;
      this.model = model;
      this.model.comments.forEach((comment : any) => {
          if (comment.userImage.indexOf('http') === -1) {
            comment.userImage = this.networkService.getServerAddress() + comment.userImage;
          }
      });
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
        this.model.comments.forEach((comment : any) => {
            if (comment.userImage.indexOf('http') === -1) {
              comment.userImage = this.networkService.getServerAddress() + comment.userImage;
            }
        });
      });
    });
  }

  /**Returns a time string formatted as date.month.year um hours:minutes:seconds. */
  public getTimeFromUnixTime(unixTime : number) : string {
    let time : string = '';
    let date : Date = new Date(unixTime);
    let dateOfMonth : number = date.getDate();
    time += (dateOfMonth < 10) ? '0' + dateOfMonth : dateOfMonth;
    time += '.';
    let month : number = date.getMonth();
    time += (month < 10) ? '0' + month : month;
    time += '.';
    let year : number = date.getFullYear();
    time += year + ' um ';
    let hours : number = date.getHours();
    time += (hours < 10) ? '0' + hours : hours;
    time += ':';
    let minutes : number = date.getMinutes();
    time += (minutes < 10) ? '0' + minutes : minutes;
    time += ':';
    let seconds : number = date.getSeconds();
    time += (seconds < 10) ? '0' + seconds : seconds;
    return time;
  }

}
