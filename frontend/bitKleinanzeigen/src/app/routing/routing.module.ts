import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ListingComponent } from '../model/listings/listing.component';
import { CanActivateUser } from '../routing/canActivateUser.model';
import { SellItemCreateFormComponent } from '../model/listings/form/create/sellitem-create.component';

const routes: Routes = [
  {
  path: 'create/sellitem',
  component: SellItemCreateFormComponent,
  canActivate: [ CanActivateUser ]
}, {
  path: 'home',
  component: ListingComponent,
  canActivate: [ CanActivateUser ]
}, {
  path: '',
  component: LoginComponent
}
// , {
//   path: '',
//   component:
// }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ CanActivateUser ]
})
export class RoutingModule {

}
