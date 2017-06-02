import {
  NgModule,
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Type,
  ModuleWithProviders,
  ModuleWithComponentFactories,
  Provider
} from '@angular/core';


import { ListingComponent } from './listing.component';
import { ListingPreviewComponent } from './listing-preview.component';
import { ListingCreator } from './listing.creator';

import { ListingController } from './listing.controller';
import { ListingRepository } from './listing.repository';
import { ListingPreviewPlaceholderComponent } from './listing-preview-placeholder.component';
import { ListingDescriptor, ListingCreateFormComponent } from './listing.descriptor';
import { ListingCreateComponent } from './listing-create.component';
import { ListingCreateFormPlaceholderComponent } from './listing-create-form-placeholder.component';
import { ListingDetailViewComponent } from './listing-detail-view.component';
import { ListingDetailViewPlaceholderComponent } from './listing-detail-view-placeholder.component';
import { ListingDescriptorHandler } from './listing-descriptor.handler';

import { ListingRoutingModule } from './listing.routing';


import { SaleOfferPreviewComponent, SaleOfferCreateFormComponent, SaleOfferComponent } from '../offer/sale-offer/sale-offer.descriptor';
import { ServiceOfferPreviewComponent, ServiceOfferCreateFormComponent } from '../offer/service-offer/service-offer.descriptor';

@NgModule({
  imports: [
    ListingRoutingModule
  ],
  declarations: [
    ListingComponent,
    ListingPreviewPlaceholderComponent,
    ListingCreateFormPlaceholderComponent,
    ListingCreateComponent,
    ListingDetailViewComponent,
    ListingDetailViewPlaceholderComponent
  ],
  exports: [
    ListingComponent,
    ListingPreviewPlaceholderComponent,
    ListingCreateFormPlaceholderComponent,
    ListingCreateComponent,
    ListingDetailViewComponent,
    ListingDetailViewPlaceholderComponent
  ],
  providers: [
    ListingCreator,
    ListingController,
    ListingRepository
  ],
  entryComponents: [
    ListingCreateFormComponent,
    ListingComponent,
    ListingPreviewComponent,

    SaleOfferPreviewComponent,
    SaleOfferCreateFormComponent,
    SaleOfferComponent,
    
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent
  ]
})
export class ListingModule {

  // static listingDescriptorHandler : ListingDescriptorHandler = new ListingDescriptorHandler();
  //
  // static getNewListingModule(listingDescriptors : typeof ListingDescriptor[]) : ModuleWithProviders {
  //   listingDescriptors.forEach((listingDescriptortypeof : typeof ListingDescriptor) => {
  //     ListingModule.listingDescriptorHandler.addListingDescriptorTypeof(listingDescriptortypeof);
  //   });
  //
  //   /**
  //   * Combine the component types in a single array to be delivered within the module.
  //   */
  //   let componentTypes : Type<any>[] = [].concat(
  //     ListingModule.listingDescriptorHandler.getAllListingCreateFormComponentTypes(),
  //     ListingModule.listingDescriptorHandler.getAllListingPreviewComponentTypes(),
  //     ListingModule.listingDescriptorHandler.getAllListingComponentTypes()
  //   );
  //
  //   return {
  //     ngModule: ListingModule,
  //     providers: [
  //       {
  //         provide: ANALYZE_FOR_ENTRY_COMPONENTS, //Required by the angular compiler
  //         useValue: ListingModule.listingDescriptorHandler.getAllComponentTypes(),
  //         multi: true //Required by the angular compiler
  //       }
  //     ]
  //   }
  // }

}
