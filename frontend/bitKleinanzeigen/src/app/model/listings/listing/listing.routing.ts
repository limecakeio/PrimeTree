import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingComponent } from './detail/listing.component';
import { ListingCreateComponent } from './create/listing-create.component';
import { ListingOverviewViewportComponent } from './preview/listing-overview-viewport.component';
import { ListingDetailViewComponent } from './detail/listing-detail-view.component';

import { ListingFilterComponent } from './filter/filter.component';
import { ListingSearchComponent } from './search/search.component';

import { CanActivateUser } from '../../../routing/can-activate-user.model'

const listingRoutes : Routes = [
  {
    path: 'listing',
    children: [
      {
        path: 'create/:listingType',
        component: ListingOverviewViewportComponent
      },
      {
        path: 'edit/:listingID',
        component: ListingOverviewViewportComponent
      },
      {
        path: 'filter',
        component: ListingFilterComponent
      },
      {
        path: 'search',
        component: ListingSearchComponent
      },
      {
        path: ':id',
        component: ListingDetailViewComponent
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
  exports: [ RouterModule ]
})
export class ListingRoutingModule {

}
