import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

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
    ListingsModule,
    RouterModule
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
    UserRoutingModule,
    RouterModule
  ],
  providers: [
    UserService,
    UserController
  ]
})
export class UserModule {

}
