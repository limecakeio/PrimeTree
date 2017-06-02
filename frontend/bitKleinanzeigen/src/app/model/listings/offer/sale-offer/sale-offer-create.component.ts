import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingCreateFormComponent } from '../../listing/listing-create-form.component';

import { FormService } from '../../../../form/forms.service';
import { SaleOffer } from './sale-offer.model';

@Component({
  selector: 'sale-offer-create',
  templateUrl: './sale-offer-create.component.html',
  providers: [
    FormService
  ],
  outputs: [
    'listingcreated'
  ]
})
export class SaleOfferCreateFormComponent extends ListingCreateFormComponent{

  form : FormGroup;


  constructor(
    private service : FormService,
  ) {
    super(service);
    this.service.form = new FormGroup({});
    this.service.model = new SaleOffer();
    this.service.data = {};
    this.data = this.service.data;
    this.form = this.service.form;
    this.model = this.service.model;
  }

  submit() : void {
    this.submitListing(false, (id : number) => {
      console.log('id SaleOffer', id);
      this.updateRepository();
    });


  }
}
