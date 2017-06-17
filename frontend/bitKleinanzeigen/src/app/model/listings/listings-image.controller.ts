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

  /**Uploads the image to the server. Adds the neccesary header to determine the image file type. */
  /**Accepts the corresponding listing id, the file that contains the image data as well as optional the file type. */
  /**Returns an Observable which returns void if the listing image was uploaded succesfully or an exception if something went wrong. */
  public listingMainImageUpload(listingId : number, file : File, fileType ? : string) : Observable<void> {
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
    if (fileType) {
      networkRequest.addHeader('fileType', fileType);
    }
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 201) {
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

  /**Uploads an image file to the server under the specific image id. */
  /**Returns an Observable that re */
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

  /**Removes the whole gallery from the server. Returns an Observable that returns to voidd if everything went well or throws an error. */
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
