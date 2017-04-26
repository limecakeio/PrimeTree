import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { NetworkRequest, HttpMethod } from './network.controller';
import { Listing, SellItem } from '../model/listing.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingRequest {

  constructor(private networkRequest : NetworkRequest) { }

  postListing(listingType : string, listing : SellItem) : Observable<any> {
    return this.networkRequest
    .setHttpMethod(HttpMethod.POST)
    .setPort(8080)
    .addPath('listing/create')
    .setBody({
      newListingData: {
        title : listing.title,
        listingDescription : listing.description,
        price: listing.price,
        listingType: listingType
      }
    })
    .sendRequest()
    .map(response => response.json());
  }

  getListing() : Observable<Listing> {
    return this.networkRequest.
    setHttpMethod(HttpMethod.GET)
    .setPort(8080)
    .addPath('listing/get')
    .addQuery('listingId', '1')
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

  test() : Observable<Response> {
    return this.networkRequest
    .setHttpMethod(HttpMethod.GET)
    .setPort(8080)
    .addPath('listings/get')
    .setBody({listingId: 500})
    .sendRequest()
    .map(response => response.json());
  }

}
