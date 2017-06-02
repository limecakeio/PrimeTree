import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { NetworkRequest } from './network.request';
import { NetworkService } from './network.service';
import { MockServer } from './mock.server';

@Injectable()
export class MockNetworkService extends NetworkService {

  private mockServer : MockServer;

  constructor(

  ) {
    super();
    this.mockServer = new MockServer();
  }

  public send(networkRequest : NetworkRequest) : Observable<Response> {
    return this.mockServer.process(networkRequest);
  }

}
