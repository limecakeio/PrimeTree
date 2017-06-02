import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOfferPreviewComponent } from './service-offer-preview.component';
import { ServiceOfferCreateFormComponent } from './service-offer-create-form.component';

import { FormModule } from '../../../../form/form.module';

@NgModule({
  declarations: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent
  ],
  exports: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent
  ],
  imports: [
    CommonModule,
    FormModule
  ],
  providers: [

  ]
})
export class ServiceOfferModule {

}
