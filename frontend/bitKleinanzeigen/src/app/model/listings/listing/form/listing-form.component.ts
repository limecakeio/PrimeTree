import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';


import { FormContextService } from '../../../../form/form-context.service';
import { Listing } from '../listing.model';

/** */
export interface ListingSubmit {
  model : any;
  callback?: (listingID : number) => void
}

export enum ListingFormState {
  CREATE, EDIT
}

@Component({
  selector: 'listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: [ './listing-form.component.css' ],
  providers: [
    FormContextService
  ]
})
export class ListingFormComponent implements OnChanges, OnInit {

  @Output() listingSubmit : EventEmitter<ListingSubmit> = new EventEmitter<ListingSubmit>();

  @Output() updateRepository : EventEmitter<void> = new EventEmitter<void>();

  @Output('closeForm') closeFormEvent : EventEmitter<void> = new EventEmitter<void>();

  @Output() returnFormEvent : EventEmitter<void> = new EventEmitter<void>();

  @Input() listing : Listing;

  @Input() formState : ListingFormState;

  public formStateText : string;

  constructor(
    public formContextService : FormContextService
  ) {

  }

  /** Emits the listing to the parent component where the data is proceeded and submited
   * The callback function will be called after the listing was submitted to send additional information to the rest server.
   * A callback function disables the automtical redirect to the home view after submiting the listing.
   * Please use updateRepository() for a later redirect.*/
  protected emitListing(callback? : (id : number) => void) : void {
    this.listingSubmit.emit({
      model: this.formContextService.model,
      callback: callback
    });
    this.formContextService.form.reset();
  }

  /** Calls the update method of the listing repository.*/
  protected updateRepositoryAfter() : void {
    this.updateRepository.emit();
  }

  public ngOnChanges(simpleChanges : SimpleChanges) : void {
    // if (this.listing) {
    //   this.formContextService.putIntoContext(this.listing);
    // }
  }

  public ngOnInit() : void {
    this.formContextService.putIntoContext(this.listing);
    if (this.formState === ListingFormState.CREATE) {
      this.formStateText = 'erstellen';
    } else if (this.formState === ListingFormState.EDIT){
      this.formStateText = 'editieren'
    }
  }

  public closeForm() : void {
    this.closeFormEvent.emit();
  }

  public returnForm() : void {
    this.returnFormEvent.emit();
  }

}
