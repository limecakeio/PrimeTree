import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NetworkService, NetworkRequest, RequestMethod, Response } from '../../../network/network';
import { ListingRequest } from './listing.request';
import { Page } from './page.model';
import { PageFactory } from './page.factory';
import { ListingCreator } from './listing.creator';
import { Listing } from './listing.model';
import { Comment } from './comment.model';
import { ListingList, ListingListFactory } from './listing.list';
import { ListingInformationService } from '../listings-information.service';

/**
 * This class handles all network traffic which affects listings.
 */
@Injectable()
export class ListingController {

  private pageFactory : PageFactory;
  private listingCreator : ListingCreator;
  private listingListFactory : ListingListFactory;

  constructor(
    private networkService : NetworkService,
    private listingInformationService : ListingInformationService
  ) {
    this.listingCreator = new ListingCreator(this.listingInformationService);
    this.pageFactory = new PageFactory(this.listingCreator);
    this.listingListFactory = new ListingListFactory();
  }

  public loadNewPageSite(page : Page) : Observable<Page> {
    let networkRequest : NetworkRequest = page.networkRequest;
    networkRequest.addQuery('page', page.pageNumber + '');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        let page : Page = this.pageFactory.createPage(response.json());
        page.networkRequest = networkRequest;
        return page;
      }
      throw new Error(response.toString());
    });
  }

  /**
   * Returns a new ListingRequest which can be used with the get listings methods.
   * Hostname and port properties are already set accordingly to the NetworkService information.
   */
  public listingRequest() : ListingRequest {
    return new ListingRequest(this.networkService.networkRequest());
  }

  /**
   * Returns a Page which can be used to retrieve more pages.
   * @argument {ListingRequest} ListingRequest This object collects possible queries for this method.
   * @return {Observable<Page>} An observable which returns to a page or an error.
   */
  public getActiveListings(listingRequest? : ListingRequest) : Observable<Page> {
    let request : NetworkRequest;
    if (listingRequest === undefined) {
      request = this.networkService.networkRequest();
    } else {
      request = listingRequest.getRequest();
    }
    request
    .setHttpMethod(RequestMethod.Get)
    .addPath('listings')
    .addPath('active');
    return this.networkService.send(request).map((response : Response) => {
      if (response.status === 200) {
        let page : Page = this.pageFactory.createPage(response.json());
        page.networkRequest = request;
        return page;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  /**
   * Creates the listing on the server and returns the id of the created listing.
   * @argument {any} listing an object which holds all necessary properties to create the listing.
   */
  public createListing(listing : any) : Observable<number> {
    let request : NetworkRequest = this.networkService.networkRequest();
    request
    .setHttpMethod(RequestMethod.Post)
    .addPath('listing')
    .addPath('create')
    .setBody(listing);
    return this.networkService.send(request).map((response : Response) => {
      if (response.status === 201) {
        return response.json().id;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  /**
   * Uploads the argument image to the server as the main image of the listing with the corresponding id.
   * @argument {number} listingId
   * @argument {File} image
   */
  public listingMainImageUpload(listingId : number, image : File) : Observable<void> {
    let request : NetworkRequest = this.networkService.networkRequest();
    request
    .setHttpMethod(RequestMethod.Put)
    .addPath('listing')
    .addPath('upload')
    .addPath('main-image')
    .addPath('' + listingId);
    return this.networkService.send(request).map((response : Response) => {
      if (response.status === 201) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User must be the author of the corresponding listing to upload or change the main image!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  /**
   * Removes the listing with the corresponding id on the server.
   * @argument {number} listingId
   * @return {Observable<void>}
   */
  public removeListing(listingId : number) : Observable<void> {
    let request : NetworkRequest = this.networkService.networkRequest();
    request
    .setHttpMethod(RequestMethod.Delete)
    .addPath('listing')
    .addPath('' + listingId);
    return this.networkService.send(request).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User must be the author of the corresponding listing to remove it!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  /**
   * Returns all lisitings in pages.
   */
  public getListings(listingRequest?: ListingRequest) : Observable<Page> {
    let networkRequest : NetworkRequest = (listingRequest) ? listingRequest.getRequest() : this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('listings');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return this.pageFactory.createPage(response.json());
      }
      throw new Error(response.toString());
    });
  }

  public getListing(listingID : number) : Observable<Listing> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('listing')
    .addPath('' + listingID);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        let listing : Listing = this.listingCreator.createListing(response.json())
        console.log('resolve finished')
        return listing;
      }
      throw new Error(''  + response.status);
    });
  }

  public editListing(listing : Listing) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Post)
    .addPath('listing')
    .addPath('' + listing.id)
    .setBody(listing);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be  authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('Only owner can change their one listings.');
      }
      throw new Error(response.toString());
    });
  }

  public activateListing(listingId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Post)
    .addPath('listing')
    .addPath('' + listingId)
    .addPath('activate');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be  authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('Only owner can change their one listings.');
      }
      throw new Error(response.toString());
    });
  }

  public deactivateListing(listingId : string) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Post)
    .addPath('listing')
    .addPath('' + listingId)
    .addPath('deactivate');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be  authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('Only owner can change their one listings.');
      }
      throw new Error(response.toString());
    });
  }

  public postComment(listingId : number, comment : Comment) : Observable<number> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Post)
    .addPath('listing')
    .addPath('' + listingId)
    .addPath('comment')
    .setBody(comment);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 201) {
        return response.json().id;
      } else if (response.status === 401) {
        throw new Error('User must be  authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('Listing is deactivated or user is not an admin.');
      } else if (response.status === 404) {
        throw new Error('No lisiting found for: ' + listingId + '.');
      }
      throw new Error(response.toString());
    });
  }

  public removeComment(listingId : number, commentId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Delete)
    .addPath('listing')
    .addPath('' + listingId)
    .addPath('comment')
    .addPath('' + commentId);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be  authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User is not the creator or the listing is deactivated.');
      } else if (response.status === 404) {
        throw new Error('Listing id or comment id is invalid.');
      }
    });
  }

  public getInactiveListings(listingRequest : ListingRequest) : Observable<Page> {
    let networkRequest : NetworkRequest = (listingRequest) ? listingRequest.getRequest() : this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('listings')
    .addPath('inactive');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return this.pageFactory.createPage(response.json());
      } else if (response.status === 401) {
        throw new Error('User must be  authenticated to use this method!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public searchListings(query : string, listingRequest? : ListingRequest) : Observable<ListingList> {
    let networkRequest : NetworkRequest = (listingRequest) ? listingRequest.getRequest() : this.networkService.networkRequest();
    networkRequest
    .addQuery('query', query)
    .addPath('listings')
    .addPath('search');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return this.listingListFactory.createListingList(response.json());
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      }
      throw new Error(response.toString());
    });
  }

  public getOwnListings() : Observable<Listing[]> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .addPath('listings')
    .addPath('own');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return response.json().listings;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      }
      throw new Error(response.toString());
    });
  }

}
