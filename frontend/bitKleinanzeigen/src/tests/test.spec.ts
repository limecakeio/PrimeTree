import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { NetworkService } from '../app/network/network.service';
import { RESTNetworkService } from '../app/network/rest-network.service';

import { AuthenticationController } from '../app/authentication/authentication.controller';
import { UserService } from '../app/model/user/user.service';
import { StatisticsService } from '../app/shared/statistics.service';
import { UserController } from '../app/model/user/user.controller';
import { StatisticsController } from '../app/shared/statistics.controller';

describe('Test', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        }, {
          provide: NetworkService,
          useClass: RESTNetworkService
        },
        AuthenticationController,
        UserService,
        StatisticsService,
        UserController,
        StatisticsController
      ]
    });
  });

  it(
    'blablabla',
  inject([XHRBackend],
  (mockBackend : MockBackend) => {
  it('should authenticate a valid user', ()=>{

    mockBackend.connections.subscribe((connection : any) => {
      connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({

          })
        })
      ));
    });

    expect(true).toBe(true);
  })
  }));

});
