import {
  Component,
  Input,
  Type,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  OnInit,
  OnChanges
} from '@angular/core';

import { Listing } from './listing.model';
import { ListingComponent } from './listing.component';

@Component({
  selector: 'listing-detail-view-placeholder',
  template: ''
})
export class ListingDetailViewPlaceholderComponent implements OnChanges {

  @Input() listing : Listing;

  @Input() listingComponentType : Type<ListingComponent>;

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver
  ) {

  }


  ngOnChanges() {
    if (typeof this.listingComponentType !== 'undefined') {
      console.log(this.listing)
      let listingPreviewComponentFactory : ComponentFactory<ListingComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
      let listingPreviewComponentRef : ComponentRef<ListingComponent> = this.viewContainerRef.createComponent(listingPreviewComponentFactory);
      // Inject it into the view
      (<ListingComponent>listingPreviewComponentRef.instance).listing = this.listing;
    }
  }


}
