import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListingModule } from './listing/listing.module';
// import { ListingOverviewViewportComponent } from './listing-overview-viewport.component';
import { SaleOfferModule } from './offer/sale-offer/sale-offer';
// import { ListingPreviewComponent } from './listing/listing-preview.component';
import { SaleOfferPreviewComponent } from './offer/sale-offer/sale-offer-preview.component';
// import { ListingCreateFormComponent } from './listing/listing-create-form.component';
import { ListingDescriptor } from './listing/listing.descriptor';
import { SaleOfferDescriptor } from './offer/sale-offer/sale-offer.descriptor';
import { ServiceOfferDescriptor } from './offer/service-offer/service-offer.descriptor';
import { ServiceOfferModule } from './offer/service-offer/service-offer.module';
import { RideShareOfferModule } from './offer/rideshare-offer/rideshare-offer.module';
import { BorrowRequestModule } from './request/borrow-request/borrow-request.module';
import { PurchaseRequestModule } from './request/purchase-request/purchase-request.module';
import { RideShareRequestModule } from './request/rideshare-request/rideshare-request.module';
import { RecreationRequestModule } from './request/recreation-request/recreation-request.module';
import { ListingInformationService } from './listings-information.service';

import { FormModule } from '../../form/form.module';


@NgModule({
  declarations: [
    // ListingOverviewViewportComponent,
    // ListingPreviewComponent,
    // ListingCreateFormComponent
  ],
  exports: [
    ListingModule,
    // ListingOverviewViewportComponent,
    SaleOfferModule,
    ServiceOfferModule,
    RideShareOfferModule,
    BorrowRequestModule,
    PurchaseRequestModule,
    RideShareRequestModule,
    RecreationRequestModule
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SaleOfferModule,
    ServiceOfferModule,
    RideShareOfferModule,
    BorrowRequestModule,
    PurchaseRequestModule,
    RideShareRequestModule,
    RecreationRequestModule,

    FormModule,
    ListingModule
    // ListingModule.getNewListingModule([
    //   ListingDescriptor,
    //   SaleOfferDescriptor,
    //   ServiceOfferDescriptor
    // ])
  ],
  providers: [
    ListingInformationService
  ]
})
export class ListingsModule {

}
