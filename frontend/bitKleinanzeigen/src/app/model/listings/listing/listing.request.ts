import { NetworkRequest, NetworkService } from '../../../network/network';

export class ListingRequest {

  private networkRequest : NetworkRequest;

  constructor(
    networkRequest : NetworkRequest
  ) {
    this.networkRequest = networkRequest;
  }

  public getRequest() : NetworkRequest {
    return this.networkRequest;
  }

}
