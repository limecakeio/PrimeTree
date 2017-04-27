import { Injectable } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';
import { Listing, SellItem } from '../model/listing.model';
import { Observable } from 'rxjs/Observable';
import { NetworkRequest } from './network.request';
import 'rxjs/add/operator/map';
import { NetworkService } from './network.service';

@Injectable()
export class ListingRequest {

  constructor(private networkService : NetworkService) { }

  postListing(listingType : string, listing : SellItem) : Observable<any> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setPort(3500)
    .addPath('listing')
    .addPath('create')
    .setBody({
      newListingData: {
        title : listing.title,
        listingDescription : listing.description,
        price: listing.price,
        listingType: listingType
      }
    });
    return this.networkService.send(request).map(response => response.json());
  }

  getListing() : Observable<Listing> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Get)
    .setPort(8080)
    .addPath('listing')
    .addPath('get')
    .addQuery('listingId', '1');
    return this.networkService.send(request).map(response => response.json());
  }

  getAllListings() : Observable<Listing[]> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Get);
    return this.networkService.send(request).map(response => response.json());
  }

  getRequest() : NetworkRequest {
    return new NetworkRequest();
  }

  sendRequest(request : NetworkRequest) : Observable<Response> {
    return this.networkService.send(request);
  }
}
