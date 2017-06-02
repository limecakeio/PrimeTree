import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingCreateFormComponent } from '../../listing/listing-create-form.component';

import { FormService } from '../../../../form/forms.service';
import { ServiceOffer } from './service-offer.model';

@Component({
  selector: 'service-offer-create',
  templateUrl: './service-offer-create-form.component.html',
  providers: [
    FormService
  ]
})
export class ServiceOfferCreateFormComponent extends ListingCreateFormComponent {

  constructor(
    private service : FormService,
  ) {
    super(service);
    this.service.form = new FormGroup({});
    this.service.model = new ServiceOffer();
    this.service.data = {};
    this.data = this.service.data;
    this.form = this.service.form;
    this.model = this.service.model;
  }

  submit() : void {
    super.submitListing(false, (id : number) => {
      console.log('ServiceOffer', id);
    });
  }
}
