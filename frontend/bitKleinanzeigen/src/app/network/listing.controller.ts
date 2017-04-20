import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { NetworkRequest, HttpMethod } from './network.controller';
import { Listing } from '../model/listing.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingRequest {

  constructor(private networkRequest : NetworkRequest) { }

  postListing(listingType : string, listing : Listing) : Observable<any> {
    return this.networkRequest
    .setHttpMethod(HttpMethod.POST)
    .setPort(3500)
    .addPath('listings')
    .setBody({type: listingType, listing: listing})
    .sendRequest()
    .map(response => response.json());
  }

  getListing() : Observable<Listing> {
    return this.networkRequest.
    setHttpMethod(HttpMethod.GET)
    .addPath('listings')
    .addQuery('id', '5')
    .sendRequest()
    .map(response => response.json());
  }

  getAllListings() : Observable<Listing[]> {
    return this.networkRequest.
    setHttpMethod(HttpMethod.GET)
    .addPath('listings')
    .sendRequest()
    .map(response => response.json());
  }

  get request() : NetworkRequest {
    return this.networkRequest;
  }

}
