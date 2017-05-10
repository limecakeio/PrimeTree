import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Listing } from '../listing.model';
import { SellItem } from '../sellitem/sellitem.model';
import { NetworkService } from '../../../network/network.service';
import { NetworkRequest } from '../../../network/network.request';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingController {

  constructor(private networkService : NetworkService ) {  }

  postListing(listingType : string, listing : any, images? : File[]) : Observable<Response> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setHostname('141.19.145.175')
    .setPort(8080)
    .addPath('listing')
    .addPath('create')
    .setBody({
    /*  type: listingType,
      listing: listing,
      files: images*/
      newListingData: {
        title : listing.title,
        listingDescription: listing.description,
        price: listing.price,
        listingType: 'SellItem'
      }
    }).addHeader('Content-Type', 'application/json');
    return this.networkService.send(request).map(response => response.json());
  }

  public postImage(listingId : number, image : File) : Observable<Response> {
    let formData : FormData = new FormData();
    formData.append('file[]', image);
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setHostname('localhost')
    .setPort(3500)
    .addPath('listing')
    .addPath('image')
    .setBody({
      id : listingId,
      image: formData
    });
    return this.networkService.send(request);
  }

  public getAllListings() : Observable<number[]> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Get)
    .setHostname('141.19.145.175')
    .setPort(8080)
    .addPath('listing')
    .addPath('getall');
    return this.networkService.send(request).map((response : Response) => {
      return response.json();
    });
  }

  public getListing(id : number) : Observable<Listing> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Get)
    .setHostname('141.19.145.175')
    .setPort(8080)
    .addPath('listing')
    .addPath('getone')
    .addPath(id + '');
    return this.networkService.send(request).map((response : Response) => {
      let body = response.json();
      let listing = new SellItem();
      listing.title = body.title;
      listing.description = body.description;
      listing.id = body.listingId;
      listing.owner = body.owner;
      listing.price = body.price;
      return listing;
    });
  }

  public removeListing(id : number) : Observable<Response> {
    let request = this.networkService.networkRequest();
    request.setHttpMethod(RequestMethod.Delete)
    .setHostname('141.19.145.175')
    .setPort(8080)
    .addPath('listing')
    .addPath('delete')
    .addPath(id + '');
    return this.networkService.send(request);
  }

}
