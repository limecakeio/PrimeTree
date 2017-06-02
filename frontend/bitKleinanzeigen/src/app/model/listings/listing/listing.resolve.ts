import {
  Injectable
} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/first' // in imports

import { ListingController } from './listing.controller';
import { Listing } from './listing.model';

@Injectable()
export class ListingResolver implements Resolve<Listing> {

  constructor(
    private listingController : ListingController
  ) {  }

  public resolve(activatedRouteSnapshot : ActivatedRouteSnapshot) : Observable<Listing> {
    return this.listingController.getListing(parseInt(activatedRouteSnapshot.params['id']));
  }
}
