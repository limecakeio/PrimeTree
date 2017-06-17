import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { FormContextService } from '../../../../form/form-context.service';

import { ListingsImageController } from '../../listings-image.controller';

import { DateProperty } from '../../../../form/elements/date/date.component';

@Component({
  selector: 'borrow-request-form',
  templateUrl: './borrow-request-form.component.html',
  providers: [
    FormContextService,
    ListingsImageController
  ],
  outputs: [
    'listingcreated'
  ]
})
export class BorrowRequestFormComponent extends ListingFormComponent {

  form : FormGroup;

  public data : any;

  public model : any;

  public borrowFromDate : DateProperty = {
    name: 'borrowFromDate',
    display: 'Ausleihdatum'
  };

  public borrowToDate : DateProperty = {
    name: 'borrowToDate',
    display: 'Rückgabedatum'
  };

  constructor(
    public formContextService : FormContextService,
    private listingsImageController : ListingsImageController
  ) {
    super(formContextService);
    this.model = this.listing;
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.model = this.formContextService.model;
  }

  submit() : void {
    this.emitListing((id : number) => {
      if (this.data.imageAsFile) { // mainImage is not required
        this.listingsImageController.listingMainImageUpload(id, this.data.imageAsFile, this.data.imageFileType).subscribe(() => {
          this.updateRepositoryAfter();
        }, (error : Error) => {
          console.error(error);
        });
      } else {
        this.updateRepositoryAfter();
      }
    });
  }

}
