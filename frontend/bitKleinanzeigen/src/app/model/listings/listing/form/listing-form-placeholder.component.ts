import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  SimpleChange,
  SimpleChanges,
  OnChanges,
  Output,
  Type,
  ViewContainerRef
} from '@angular/core';

import { ListingFormComponent, ListingSubmit, ListingFormState } from './listing-form.component';

import { ListingInformationService } from '../../listings-information.service';

@Component({
  selector: 'listing-form-placeholder',
  template: ''
})
export class ListingFormPlaceholderComponent implements OnChanges {

  @Output() listingSubmit : EventEmitter<ListingSubmit> = new EventEmitter<ListingSubmit>();

  @Output() updateRepository : EventEmitter<void> = new EventEmitter<void>();

  @Output('closeForm') closeForm : EventEmitter<void> = new EventEmitter<void>();

  @Output() returnForm : EventEmitter<void> = new EventEmitter<void>();

  @Input() listingType : string;

  @Input() listing : any;

  private listingFormComponent : ListingFormComponent;

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver,
    private listingInformationService : ListingInformationService
  ) {  }

  public ngOnChanges(simpleChanges : SimpleChanges) {
    if (simpleChanges['listingType']) {
      this.createListingFormComponent();
    }
  }

  /**Clears the view and creates a new listing form component. */
  private createListingFormComponent() : void {
    this.viewContainerRef.clear();
    let componentType : Type<ListingFormComponent> = this.listingInformationService.listingDescriptorHandler.getListingFormComponentTypeFromLisitingType(this.listingType);

    let componentFactory : ComponentFactory<ListingFormComponent> = this.componentFactoryResolver.resolveComponentFactory(componentType);
    let componentRef : ComponentRef<ListingFormComponent> = this.viewContainerRef.createComponent(componentFactory);

    this.listingFormComponent = componentRef.instance;

    // Angular does not support Input and Output on dynamically created components.

    if (this.listing) { // check whether an input listing was submitted or create a new one
      this.listingFormComponent.listing = this.listing;
      this.listingFormComponent.formState = ListingFormState.EDIT;
    } else {
      this.listingFormComponent.listing = this.listingInformationService.listingDescriptorHandler.getListingFromListingType(this.listingType)
      this.listingFormComponent.formState = ListingFormState.CREATE;
    }

    this.listingFormComponent.listingSubmit.subscribe((listingSubmit : ListingSubmit) => {
      this.listingSubmit.emit(listingSubmit);
    });

    this.listingFormComponent.updateRepository.subscribe(() => {
      this.updateRepository.emit();
    });

    this.listingFormComponent.closeFormEvent.subscribe(() => {
      this.closeForm.emit();
    });

    this.listingFormComponent.returnFormEvent.subscribe(() => {
      this.returnForm.emit();
    })

    if (this.listing) { // call ngOnChanges in ListingFromComponent when a listing exists
      this.listingFormComponent.ngOnChanges({
        listing : new SimpleChange(undefined, this.listing, true)
      });
    }
  }

}
