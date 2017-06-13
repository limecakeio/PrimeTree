import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { NetworkRequest } from '../../app/network/network.request';
import { RESTNetworkService } from '../../app/network/rest-network.service';

describe('RESTNetworkService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        RESTNetworkService
      ]
    });
  });

  it('should return an Observable', inject([RESTNetworkService, XHRBackend],   (rESTNetworkService : RESTNetworkService, mockBackend : MockBackend) => {

    const mockResponse = {
          data: [
            { id: 0, name: 'Video 0' },
            { id: 1, name: 'Video 1' },
            { id: 2, name: 'Video 2' },
            { id: 3, name: 'Video 3' },
          ]
        };

    mockBackend.connections.subscribe((connection : any) => {
      connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })
      ));
    });

      expect(rESTNetworkService.send(new NetworkRequest()) instanceof Observable).toBe(true);
    }
  ));

});
