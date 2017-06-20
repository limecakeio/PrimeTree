import { NetworkRequest, NetworkService } from '../../../network/network';

/**Acts as a contractor between the listing filter criterias and the server. */
/**It translates every choosen filter criteria in a rest request. */
export class ListingRequest {

  private networkRequest : NetworkRequest;

  constructor(
    networkRequest : NetworkRequest
  ) {
    this.networkRequest = networkRequest;
  }

  /**Returns a request which paths and queries are set accordingly of the filter criteria. */
  public getRequest() : NetworkRequest {
    return this.networkRequest;
  }

  public setPriceMin(min : number) : void {
    this.networkRequest.addQuery('price_min', '' + min);
  }

  public setPriceMax(max : number) : void {
    this.networkRequest.addQuery('price_max', '' + max);
  }

  public setListingKind(kind : string) : void {
    this.networkRequest.addQuery('kind', kind);
  }

  public addLocation(location : string) : void {
    this.networkRequest.appendQuery('location', location);
  }

  public addListingType(listingType : string) : void {
    this.networkRequest.appendQuery('type', listingType);
  }

}
