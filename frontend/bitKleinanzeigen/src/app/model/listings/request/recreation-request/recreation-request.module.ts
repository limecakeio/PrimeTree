import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RecreationRequestFormComponent } from './recreation-request-form.component';
import { RecreationRequestPreviewComponent } from './recreation-request-preview.component';
import { RecreationRequestComponent } from './recreation-request.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    RecreationRequestFormComponent,
    RecreationRequestPreviewComponent,
    RecreationRequestComponent
  ],
  exports: [
    RecreationRequestFormComponent,
    RecreationRequestPreviewComponent,
    RecreationRequestComponent,
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
export class RecreationRequestModule {

}
