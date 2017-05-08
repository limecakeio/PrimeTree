import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Request, RequestMethod, Headers, Response } from '@angular/http';
import { NetworkRequest } from './network.request';
import { SecurityModel } from '../security/security.model';

@Injectable()
export class NetworkService {

  constructor(private http : Http, private security : SecurityModel) {  }

  /** sends the request to the server with the specified data
   * @argument { NetworkRequest } request request which will be send
   * @return {Observable<Response>}
   */
  send(request : NetworkRequest) : Observable<Response> {
    console.log('send')
    if (request.hasHeaders() || this.security.isAuthenticated()) {
      let headers = new Headers();
      let headerArray = request.getHeaders();
      headerArray.forEach(header => {
        headers.append(header.key, header.value);
      });
      headers.append(this.security.getKey(), this.security.getSecret());
      return this.sendRequestWithHeaders(request, headers);
    } else {
      return this.sendRequest(request);
    }
  }

  private sendRequest(request : NetworkRequest) : Observable<Response> {
    console.log(request);
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: true
    }));
  }

  private sendRequestWithHeaders(request : NetworkRequest, headers : Headers) : Observable<Response> {
    console.log('headers');
    console.log(request);
    console.log(headers);
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: true,
      headers: headers
    }));
  }

  /** Returns a new instance of @class {NetworkRequest}
   * @return { NetworkRequest } a new instance of NetworkRequest
   */
  public networkRequest() : NetworkRequest {
    return new NetworkRequest();
  }


}
