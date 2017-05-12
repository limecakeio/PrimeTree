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
    this.listing.creator = this.securityModel.username;
  }

  submit() {
    if (this.form.valid) {
      this.listingNetworkService.postListing({}).subscribe((id : number) => {

        this.repo.addListing(this.listing);
        this.router.navigate(['home']);
      }, (error : Error) => {
        console.log(error.message);
      });
    }
  }
}
