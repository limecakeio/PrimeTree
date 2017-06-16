import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StatisticsController } from './statistics.controller';

/**Describes all server data. */
export interface Statistics {

  locations : {
    locationName : string,
    numberOfListings : number
  }[];

  numberOfListings : string;
  numberOfActiveListings : string;
  numberOfInactiveListings : string;

  listingTypes : {
    listingTypeName : string,
    numberOfListings : number
  }[];

  numberOfUsers : number;
  numberOfAdmins : number;
}

/**Shares information about the server date. */
@Injectable()
export class StatisticsService {

  public statistics : Statistics;

  constructor(
    private statisticsController : StatisticsController
  ) {  }

  /**Updates the statistic from the server, accessible over statistic. Can receive a callback which has the newest statistic from the server as a parameter.  */
  public updateStatistics(callback ? : (statistics : Statistics) => void) : void {
    this.statisticsController.getStatistics().subscribe((statistics : Statistics) => {
      this.statistics = statistics;
      if (callback) {
        callback(statistics);
      }
    }, (error : Error) => {
      console.error(error);
    });
  }

}
