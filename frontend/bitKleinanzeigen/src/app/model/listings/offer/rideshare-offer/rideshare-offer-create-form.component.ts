import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';

import { FormService } from '../../../../form/forms.service';
import { RideShareOffer } from './rideshare-offer.model';

@Component({
  selector: 'rideshare-offer-create',
  templateUrl: './rideshare-offer-create-form.component.html',
  providers: [
    FormService
  ]
})
export class RideShareOfferCreateFormComponent extends ListingCreateFormComponent {

  constructor(
    private service : FormService,
  ) {
    super(service);
    this.service.form = new FormGroup({});
    this.service.model = new RideShareOffer();
    this.service.data = {};
    this.data = this.service.data;
    this.form = this.service.form;
    this.model = this.service.model;
  }

  submit() : void {
    super.emitListing();
  }
}
