import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServiceOfferComponent } from './service-offer.component';
import { ServiceOfferPreviewComponent } from './service-offer-preview.component';
import { ServiceOfferCreateFormComponent } from './service-offer-create-form.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';


@NgModule({
  declarations: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent
  ],
  exports: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent,
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
export class ServiceOfferModule {

}
