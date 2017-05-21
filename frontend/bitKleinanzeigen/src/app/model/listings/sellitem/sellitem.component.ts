import { Component, Input, OnInit } from '@angular/core';
import { SellItem } from './sellitem.model';
import { ListingController } from '../network/listing.controller';
import { ListingReposetory } from '../listing.reposetory';
import { SecurityModel } from '../../../security/security.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'sellitem',
  templateUrl: './sellitem.component.html',
  styleUrls: ['./sellitem.component.css']
})
export class SellItemComponent implements OnInit {

  @Input() listing : SellItem;

  isOwner : boolean = false;
  imagesrc : SafeUrl;

  constructor(private listingController : ListingController,
    private repo : ListingReposetory,
    private securityModel : SecurityModel,
    private domSanitizer : DomSanitizer
  ) {

  }

  remove() : void {
    // this.repo.removeListing(this.listing.id);
    this.listingController.removeListing(this.listing.id).subscribe((removed : boolean) => {
      this.repo.update();
    }, (error : Error) => {
      console.log(error.message);
    }, () => {

    });
  }

  ngOnInit() {
    console.log(this.listing.creator === this.securityModel.username);
    if (this.listing.creator === this.securityModel.username) {
      this.isOwner = true;
      // console.log(this.listing);
      // this.listing.mainImage = this.domSanitizer.bypassSecurityTrustUrl(this.mainImage);
      // this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
    }
  }

}
