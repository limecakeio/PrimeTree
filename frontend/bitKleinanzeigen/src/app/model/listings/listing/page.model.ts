import { Listing } from './listing.model';
import { NetworkRequest } from '../../../network/network.request';

export class Page {
  public listings : Listing[];

  /**
   * adds a listing
   * @param {Listing} listing
   */
  public addListing(listing : Listing) : void {
    this.listings.push(listing);
  }



  public networkRequest : NetworkRequest;
  public price_min : number;
  public price_max : number;
  public count : number;
  public pages : number;
  public pageNumber : number;
}
