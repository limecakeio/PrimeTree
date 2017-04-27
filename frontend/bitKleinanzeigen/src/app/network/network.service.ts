import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Request, RequestMethod, Headers, Response } from '@angular/http';
import { NetworkRequest } from './network.request';

@Injectable()
export class NetworkService {

  constructor(private http : Http) {  }

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


}
