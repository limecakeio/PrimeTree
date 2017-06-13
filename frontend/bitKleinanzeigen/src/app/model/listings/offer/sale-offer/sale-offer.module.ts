import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SaleOfferComponent } from './sale-offer.component';
import { SaleOfferPreviewComponent } from './sale-offer-preview.component';
import { SaleOfferCreateFormComponent } from './sale-offer-create-form.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    SaleOfferPreviewComponent,
    SaleOfferCreateFormComponent,
    SaleOfferComponent
  ],
  exports: [
    SaleOfferComponent,
    SaleOfferPreviewComponent,
    SaleOfferCreateFormComponent,
    RouterModule,
    PreviewModule,
    DetailModule
  ],
  imports: [
    CommonModule,
    FormModule,
    RouterModule,
    PreviewModule,
    DetailModule
  ],
  providers: []
})
export class SaleOfferModule {

}
