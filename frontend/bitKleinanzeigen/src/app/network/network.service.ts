import { Injectable } from '@angular/core';
import { NetworkRequest, NetworkHeader } from './network.request';
import { Observable } from 'rxjs/Observable';
import { Response, Request } from '@angular/http';

export abstract class NetworkService {

  protected securityHeader : NetworkHeader;

  protected securityActive : boolean = false;

  public setSecurityHeader(field : string, value : string) {
    this.securityHeader = {
      field: field,
      value: value
    };
    this.securityActive = true;
  }

  public abstract send(request : NetworkRequest) : Observable<Response>;

  /** Returns the server address as: protocol://ip:port*/
  public abstract getServerAddress() : string;

  networkRequest() : NetworkRequest {
    let request : NetworkRequest = new NetworkRequest();
    request
    .setHostname('141.19.145.175')
    .setPort(8080);
    return request;
  };



}
