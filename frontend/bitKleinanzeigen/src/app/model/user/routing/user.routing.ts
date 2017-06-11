import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateUser } from '../../../routing/can-activate-user.model'

import { FavouritesComponent } from '../favourites/favourites.component';
import { UserProfilComponent } from '../profil/profil.component';

import { UserAdminDashboardComponent } from '../admin/dashboard/dashboard.component';
import { CanActivateAdmin } from './can-activate-admin.model';

const userRoutes : Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'favourites',
        component: FavouritesComponent,
        canActivate: [ CanActivateUser ]
      },
      {
        path: 'profil',
        component: UserProfilComponent,
        canActivate: [ CanActivateUser ]
      },
    ]
  },
  {
    path: 'admin/dashboard',
    component: UserAdminDashboardComponent,
    canActivate: [ CanActivateUser, CanActivateAdmin ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ],
  providers: [
    CanActivateAdmin
  ]
})
export class UserRoutingModule {

}
