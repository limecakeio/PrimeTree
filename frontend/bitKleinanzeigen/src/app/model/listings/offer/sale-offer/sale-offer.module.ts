import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SaleOfferComponent } from './sale-offer.component';
import { SaleOfferPreviewComponent } from './sale-offer-preview.component';
import { SaleOfferCreateFormComponent } from './sale-offer-create-form.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';

@NgModule({
  declarations: [
    SaleOfferComponent,
    SaleOfferPreviewComponent,
    SaleOfferCreateFormComponent
  ],
  exports: [
    SaleOfferComponent,
    SaleOfferPreviewComponent,
    SaleOfferCreateFormComponent,
    RouterModule,
    PreviewModule
  ],
  imports: [
    CommonModule,
    FormModule,
    RouterModule,
    PreviewModule
  ],
  providers: [

  ]
})
export class SaleOfferModule {

}
