import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { FormContextService } from '../../../../form/form-context.service';
import { LocationProperty } from '../../../../form/elements/location/location.component';

@Component({
  selector: 'rideshare-request-form',
  templateUrl: './rideshare-request-form.component.html',
  styleUrls: [ './rideshare-request-form.component.css' ],
  providers: [
    FormContextService
  ]
})
export class RideshareRequestFormComponent extends ListingFormComponent {

  form : FormGroup;

  public data : any;

  public model : any;

  public fromLocation : LocationProperty = {
    property: 'fromLocation',
    display: 'Startort'
  };

  public toLocation : LocationProperty = {
    property: 'toLocation',
    display: 'Zielort'
  }


  constructor(
    public formContextService : FormContextService
  ) {
    super(formContextService);
    this.model = this.listing;
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.model = this.formContextService.model;
  }

  submit() : void {
    this.emitListing();
  }

}
