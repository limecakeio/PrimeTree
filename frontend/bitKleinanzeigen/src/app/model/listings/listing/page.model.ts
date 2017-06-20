import { Listing } from './listing.model';
import { NetworkRequest } from '../../../network/network.request';

/**Describes  a server side page with the all listings in the page as well as information about all existing listings. */
export class Page {
  public listings : Listing[];



  public networkRequest : NetworkRequest;
  public price_min : number;
  public price_max : number;
  public count : number;
  public pages : number;
  public pageNumber : number;
}
