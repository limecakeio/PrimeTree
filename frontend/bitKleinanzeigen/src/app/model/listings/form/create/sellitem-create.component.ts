import { Component } from '@angular/core';
import { SellItem } from '../../sellitem/sellitem.model';
import { FormGroup } from '@angular/forms';
import { FormElementsService } from '../../../../formElements/formElements.service';
import { ListingController } from '../../network/listing.controller';
import { ListingReposetory } from '../../listing.reposetory';
import { Router } from '@angular/router';
import { SecurityModel } from '../../../../security/security.model';
import { Observable } from 'rxjs/Observable';
import { ListingCreateForm } from './listingCreateForm.model';

@Component({
  selector: 'form-create-sellitem',
  templateUrl: './sellitem-create.component.html',
  // styleUrls: [ '../global.form.css' ],
  providers: [ FormElementsService ]
})
export class SellItemCreateFormComponent {
  form : FormGroup;
  listing : any;
  data : any;

  constructor(private service : FormElementsService,
    private listingNetworkService : ListingController,
    private repo : ListingReposetory,
    private router : Router,
    private securityModel : SecurityModel) {
    this.service.form = new FormGroup({});
    this.service.model = {};
    this.form = this.service.form;
    this.listing = this.service.model;
    this.listing.creator = this.securityModel.username;
    this.data = this.service.data;
  }

  submit() {
    if (this.form.valid) {
      // console.log('sellitem-create');
      let date : Date = new Date();
      let listingRequestBody : any = {};
      listingRequestBody.title = this.listing.title;
      listingRequestBody.createDate = date.getTime();
      listingRequestBody.description = this.listing.description;
      listingRequestBody.expiryDate = null;
      listingRequestBody.location = 'mannheim';
      listingRequestBody.price = this.listing.price;
      listingRequestBody.type = 'SellItem';
      listingRequestBody.condition = 'bad';
      this.listingNetworkService.postListing(listingRequestBody).subscribe((id : number) => {

        if (typeof this.data.imageAsFile !== 'undefined') {
          this.listingNetworkService.putImage(id, this.data.imageAsFile).subscribe((response) => {
            console.log('image upload success', response);
            this.repo.update();
            this.router.navigate(['home']);
          }, (error : Error) => {
            console.log(error.message);
          }, () => {
            console.log('image upload finished');
          })
        } else {
          this.repo.update();
          this.router.navigate(['home']);
        }

        // this.repo.update();
        // this.router.navigate(['home']);
      }, (error : Error) => {
        console.log(error.message);
      });
    }
  }

  private byteToFile(byteArray : Uint8Array[]) : File {
    let file : File = new File(byteArray, (Math.random()*1000) +'.jpg', 'image/jpg');
    return file;
  }
}
