import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FavouritePreviewViewComponent } from './favourite/favourite.component';
import { ImagePreviewViewComponent } from './image/image.component';
import { PricePreviewViewComponent } from './price/price.component';
import { TitlePreviewViewComponent } from './title/title.component';
import { LocationPreviewViewComponent } from './location/loaction.component';

@NgModule({
  declarations: [
    FavouritePreviewViewComponent,
    ImagePreviewViewComponent,
    PricePreviewViewComponent,
    TitlePreviewViewComponent,
    LocationPreviewViewComponent
  ],
  exports: [
    FavouritePreviewViewComponent,
    ImagePreviewViewComponent,
    PricePreviewViewComponent,
    TitlePreviewViewComponent,
    LocationPreviewViewComponent,
    CommonModule,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [

  ]
})
export class PreviewModule {

}
