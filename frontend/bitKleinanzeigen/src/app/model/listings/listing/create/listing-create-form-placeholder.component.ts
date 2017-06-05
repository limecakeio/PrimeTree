import {
  Component,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  OnInit,
  Output,
  Type,
  ComponentRef,
  ComponentFactory,
  EventEmitter
} from '@angular/core';

import { ListingCreateFormComponent } from './listing-create-form.component';
import { Listing } from '../listing.model';
import { ListingFormEventModel } from './listing-create.component';


@Component({
  selector: 'listing-create-form-placeholder',
  template: ''
})
export class ListingCreateFormPlaceholderComponent implements OnInit {

  @Output() listingcreated : EventEmitter<ListingFormEventModel>;

  @Output() updateRepository : EventEmitter<void>;

  @Input() listingFormType : Type<ListingCreateFormComponent>;

  @Input() listing : Listing;

  @Input() userLocation : string;

  private called : boolean = false;

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver
  ) {
    this.listingcreated = new EventEmitter<ListingFormEventModel>();
    this.updateRepository = new EventEmitter<void>();
  }

  ngOnInit() : void {
    console.log(this.userLocation, 'userLocation')
    if (!this.called) {
      this.called = true;
    } else {
      return;
    }
    let componentFactory : ComponentFactory<ListingCreateFormComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingFormType);
    let componentRef : ComponentRef<ListingCreateFormComponent> = this.viewContainerRef.createComponent(componentFactory);
    // (<ListingCreateFormComponent>componentRef.instance).model = this.listing;

    (<ListingCreateFormComponent>componentRef.instance).userLocation = this.userLocation;

    // Output events in dynamic components are currently not supported.
    // @reference https://stackoverflow.com/questions/37683099/output-parameter-in-dynamic-components
    (<ListingCreateFormComponent>componentRef.instance).listingFormCreateFinished.subscribe((listingFormEventModel : ListingFormEventModel) =>  {
      this.listingcreated.emit(listingFormEventModel);
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
    (<ListingCreateFormComponent>componentRef.instance).listingFormUpdateRepositoryOutput.subscribe(() => {
      this.updateRepository.emit();
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

}
