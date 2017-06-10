import { Injectable } from '@angular/core';

import { StatisticsController } from './statistics.controller';

export interface Statistics {

}

@Injectable()
export class StatisticsService {

  public statistics : Statistics;

  constructor(
    private statisticsController : StatisticsController
  ) {  }

  public updateStatistics() : void {
    this.statisticsController.getStatistics().subscribe((statistics : Statistics) => {
      this.statistics = statistics;
      console.log(this.statistics)
    }, (error : Error) => {
      console.error(error);
    });
  }

}
