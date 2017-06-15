import {
  Component,
  Input,
  ViewContainerRef,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  Type,
  AfterViewInit,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Listing } from '../listing.model';
import { ListingPreviewComponent } from './listing-preview.component';

@Component({
  selector: 'listing-preview-placeholder',
  template: ''
})
export class ListingPreviewPlaceholderComponent implements OnInit, OnChanges {

  private listingPreviewComponent : ListingPreviewComponent;

  private listingSimpleChange : SimpleChange;

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver
  ) {  }

  @Output() listingCreated : EventEmitter<void> = new EventEmitter<void>();

  @Output() showListingDetailView : EventEmitter<number> = new EventEmitter<number>();

  @Input() listingComponentType : Type<ListingPreviewComponent>;

  @Input() listing : Listing;

  /**
   * We need to tell  the viewport component when a listing element has been created.
   */
  ngOnInit() : void {
    // Create a component as well as a reference to it
    let listingPreviewComponentFactory : ComponentFactory<ListingPreviewComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
    let listingPreviewComponentRef : ComponentRef<ListingPreviewComponent> = this.viewContainerRef.createComponent(listingPreviewComponentFactory);

    this.listingPreviewComponent = <ListingPreviewComponent>listingPreviewComponentRef.instance;
    // Inject it into the view
    // (<ListingPreviewComponent>listingPreviewComponentRef.instance).listing = this.listing;


    // Angular doesn't support Input, Output and ngOnChanges life cycle hooks in dynamically created components
    this.listingPreviewComponent.listing = this.listing;

    this.listingPreviewComponent.ngOnChanges({
      listing: this.listingSimpleChange
    });

    // forward the output
    this.listingPreviewComponent.showListingDetailView.subscribe((id : number) => {
      this.showListingDetailView.emit(id);
    });

    //Inform the parent-component that the new component has been created
    this.listingCreated.emit();
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    this.listingSimpleChange = simpleChanges['listing'];
  }

}
