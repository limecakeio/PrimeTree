import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOfferPreviewComponent } from './service-offer-preview.component';
import { ServiceOfferCreateFormComponent } from './service-offer-create-form.component';
import { ServiceOfferComponent } from './service-offer.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';


@NgModule({
  declarations: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent
  ],
  exports: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    PreviewModule
  ],
  providers: [

  ]
})
export class ServiceOfferModule {

}
