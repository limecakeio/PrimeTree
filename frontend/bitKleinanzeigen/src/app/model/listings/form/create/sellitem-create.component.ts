import { Component } from '@angular/core';
import { SellItem } from '../../sellItem/sellItem.model';
import { FormGroup } from '@angular/forms';
import { FormElementsService } from '../../../../formElements/formElements.service';
import { ListingController } from '../../network/listing.controller';

@Component({
  selector: 'form-create-sellitem',
  templateUrl: 'sellitem-create.component.html',
  styleUrls: [ '../global.form.css' ],
  providers: [ FormElementsService ]
})
export class SellItemCreateFormComponent {
  form : FormGroup;
  listing : SellItem;

  constructor(private service : FormElementsService, private listingNetworkService : ListingController) {
    this.service.form = new FormGroup({});
    this.service.model = new SellItem();
    this.form = this.service.form;
    this.listing = this.service.model;
  }

  submit() {
    if (this.form.valid) {
      console.log('sellitem create form');
      this.listingNetworkService.postListing('SellItem', this.listing);
    }
  }
}
