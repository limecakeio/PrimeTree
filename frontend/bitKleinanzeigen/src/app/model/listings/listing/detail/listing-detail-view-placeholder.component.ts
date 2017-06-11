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
    // console.log(simpleChanges, 'simpleChanges')
    // if (simpleChanges['listingComponentType'] && simpleChanges['listingComponentType']['currentValue']) {
    //   if (this.listingDetailViewCreated) { // destroy an existing component
    //     this.listingDetailViewComponentRef.destroy();
    //   }
    //   this.viewContainerRef.clear();
    //   let listingDetailViewComponentFactory : ComponentFactory<ListingComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
    //   this.listingDetailViewComponentRef = this.viewContainerRef.createComponent(listingDetailViewComponentFactory);
    //   // Inject it into the view
    //   (<ListingComponent>this.listingDetailViewComponentRef.instance).listing = this.listing;
    //   this.listingDetailViewCreated = true;
    // }
    if (this.listing) {
      this.buildAndDisplayListingDetailViewComponent();
    }

    // if (typeof this.listingComponentType !== 'undefined') {
    //   console.log(this.listing)
    //   let listingPreviewComponentFactory : ComponentFactory<ListingComponent> = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
    //   let listingPreviewComponentRef : ComponentRef<ListingComponent> = this.viewContainerRef.createComponent(listingPreviewComponentFactory);
    //   // Inject it into the view
    //   (<ListingComponent>listingPreviewComponentRef.instance).listing = this.listing;
    // }
  }

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
