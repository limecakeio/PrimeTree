import { Injectable } from '@angular/core';
import { NetworkRequest } from './network.request';
import { Observable } from 'rxjs/Observable';
import { Response, Request } from '@angular/http';

export abstract class NetworkService {

  public abstract send(request : NetworkRequest) : Observable<Response>;

  networkRequest() : NetworkRequest {
    let request : NetworkRequest = new NetworkRequest();
    request
    .setHostname('141.19.145.175')
    .setPort(8080);
    return request;
  };

}
