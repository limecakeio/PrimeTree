import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingComponent } from './listing.component';
import { ListingResolver } from './listing.resolve';
import { ListingCreateComponent } from './listing-create.component';
import { ListingOverviewViewportComponent } from '../listing-overview-viewport.component';
import { ListingDetailViewComponent } from './listing-detail-view.component';

import { CanActivateUser } from '../../../routing/can-activate-user.model'

const listingRoutes : Routes = [
  {
    path: 'listing',
    children: [
      {
        path: 'create/:listingType',
        component: ListingCreateComponent
      }, {
        path: ':id',
        component: ListingDetailViewComponent
        // ,
        // resolve: {
        //   listing: ListingResolver
        // }
      }, {
        path: '',
        component: ListingOverviewViewportComponent
      }
    ],
    canActivate: [ CanActivateUser ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(listingRoutes) ],
  exports: [ RouterModule ],
  providers: [ ListingResolver ]
})
export class ListingRoutingModule {

}
