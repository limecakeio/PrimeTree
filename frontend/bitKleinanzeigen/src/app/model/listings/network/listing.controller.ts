import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Listing } from '../listing.model';
import { SellItem } from '../sellitem/sellitem.model';
import { NetworkService } from '../../../network/network.service';
import { NetworkRequest } from '../../../network/network.request';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ListingRequest } from './listing.request';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingController {

  constructor(private networkService : NetworkService ) {  }

  postListing(listing : any) : Observable<number> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .addPath('listing')
    .addPath('create')
    .setBody(listing)
    .addHeader('Content-Type', 'application/json');
    return this.networkService.send(request).map((response : Response) => {
      let body : any = response.json();
      if (body.status !== null || body.id) {
        throw new Error(body.message);
      }
      return body.id;
    });
  }

  public putImage(listingId : number, image : File) : Observable<Response> {

    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Put)
    .addPath('upload')
    .addPath('listing-image')
    .addPath(listingId + '')
    .setBody({});
    return this.networkService.send(request).map(response => response.json());
  }

  public getAllActiveListings() : Observable<number[]> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Get)
    .addPath('listings')
    .addPath('active');
    console.log(request);
    return this.networkService.send(request).map((response : Response) => {
      let body : any = response.json();
      if (body.status !== null) {
        return body.ids;
      } else {
        console.log(body.message);
      }
      return [];
    });
  }

  public getActiveListings(listingRequest : ListingRequest) : Observable<number[]> {
    let request = listingRequest.getRequest();
    request.setHttpMethod(RequestMethod.Get)
    .addPath('listings')
    .addPath('active');
    return this.networkService.send(request).map((response : Response) => {
      let body : any = response.json();
      if (body.status !== null) {
        return body.ids;
      } else {
        console.log(body.message);
      }
      return [];
    });
  };

  public getAllInactiveListings() : Observable<number[]> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Get)
    .addPath('listings')
    .addPath('inactive');
    return this.networkService.send(request).map((response : Response) => {
      let body : any = response.json();
      if (body.status !== null) {
        return body.ids;
      } else {
        console.log(body.message);
      }
      return [];
    });
  }

  public getInactiveListings(listingRequest : ListingRequest) : Observable<number[]> {
    let request : NetworkRequest = listingRequest.getRequest();
    request.setHttpMethod(RequestMethod.Get)
    .addPath('listings')
    .addPath('inactive');
    return this.networkService.send(request).map((response : Response) => {
      let body : any = response.json();
      if (body.status !== null) {
        return body.ids;
      } else {
        console.log(body.message);
      }
      return [];
    });
  }

  public getListing(id : number) : Observable<Listing> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Get)
    .addPath('listing')
    .addPath('getone')
    .addPath(id + '');
    return this.networkService.send(request).map((response : Response) => {
      let body = response.json();
      let listing = new SellItem();

      return listing;
    });
  }

  public removeListing(id : number) : Observable<boolean> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Delete)
    .addPath('listing')
    .addPath('delete')
    .addPath(id + '');
    return this.networkService.send(request).map((response : Response) => {
      let body : any = response.json();
      let message : string = body.message;
      if (message === 'OK') {
        return true;
      } else {
        return false;
      }
    });
  }

}
