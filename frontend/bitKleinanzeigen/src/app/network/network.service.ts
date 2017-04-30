import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Request, RequestMethod, Headers, Response } from '@angular/http';
import { NetworkRequest } from './network.request';
import { SecurityModel } from '../security/security.model';

@Injectable()
export class NetworkService {

  constructor(private http : Http, private security : SecurityModel) {  }

  send(request : NetworkRequest) : Observable<Response> {
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
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: false
    }));
  }

  private sendRequestWithHeaders(request : NetworkRequest, headers : Headers) : Observable<Response> {
    return this.http.request(new Request({
      method: request.getHttpMethod(),
      url: request.getUrl(),
      body: request.getBody(),
      withCredentials: false,
      headers: headers
    }));
  }

  public networkRequest() : NetworkRequest {
    return new NetworkRequest();
  }


}
