import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SaleOfferComponent } from './sale-offer.component';
import { SaleOfferPreviewComponent } from './sale-offer-preview.component';
import { SaleOfferCreateFormComponent } from './sale-offer-create.component';

import { FormModule } from '../../../../form/form.module';

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
    RouterModule
  ],
  imports: [
    CommonModule,
    FormModule,
    RouterModule
  ],
  providers: [

  ]
})
export class SaleOfferModule {

}
