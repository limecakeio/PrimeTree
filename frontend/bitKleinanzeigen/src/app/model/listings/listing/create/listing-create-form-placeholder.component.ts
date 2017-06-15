import {
  Component,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  OnInit,
  OnChanges,
  Output,
  Type,
  ComponentRef,
  ComponentFactory,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import { ListingCreateFormComponent } from './listing-create-form.component';
import { Listing } from '../listing.model';
// import { ListingFormEventModel } from './listing-create.component';
import { ListingInformationService } from '../../listings-information.service';

@Component({
  selector: 'listing-create-form-placeholder',
  template: ''
})
export class ListingCreateFormPlaceholderComponent implements OnChanges {

  // @Output() listingcreated : EventEmitter<ListingFormEventModel> = new EventEmitter<ListingFormEventModel>();

  @Output() updateRepository : EventEmitter<void> = new EventEmitter<void>();

  @Input() listingType : string;

  private called : boolean = false;

  private listingCreateFormComponent : ListingCreateFormComponent;

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver,
    private listingInformationService : ListingInformationService
  ) {  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (typeof this.listingType === 'string') {
      this.buildListingCreateFormComponentView();
    }
    //
    // if (!this.called) {
    //   this.called = true;
    // } else {
    //   return;
    // }
    // let componentFactory : ComponentFactory<ListingCreateFormComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingFormType);
    // let componentRef : ComponentRef<ListingCreateFormComponent> = this.viewContainerRef.createComponent(componentFactory);
    // // (<ListingCreateFormComponent>componentRef.instance).model = this.listing;
    // console.log('listingCreate');
    // this.listingCreateFormComponent = <ListingCreateFormComponent>componentRef.instance;
    // this.listingCreateFormComponent.userLocation = this.userLocation;
    //
    // // Output events in dynamic components are currently not supported.
    // // @reference https://stackoverflow.com/questions/37683099/output-parameter-in-dynamic-components
    // this.listingCreateFormComponent.listingFormCreateFinished.subscribe((listingFormEventModel : ListingFormEventModel) =>  {
    //   this.listingcreated.emit(listingFormEventModel);
    // }, (error : Error) => {
    //   console.error(error);
    // }, () => {
    //
    // });
    // this.listingCreateFormComponent.listingFormUpdateRepositoryOutput.subscribe(() => {
    //   this.updateRepository.emit();
    // }, (error : Error) => {
    //   console.error(error);
    // }, () => {
    //
    // });
    // console.log('listingCreate')
  }

  /** Builds and displays the view */
  private buildListingCreateFormComponentView() : void {
    // Remove existing ListingCreateFormComponents from view.
    this.viewContainerRef.clear();

    let componentType : Type<ListingCreateFormComponent> = this.listingInformationService.listingDescriptorHandler.getListingCreateFormComponentTypeFromLisitingType(this.listingType);

    let componentFactory : ComponentFactory<ListingCreateFormComponent> = this.componentFactoryResolver.resolveComponentFactory(componentType);
    let componentRef : ComponentRef<ListingCreateFormComponent> = this.viewContainerRef.createComponent(componentFactory);

    // Angular doesn't support Input, Output and ngOnChanges in dynamically created components.

    /** Connect Input and Output with the parent component.*/
    componentRef.instance.listingFormUpdateRepositoryOutput.subscribe(() => {
      this.updateRepository.emit();
    });

    // componentRef.instance.listingFormCreateFinished.subscribe((listingFormEventModel : ListingFormEventModel) => {
    //   this.listingcreated.emit(listingFormEventModel);
    // });
  }

}
