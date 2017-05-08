import { Routes, RouterModule } from '@angular/router';
import { SellItemCreateFormComponent } from './model/listings/form/create/sellitem-create.component';
import { LoginComponent } from './login/login.component';
import { ListingComponent } from './model/listings/listing.component';

const routes: Routes = [{
  path: 'create/sellitem',
  component: SellItemCreateFormComponent
}, {
  path: 'repo',
  component: ListingComponent
}, {
  path: '',
  component: LoginComponent
}];

export const routing = RouterModule.forRoot(routes);
