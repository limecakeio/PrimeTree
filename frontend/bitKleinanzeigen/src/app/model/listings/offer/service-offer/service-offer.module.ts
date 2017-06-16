import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServiceOfferComponent } from './service-offer.component';
import { ServiceOfferPreviewComponent } from './service-offer-preview.component';
import { ServiceOfferCreateFormComponent } from './service-offer-create-form.component';
import { ServiceOfferFormComponent } from './service-offer-form.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent,
    ServiceOfferFormComponent
  ],
  exports: [
    ServiceOfferPreviewComponent,
    ServiceOfferCreateFormComponent,
    ServiceOfferComponent,
    ServiceOfferFormComponent,
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

export { ServiceOfferPreviewComponent, ServiceOfferCreateFormComponent, ServiceOfferComponent, ServiceOfferFormComponent }
