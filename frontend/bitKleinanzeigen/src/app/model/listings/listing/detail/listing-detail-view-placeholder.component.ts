import {
  Component,
  Input,
  Type,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';

import { Listing } from '../listing.model';
import { ListingComponent } from './listing.component';

/**This class provides */
@Component({
  selector: 'listing-detail-view-placeholder',
  template: ''
})
export class ListingDetailViewPlaceholderComponent implements OnChanges {

  @Input() listing : Listing;

  @Input() listingComponentType : Type<ListingComponent>;

  private listingDetailViewCreated : boolean = false;

  private listingDetailViewComponentRef : ComponentRef<ListingComponent>;

  constructor(
    private viewContainerRef : ViewContainerRef,
    private componentFactoryResolver : ComponentFactoryResolver
  ) {

  }

  ngOnChanges(simpleChanges : SimpleChanges) {
    if (this.listing) {
      this.buildAndDisplayListingDetailViewComponent();
    }
  }

  /**Creates the proper listing component which matches the listing type.*/
  private buildAndDisplayListingDetailViewComponent() : void {
    if (this.listingDetailViewCreated) { // destroy an existing component
      this.listingDetailViewComponentRef.destroy();
    }
    this.viewContainerRef.clear();
    let listingDetailViewComponentFactory : ComponentFactory<ListingComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
    this.listingDetailViewComponentRef = this.viewContainerRef.createComponent(listingDetailViewComponentFactory);
    // Inject it into the view
    (<ListingComponent>this.listingDetailViewComponentRef.instance).listing = this.listing;
    this.listingDetailViewCreated = true;
  }


}
