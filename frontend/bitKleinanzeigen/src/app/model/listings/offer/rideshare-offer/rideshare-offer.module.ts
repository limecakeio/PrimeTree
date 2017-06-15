import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

import { RideShareOfferCreateFormComponent } from './rideshare-offer-create-form.component';
import { RideShareOfferComponent } from './rideshare-offer.component';
import { RideShareOfferPreviewComponent } from './rideshare-offer-preview.component';
import { RideshareOfferFormComponent } from './rideshare-offer-form.component';

@NgModule({
  imports: [
    FormModule,
    PreviewModule,
    DetailModule
  ],
  declarations: [
    RideShareOfferCreateFormComponent,
    RideShareOfferPreviewComponent,
    RideShareOfferComponent,
    RideshareOfferFormComponent
  ],
  exports: [
    RideShareOfferCreateFormComponent,
    RideShareOfferPreviewComponent,
    RideShareOfferComponent,
    RideshareOfferFormComponent
  ],
  providers: [  ]
})
export class RideShareOfferModule {

}
export { RideShareOfferPreviewComponent, RideShareOfferComponent,  RideShareOfferCreateFormComponent, RideshareOfferFormComponent}
