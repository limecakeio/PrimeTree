import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ServiceRequestComponent } from './service-request.component';
import { ServiceRequestPreviewComponent } from './service-request-preview.component';
import { ServiceRequestFormComponent } from './service-request-form.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    ServiceRequestComponent,
    ServiceRequestPreviewComponent,
    ServiceRequestFormComponent
  ],
  exports: [
    ServiceRequestComponent,
    ServiceRequestPreviewComponent,
    ServiceRequestFormComponent,
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
export class ServiceRequestModule {

}

export { ServiceRequestComponent, ServiceRequestPreviewComponent, ServiceRequestFormComponent }
