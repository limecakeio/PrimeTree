import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from '../../../../form/forms.service';
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
    private formService : FormService
  ) {

  }


  /** Emits the listing to the parent component where the data is proceeded and submited
   * The callback function will be called after the listing was submitted to send additional information to the rest server.
   * A callback function disables the automtical redirect to the home view after submiting the listing.
   * Please use updateRepository() for a later redirect.*/
  protected emitListing(callback? : (id : number) => void) : void {
    let listingFormEventModel : ListingFormEventModel
    if (callback) {
      listingFormEventModel = {
        model : this.model,
        updateRepository : true
      };
    } else {
      listingFormEventModel = {
        model : this.model,
        updateRepository : false,
        callback : callback
      };
    }
    this.listingFormCreateFinished.emit(listingFormEventModel);
  }

  /** Calls the update method of the listing repository. Closes this view and does a route change. */
  protected updateRepository() : void {
    this.listingFormUpdateRepositoryOutput.emit();
  }

}
