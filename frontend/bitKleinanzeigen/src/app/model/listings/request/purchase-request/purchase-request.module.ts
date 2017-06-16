import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PurchaseRequestFormComponent } from './purchase-request-form.component';
import { PurchaseRequestPreviewComponent } from './purchase-request-preview.component';
import { PurchaseRequestComponent } from './purchase-request.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    PurchaseRequestFormComponent,
    PurchaseRequestPreviewComponent,
    PurchaseRequestComponent
  ],
  exports: [
    PurchaseRequestFormComponent,
    PurchaseRequestPreviewComponent,
    PurchaseRequestComponent,
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
export class PurchaseRequestModule {

}
