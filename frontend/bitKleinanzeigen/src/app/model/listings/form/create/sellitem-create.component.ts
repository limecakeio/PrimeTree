import { Component } from '@angular/core';
import { SellItem } from '../../sellitem/sellitem.model';
import { FormGroup } from '@angular/forms';
import { FormElementsService } from '../../../../formElements/formElements.service';
import { ListingController } from '../../network/listing.controller';
import { Response } from '@angular/http';
import { ListingReposetory } from '../../listing.reposetory';
import { Router } from '@angular/router';
import { SecurityModel } from '../../../../security/security.model';

@Component({
  selector: 'form-create-sellitem',
  templateUrl: './sellitem-create.component.html',
  // styleUrls: [ '../global.form.css' ],
  providers: [ FormElementsService ]
})
export class SellItemCreateFormComponent {
  form : FormGroup;
  listing : SellItem;

  constructor(private service : FormElementsService,
    private listingNetworkService : ListingController,
    private repo : ListingReposetory,
    private router : Router,
    private securityModel : SecurityModel) {
    this.service.form = new FormGroup({});
    this.service.model = new SellItem();
    this.form = this.service.form;
    this.listing = this.service.model;
    this.listing.owner = this.securityModel.username;
  }

  submit() {
    if (this.form.valid) {
      console.log('sellitem create form');
      this.listingNetworkService.postListing('SellItem', this.listing, [this.listing.imageObj]).subscribe(res => {
        // console.log(res);
        let num : any = res;
        this.listing.id = num;
        // this.listingNetworkService.postImage(5, this.listing.imageObj).subscribe(res => {
          // console.log(res);
        // });
        // this.listingNetworkService.getAll().subscribe((response : Response) => {
        //   console.log(response.json());
        // });
        this.repo.addListing(this.listing);
        this.router.navigate(['home']);
      });
    }
  }
}
