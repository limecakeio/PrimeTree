import { NgModule } from '@angular/core';

import { ListingsModule } from '../listings/listings.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FavouritesComponent } from './favourites/favourites.component';

import { UserRoutingModule } from './user.routing';

@NgModule({
  imports: [
    UserRoutingModule,
    ListingsModule
  ],
  declarations: [
    FavouritesComponent
  ],
  exports: [
    FavouritesComponent
  ],
  providers: [
    UserService,
    UserController
  ]
})
export class UserModule {

}
