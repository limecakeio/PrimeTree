import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Request, RequestMethod, Headers, Response } from '@angular/http';
import { NetworkService } from './network.service';
import { NetworkRequest } from './network.request';
import { SecurityModel } from '../security/security.model';

@Injectable()
export class RESTNetworkService extends NetworkService {

  constructor(private http : Http, private security : SecurityModel) {
    super(); 
  }

  /** sends the request to the server with the specified data
   * @argument { NetworkRequest } request request which will be send
   * @return {Observable<Response>}
   */
  send(request : NetworkRequest) : Observable<Response> {
    if (request.hasHeaders()) {
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
    // console.log(request);
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: true
    }));
  }

  private sendRequestWithHeaders(request : NetworkRequest, headers : Headers) : Observable<Response> {
    // console.log('headers');
    // console.log(request);
    // console.log(headers);
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
    let request : NetworkRequest = new NetworkRequest();
    request.setHostname('141.19.145.175')
    .setPort(8080);
    return request;
  }


}
