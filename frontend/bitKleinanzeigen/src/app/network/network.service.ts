import { Injectable } from '@angular/core';
import { NetworkRequest, NetworkHeader } from './network.request';
import { Observable } from 'rxjs/Observable';
import { Response, Request } from '@angular/http';

export abstract class NetworkService {

  protected securityHeader : NetworkHeader;

  protected securityActive : boolean = false;

  /** Adds a specific security header for all following requests.
   * Example: setSecurityHeader('x-security', '123abc')
   */
  public setSecurityHeader(field : string, value : string) {
    this.securityHeader = {
      field: field,
      value: value
    };
    this.securityActive = true;
  }

  /**Sends the request to the server and returns an Observable which holds the response for this request */
  public abstract send(request : NetworkRequest) : Observable<Response>;

  /** Returns the server address as: protocol://ip:port*/
  public abstract getServerAddress() : string;

  /**Returns a NetworkRequest with all neccesary fields set to reach the server.*/
  public abstract networkRequest() : NetworkRequest;

}
