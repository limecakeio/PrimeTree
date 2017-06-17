import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SaleOfferComponent } from './sale-offer.component';
import { SaleOfferPreviewComponent } from './sale-offer-preview.component';
import { SaleOfferFormComponent } from './sale-offer-form.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    SaleOfferPreviewComponent,
    SaleOfferComponent,
    SaleOfferFormComponent
  ],
  exports: [
    SaleOfferComponent,
    SaleOfferPreviewComponent,
    RouterModule,
    PreviewModule,
    DetailModule,
    SaleOfferFormComponent
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
