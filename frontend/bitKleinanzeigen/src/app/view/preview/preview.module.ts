import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FavouritePreviewViewComponent } from './favourite/favourite.component';
import { ImagePreviewViewComponent } from './image/image.component';
import { PricePreviewViewComponent } from './price/price.component';
import { TitlePreviewViewComponent } from './title/title.component';
import { LocationPreviewViewComponent } from './location/loaction.component';
import { TravelDateAndTimePreviewViewComponent } from './travel-date-and-time/travel-date-and-time.component';

@NgModule({
  declarations: [
    FavouritePreviewViewComponent,
    ImagePreviewViewComponent,
    PricePreviewViewComponent,
    TitlePreviewViewComponent,
    LocationPreviewViewComponent,
    TravelDateAndTimePreviewViewComponent
  ],
  exports: [
    FavouritePreviewViewComponent,
    ImagePreviewViewComponent,
    PricePreviewViewComponent,
    TitlePreviewViewComponent,
    LocationPreviewViewComponent,
    TravelDateAndTimePreviewViewComponent,
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
