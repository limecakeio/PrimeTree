import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateUser } from './can-activate-user.model';
import { AuthenticationComponent } from '../authentication/authentication'
import { ListingOverviewViewportComponent } from '../model/listings/listings';
import { ListingCreateComponent } from '../model/listings/listing/listing-create.component';
import { ListingDetailViewComponent } from '../model/listings/listing/listing-detail-view.component';

const routes: Routes = [
  {
    path: 'home',
    component: ListingOverviewViewportComponent,
    canActivate: [ CanActivateUser ]
  }, {
    path: '',
    component: AuthenticationComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateUser ]
})
export class RoutingModule {

}
