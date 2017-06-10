import { NgModule } from '@angular/core';

import { ListingsModule } from '../listings/listings.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FavouritesComponent } from './favourites/favourites.component';
import { UserProfilComponent } from './profil/profil.component';

import { UserRoutingModule } from './routing/user.routing';
import { UserAdminDashboardComponent } from './admin/dashboard/dashboard.component';

@NgModule({
  imports: [
    UserRoutingModule,
    ListingsModule
  ],
  declarations: [
    FavouritesComponent,
    UserProfilComponent,
    UserAdminDashboardComponent
  ],
  exports: [
    FavouritesComponent,
    UserProfilComponent,
    UserAdminDashboardComponent,
    UserRoutingModule
  ],
  providers: [
    UserService,
    UserController
  ]
})
export class UserModule {

}
