import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateUser } from '../../routing/can-activate-user.model'

import { FavouritesComponent } from './favourites/favourites.component';

const userRoutes : Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'favourites',
        component: FavouritesComponent
      }
    ],
    canActivate: [ CanActivateUser ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule {

}
