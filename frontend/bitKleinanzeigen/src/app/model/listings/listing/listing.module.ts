import {
  NgModule,
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Type,
  ModuleWithProviders,
  ModuleWithComponentFactories,
  Provider
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';

import { ListingDescriptor} from './listing.descriptor';
import { ListingDescriptorHandler } from './listing-descriptor.handler';

import { ListingCreator } from './listing.creator';
import { ListingController } from './listing.controller';
import { ListingRepository } from './listing.repository';

import { ListingOverviewViewportComponent } from './preview/listing-overview-viewport.component';
import { ListingPreviewPlaceholderComponent } from './preview/listing-preview-placeholder.component';
import { ListingCreateComponent } from './create/listing-create.component';
import { ListingCreateFormPlaceholderComponent } from './create/listing-create-form-placeholder.component';
import { ListingDetailViewComponent } from './detail/listing-detail-view.component';
import { ListingDetailViewPlaceholderComponent } from './detail/listing-detail-view-placeholder.component';
// import { ListingDetailViewOverlayComponent } from './detail/listing-detail-view-overlay.component';
import { ListingFormComponent } from './form/listing-form.component';
import { ListingFormPlaceholderComponent } from './form/listing-form-placeholder.component';

import { ListingEditComponent } from './edit/listing-edit.component';

import { FormModule } from '../../../form/form.module';

import { ListingFilterComponent } from './filter/filter.component';

import { ListingRoutingModule } from './listing.routing';

import { ListingSearchComponent } from './search/search.component';
import { ListingSearchService } from './search/search.service';

// Add your own listing components in the entryComponents array
import { ListingComponent, ListingPreviewComponent, ListingCreateFormComponent } from './listing.descriptor';
import { SaleOfferPreviewComponent, SaleOfferCreateFormComponent, SaleOfferComponent, SaleOfferFormComponent } from '../offer/sale-offer/sale-offer.descriptor';
import { ServiceOfferPreviewComponent, ServiceOfferCreateFormComponent, ServiceOfferComponent, ServiceOfferFormComponent } from '../offer/service-offer/service-offer.descriptor';

import { RideShareOfferModule, RideShareOfferPreviewComponent, RideShareOfferComponent, RideShareOfferCreateFormComponent, RideshareOfferFormComponent } from '../offer/rideshare-offer/rideshare-offer.module';
import { BorrowRequestComponent, BorrowRequestFormComponent, BorrowRequestPreviewComponent } from '../request/borrow-request/borrow-request.descriptor';
import { PurchaseRequestComponent, PurchaseRequestFormComponent, PurchaseRequestPreviewComponent } from '../request/purchase-request/purchase-request.descriptor';
import { RideShareRequestComponent, RideShareRequestPreviewComponent, RideshareRequestFormComponent } from '../request/rideshare-request/rideshare-request.descriptor';
import { RecreationRequestComponent, RecreationRequestFormComponent, RecreationRequestPreviewComponent } from '../request/recreation-request/recreation-request.descriptor';

@NgModule({
  imports: [
    FormModule,
    CommonModule,
    ListingRoutingModule,
    SharedModule
  ],
  declarations: [
    ListingCreateFormComponent,
    ListingComponent,
    ListingPreviewComponent,
    ListingOverviewViewportComponent,
    ListingPreviewPlaceholderComponent,
    ListingCreateFormPlaceholderComponent,
    ListingCreateComponent,
    ListingDetailViewComponent,
    ListingDetailViewPlaceholderComponent,
    ListingFilterComponent,
    ListingSearchComponent,
    ListingFormComponent,
    ListingFormPlaceholderComponent,
    ListingEditComponent
  ],
  exports: [
    FormModule,
    SharedModule,
    ListingOverviewViewportComponent,
    ListingPreviewPlaceholderComponent,
    ListingCreateFormPlaceholderComponent,
    ListingCreateComponent,
    ListingDetailViewComponent,
    ListingDetailViewPlaceholderComponent,
    ListingFilterComponent,
    ListingSearchComponent,
    ListingFormComponent,
    ListingFormPlaceholderComponent,
    ListingEditComponent
  ],
  providers: [
    ListingCreator,
    ListingController,
    ListingRepository,
    ListingSearchService
  ],
  entryComponents: [
    ListingFormComponent,

    SaleOfferPreviewComponent,
    SaleOfferCreateFormComponent,
    SaleOfferComponent,
    SaleOfferFormComponent,

    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent,
    ServiceOfferFormComponent,

    RideShareOfferPreviewComponent,
    RideShareOfferComponent,
    RideShareOfferCreateFormComponent,
    RideshareOfferFormComponent,

    BorrowRequestComponent,
    BorrowRequestFormComponent,
    BorrowRequestPreviewComponent,

    PurchaseRequestComponent,
    PurchaseRequestFormComponent,
    PurchaseRequestPreviewComponent,

    RideShareRequestComponent,
    RideShareRequestPreviewComponent,
    RideshareRequestFormComponent,

    RecreationRequestComponent,
    RecreationRequestFormComponent,
    RecreationRequestPreviewComponent
  ]
})
export class ListingModule {

  /**
   * Angular ahead of time compiler doesn't support static methods with more than one statement.
   * This statement must be an return.
   */
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
