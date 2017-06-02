// import {
//   Component,
//   Input,
//   ViewContainerRef,
//   OnInit,
//   OnDestroy,
//   ComponentFactoryResolver
// } from '@angular/core';
//
// import { Listing } from './listing/listing.model';
// import { ListingPreviewComponent } from './listing/listing-preview.component';
//
// @Component({
//   selector: 'listing-preview-placeholder'
// })
// export class ListingsPreviewPlaceholderComponent implements OnInit {
//
//   constructor(
//     private viewContainerRef : ViewContainerRef,
//     private componentFactoryResolver : ComponentFactoryResolver
//   ) {  }
//
//   @Input() listingComponentType : any;
//
//   @Input() listing : Listing;
//
//   ngOnInit() : void {
//     let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.listingComponentType);
//     let componentRef = this.viewContainerRef.createComponent(componentFactory);
//     (<ListingPreviewComponent>componentRef.instance).listing = this.listing;
//
//   }
//
// }
