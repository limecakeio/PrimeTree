import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NetworkService, NetworkRequest, NetworkHeader, NetworkQuery, RequestMethod, Response } from '../network/network';
import { Statistics } from './statistics.service';

@Injectable()
export class StatisticsController {

  constructor(
    private networkService : NetworkService
  ) {  }

  public getStatistics() : Observable<Statistics> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('statistics');
    return this.networkService.send(networkRequest).map((response : Response) => {
      // TODO: Create a abstract factory
      return response.json();
    });
  }

}
