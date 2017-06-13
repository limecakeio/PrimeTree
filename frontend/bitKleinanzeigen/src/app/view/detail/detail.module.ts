import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TitleDetailViewComponent } from './title/title.component';
import { DescriptionDetailViewComponent } from './description/description.component';
import { CreatorDetailViewComponent } from './creator/creator.component';
import { FavouriteDetailViewComponent } from './favourite/favourite.component';
import { CallToActionDetailViewComponent } from './call-to-action/call-to-action.component';
import { ImageDetailViewComponent } from './image/image.component';
import { PriceDetailViewComponent } from './price/price.component';

@NgModule({
  declarations: [
    TitleDetailViewComponent,
    DescriptionDetailViewComponent,
    CreatorDetailViewComponent,
    FavouriteDetailViewComponent,
    CallToActionDetailViewComponent,
    ImageDetailViewComponent,
    PriceDetailViewComponent
  ],
  exports: [
    SharedModule,
    TitleDetailViewComponent,
    DescriptionDetailViewComponent,
    CreatorDetailViewComponent,
    FavouriteDetailViewComponent,
    CallToActionDetailViewComponent,
    ImageDetailViewComponent,
    PriceDetailViewComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [

  ]
})
export class DetailModule {

}
