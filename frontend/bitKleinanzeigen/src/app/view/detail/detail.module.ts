import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { TitleDetailViewComponent } from './title/title.component';
import { DescriptionDetailViewComponent } from './description/description.component';
import { CreatorDetailViewComponent } from './creator/creator.component';
import { FavouriteDetailViewComponent } from './favourite/favourite.component';
import { CallToActionDetailViewComponent } from './call-to-action/call-to-action.component';
import { ImageDetailViewComponent } from './image/image.component';
import { PriceDetailViewComponent } from './price/price.component';
import { CloseDetailViewComponent } from './close/close.component';

import { AvailableSeatsViewComponent } from './available-seats/available-seats.component';
import { JourneyStopsViewComponent } from './journey-stops/journey-stops.component';
import { LocationFromViewComponent } from './location-from/location-from.component';
import { LocationToViewComponent } from './location-to/location-to.component';
import { TravelDateAndTimeViewComponent } from './travel-date-and-time/travel-date-and-time.component';

@NgModule({
  declarations: [
    TitleDetailViewComponent,
    DescriptionDetailViewComponent,
    CreatorDetailViewComponent,
    FavouriteDetailViewComponent,
    CallToActionDetailViewComponent,
    ImageDetailViewComponent,
    PriceDetailViewComponent,
    CloseDetailViewComponent,
    AvailableSeatsViewComponent,
    JourneyStopsViewComponent,
    LocationFromViewComponent,
    LocationToViewComponent,
    TravelDateAndTimeViewComponent
  ],
  exports: [
    SharedModule,
    TitleDetailViewComponent,
    DescriptionDetailViewComponent,
    CreatorDetailViewComponent,
    FavouriteDetailViewComponent,
    CallToActionDetailViewComponent,
    ImageDetailViewComponent,
    PriceDetailViewComponent,
    CloseDetailViewComponent,
    AvailableSeatsViewComponent,
    JourneyStopsViewComponent,
    LocationFromViewComponent,
    LocationToViewComponent,
    TravelDateAndTimeViewComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [

  ]
})
export class DetailModule {

}
