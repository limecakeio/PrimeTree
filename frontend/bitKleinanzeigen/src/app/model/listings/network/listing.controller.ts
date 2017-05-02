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

  postListing(listingType : string, listing : Listing, images? : File[]) : Observable<Response> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setHostname('localhost')
    .setPort(3500)
    .addPath('listing')
    .addPath('create')
    .setBody({
      type: listingType,
      listing: listing,
      files: images
    });
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
    console.log(formData);
    return this.networkService.send(request);
  }

}
