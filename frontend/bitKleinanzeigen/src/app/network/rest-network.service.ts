import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Request, RequestMethod, Headers, Response } from '@angular/http';

import { NetworkService } from './network.service';
import { NetworkRequest } from './network.request';

@Injectable()
export class RESTNetworkService extends NetworkService {

  constructor(
    private http : Http
  ) {
    super();
  }

  /** sends the request to the server with the specified data
   * @argument { NetworkRequest } request request which will be send
   * @return {Observable<Response>}
   */
  send(request : NetworkRequest) : Observable<Response> {
    if (this.securityActive) {
      request.addHeader(this.securityHeader.field, this.securityHeader.value);
    }
    console.log(request, request.getUrl())
    if (request.headerCount()) {
      let headers = new Headers();
      let headerArray = request.getHeaders();
      headerArray.forEach(header => {
        headers.append(header.key, header.value);
      });
      return this.sendRequestWithHeaders(request, headers);
    } else {
      return this.sendRequest(request);
    }
  }

  private sendRequest(request : NetworkRequest) : Observable<Response> {
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: true
    }));
  }

  private sendRequestWithHeaders(request : NetworkRequest, headers : Headers) : Observable<Response> {
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: true,
      headers: headers
    }));
  }

  /** Returns a new instance of NetworkRequest with hostname and port already set accordingly the main network information.
   * @return { NetworkRequest } a new instance of NetworkRequest
   */
  public networkRequest() : NetworkRequest {
    let request : NetworkRequest = new NetworkRequest();
    request.setHostname('141.19.157.70')
    .setPort(8080)
    // .addPath('bitServer');
    return request;
  }

  public getServerAddress() : string {
    return 'http://141.19.157.70:8080';
  }


}
