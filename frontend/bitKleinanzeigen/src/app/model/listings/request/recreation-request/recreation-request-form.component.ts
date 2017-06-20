import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { FormContextService } from '../../../../form/form-context.service';

import { DateAndTimeProperty } from '../../../../form/elements/date-and-time/date-and-time.component';
import { ListingsImageController } from '../../listings-image.controller';

@Component({
  selector: 'recreation-request-form',
  templateUrl: './recreation-request-form.component.html',
  styleUrls: [ './recreation-request-form.component.css' ],
  providers: [
    FormContextService,
    ListingsImageController
  ]
})
export class RecreationRequestFormComponent extends ListingFormComponent {

  form : FormGroup;

  public data : any;

  public model : any;

  public startDateAndTime : DateAndTimeProperty = {
    name: 'startDateAndTime',
    displayText: 'Beginndatum'
  };

  public endDateAndTime : DateAndTimeProperty = {
    name: 'endDateAndTime',
    displayText: 'Enddatum'
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
