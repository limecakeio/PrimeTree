import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../../form/forms.service';
import { ListingFormEventModel } from './listing-create.component';

@Component({
  selector: 'listing-create-form',
  templateUrl: './listing-create-form.component.html'
  // styleUrls: [ './listing-create-form.component.css' ]
  , providers: [
    FormService
  ],
  outputs: [
    'listingFormCreateFinished'
  ]
})
export class ListingCreateFormComponent {

  @Output('listingFormCreateFinished') listingFormCreateFinished : EventEmitter<ListingFormEventModel> = new EventEmitter<ListingFormEventModel>();

  @Output() listingFormUpdateRepositoryOutput : EventEmitter<void> = new EventEmitter<void>();

  public form : FormGroup;

  public model : any;

  public data : any;

  protected listingType : string;

  @Input() userLocation : string;

  constructor(
    // listingType : string,
    private formService : FormService
  ) {
    // this.listingType = listingType;
  }

  protected submitListing(updateRepository : boolean, callback? : (id : number) => void) : void {
    if (this.form.valid) {
      this.model.createDate = new Date().getTime();
      this.model.type = this.listingType;
      this.model.isActive = true;
      this.model.expiryDate = null;
      this.model.condition = 'bad';
      let outputEmitObject : ListingFormEventModel = {
        model : this.model,
        updateRepository : updateRepository
      };
      if (callback) {
        outputEmitObject.callback = callback;
      }
      this.listingFormCreateFinished.emit(outputEmitObject);
    }
  }

  protected updateRepository() : void {
    this.listingFormUpdateRepositoryOutput.emit();
  }

}
