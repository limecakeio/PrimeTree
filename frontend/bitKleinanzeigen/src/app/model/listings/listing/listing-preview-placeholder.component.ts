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
  AfterViewInit
} from '@angular/core';

import { Listing } from './listing.model';
import { ListingPreviewComponent } from './listing-preview.component';

@Component({
  selector: 'listing-preview-placeholder',
  template: ''
})
export class ListingPreviewPlaceholderComponent implements OnInit {

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver
  ) {  }

  @Output() listingCreated : EventEmitter<void> = new EventEmitter<void>();

  @Input() listingComponentType : Type<ListingPreviewComponent>;

  @Input() listing : Listing;

  /**
   * We need to tell  the viewport component when a listing element has been created.
   */
  ngOnInit() : void {
    // Create a component as well as a reference to it
    let listingPreviewComponentFactory : ComponentFactory<ListingPreviewComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
    let listingPreviewComponentRef : ComponentRef<ListingPreviewComponent> = this.viewContainerRef.createComponent(listingPreviewComponentFactory);
    // Inject it into the view
    (<ListingPreviewComponent>listingPreviewComponentRef.instance).listing = this.listing;
    //Inform the parent-component that the new component has been created
    this.listingCreated.emit();
  }
}
