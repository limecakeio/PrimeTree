import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SecurityModel } from '../../security/security.model';
import { NetworkRequest } from '../../network/network.request';
import { User } from '../../login/login.model';
import 'rxjs/add/operator/map';

@Injectable()
export class SecurityService {

  constructor(private http : Http) {  }

  private sendRequest1(verb : RequestMethod, url : string, body? : any) : Observable<Response> {
    return this.http.request(new Request({
      method: verb,
      url: url,
      body: body,
      withCredentials: true
    }));
  }

  private sendRequestWithHeaders1(verb : RequestMethod, url : string, body: any, headers : Headers) : Observable<Response> {
    return this.http.request(new Request({
      method: verb,
      url: url,
      body: body,
      withCredentials: true,
      headers: headers
    }));
  }

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
