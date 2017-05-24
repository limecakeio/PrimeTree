import { Component, Input, OnInit } from '@angular/core';
import { SellItem } from './sellitem.model';
import { ListingController } from '../network/listing.controller';
import { ListingReposetory } from '../listing.reposetory';
import { SecurityModel } from '../../../security/security.model';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'sellitem',
  templateUrl: './sellitem.component.html',
  styleUrls: ['./sellitem.component.css']
})
export class SellItemComponent implements OnInit {

  @Input() listing : SellItem;

  isOwner : boolean = false;
  imagesrc : SafeUrl = null;
  image : SafeStyle;

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
      this.repo.update();
      console.log(error.message);
    }, () => {

    });
  }

  ngOnInit() {
    console.log(this.listing.creator === this.securityModel.username);
    console.log(this.listing.mainImage);
    if (this.listing.mainImage) {
      this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + 'http://141.19.145.175:8080/' + this.listing.mainImage + ')');
    }
    if (this.listing.creator === this.securityModel.username) {
      this.isOwner = true;
      // console.log(this.listing);
      // // this.listing.mainImage = this.domSanitizer.bypassSecurityTrustUrl(this.mainImage);
      // let image : HTMLImageElement = <HTMLImageElement> document.createElement('image');
      // // image.src = this.listing.mainImage;
      // image.src = <string> this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
      // image.onload = () => {
      //
      // };
      // this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
      // let container : Element = document.querySelector('#image-container');
      // console.log(container);
      // if (container) {
      //   console.log('image onload');
      //   container.appendChild(image);
      // }
      // this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
      // this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + 'http://141.19.145.175' + this.listing.mainImage + ')');
      // this.image = this.domSanitizer.bypassSecurityTrustStyle('url(' + 'http://localhhost:3000/' + this.listing.mainImage + ')');
    }
  }

}
