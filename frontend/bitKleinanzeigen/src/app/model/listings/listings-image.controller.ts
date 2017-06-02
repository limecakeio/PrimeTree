import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { NetworkService } from '../../network/network.service';
import { NetworkRequest } from '../../network/network.request';

@Injectable()
export class ListingsImageController {

  constructor(
    private networkService : NetworkService
  ) {  }

  public listingMainImageUpload(listingId : number, file : File) : Observable<void> {
    let formData : FormData = new FormData();
    formData.append('file', file);
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Put)
    .addPath('listing')
    .addPath('upload')
    .addPath('main-image')
    .addPath('' + listingId)
    .setBody(formData);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User can only upload images to their own listings.');
      } else if (response.status === 404) {
        throw new Error(listingId + ' is no valid listing identifier.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public galleryImageUpload(listingId : number, imageId : number, file : File) : Observable<void> {
    let formData : FormData = new FormData();
    formData.append('file', file);
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Put)
    .addPath('listing')
    .addPath('upload')
    .addPath('gallery')
    .addPath('' + listingId)
    .addPath('' + imageId)
    .setBody(formData);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 201) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User can only upload images to their own listings.');
      } else if (response.status === 404) {
        throw new Error('No valid identifier for listing or image.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public removeGallery(listingId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Delete)
    .addPath('listing')
    .addPath('upload')
    .addPath('gallery')
    .addPath('' + listingId);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User can only remove the gallery of their own listings.');
      } else if (response.status === 404) {
        throw new Error('No valid identifier for listing.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

}
