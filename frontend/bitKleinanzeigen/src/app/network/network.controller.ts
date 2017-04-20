import { Listing } from '../model/listing.model';
import { Observable } from 'rxjs/Observable';
import { RESTService } from './rest.service';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

export enum HttpMethod {
    GET, POST, PUT, DELETE
}

@Injectable()
export class NetworkRequest {

  private query : string = '?';
  private hasQuery : boolean = false;

  private path : string = '';
  private hasPath : boolean = false;

  private baseUrl : string = '';

  private method : HttpMethod;

  private port : number;
  private hasPort : boolean = false;

  private body : any;

  constructor(private networkService : RESTService) {
    this.networkService.setBaseUrl('http://localhost');
  }

  addQuery(key : string, value : string) : NetworkRequest {
    if (this.hasQuery) {
      this.query += '&';
    } else {
      this.hasQuery = true;
    }
    this.query += key + '=' + value;
    return this;
  }

  addPath(path : string) : NetworkRequest {
    if (!this.hasPath) {
      this.hasPath = true;
      this.path += path;
    } else {
      this.path += '/' + path;
    }
    return this;
  }

  setPort(port : number) : NetworkRequest {
    this.port = port;
    this.hasPort = true;
    return this;
  }

  setBaseUrl(url : string) : NetworkRequest {
    this.baseUrl = url;
    return this;
  }

  setHttpMethod(method : HttpMethod) : NetworkRequest {
    this.method = method;
    return this;
  }

  setPOSTRequest() : NetworkRequest {
    this.method = HttpMethod.POST;
    return this;
  }

  setGETRequest() : NetworkRequest {
    this.method = HttpMethod.GET;
    return this;
  }

  setBody(body : any) : NetworkRequest {
    this.body = body;
    return this;
  }

  private buildUrl() : string {
    let url = this.baseUrl;
    if (this.hasPort) {
      url += ':' + this.port;
    }
    if (this.hasPath) {
      url += '/' + this.path;
    }
    if (this.hasQuery) {
      url += this.query;
    }
    return url;
  }

  private reset() : void {
      this.path = '';
      this.query = '?';
      this.hasQuery = false;
      this.hasPath = false;
      this.hasPort = false;
  }

  sendRequest() : Observable<Response> {
    let url : string = this.buildUrl();
    let response : Observable<Response>;
    switch(this.method) {
      case HttpMethod.GET:
        response = this.networkService.get(url);
        break;
      case HttpMethod.POST:
        response = this.networkService.post(url, this.body);
        break;
      default:
        throw new Error('HttpMethod is missing!');
    }
    this.reset();
    return response;
  }

}
