import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StatisticsController } from './statistics.controller';

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

@Injectable()
export class StatisticsService {

  public statistics : Statistics;

  constructor(
    private statisticsController : StatisticsController
  ) {  }

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
