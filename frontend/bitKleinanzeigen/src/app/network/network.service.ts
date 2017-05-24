import { Injectable } from '@angular/core';
import { NetworkRequest } from './network.request';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

export abstract class NetworkService {

  send(request : NetworkRequest) : Observable<Response> {
    return new Observable<Response>();
  };

  networkRequest() : NetworkRequest {
    return new NetworkRequest();
  };

}
