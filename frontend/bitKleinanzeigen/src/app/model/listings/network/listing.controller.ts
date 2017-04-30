import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Listing } from '../listing.model';
import { NetworkService } from '../../../network/network.service';
import { NetworkRequest } from '../../../network/network.request';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingController {

  constructor(private networkService : NetworkService ) {  }

  postListing(listingType : string, listing : Listing) : Observable<Response> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setPort(3500)
    .addPath('listing')
    .addPath('create')
    .setBody({
      type: listingType,
      listing: listing
    });
    return this.networkService.send(request).map(response => response.json());
  }

}
