import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

import { RideShareRequestComponent } from './rideshare-request.component';
import { RideShareRequestPreviewComponent } from './rideshare-request-preview.component';
import { RideshareRequestFormComponent } from './rideshare-request-form.component';

@NgModule({
  imports: [
    FormModule,
    PreviewModule,
    DetailModule
  ],
  declarations: [
    RideShareRequestComponent,
    RideShareRequestPreviewComponent,
    RideshareRequestFormComponent
  ],
  exports: [
    RideShareRequestComponent,
    RideShareRequestPreviewComponent,
    RideshareRequestFormComponent
  ],
  providers: [  ]
})
export class RideShareRequestModule {

}
export {     RideShareRequestComponent, RideShareRequestPreviewComponent, RideshareRequestFormComponent }
