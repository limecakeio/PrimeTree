import { Component, Output, EventEmitter } from '@angular/core';

import { ListingController } from '../listing.controller';
import { ListingRequest } from '../listing.request';
import { ListingRepository } from '../listing.repository';
import { FormService } from '../../../../form/forms.service';
import { Message, MessageService } from '../../../../shared/message.service';
import { FilterListItem } from '../../../../form/elements/filter-list/filter-list.component';

import { StatisticsService } from '../../../../shared/statistics.service';

/**An uniform filter criteria interface. All form elements work on a singelton object that implements this interface. */
export interface FilterCriteria {
  location : string[];
  type : string[];
  kind : string;
  price_min : number;
  price_max : number;
}

@Component({
  selector: 'listing-filter',
  templateUrl: './filter.component.html',
  styleUrls: [ './filter.component.css' ],
  providers: [
    FormService
  ]
})
export class ListingFilterComponent {

  public price_min : number;

  public price_max : number;

  public model : FilterCriteria = {
    location : [],
    kind : '',
    price_max : 0,
    price_min: 0,
    type : []
  }

  public lisitingTypes : FilterListItem[] = [
    {
      displayText: 'Verkauf',
      value: 'SaleOffer'
    } , {
      displayText: 'Mitfahrgelegenheitsangebot',
      value: 'RideShareOffer'
    } , {
      displayText: 'Dienstleistungsangebote',
      value: 'ServiceOffer'
    } , {
      displayText: 'Kaufanfrage',
      value: 'PurchaseRequest'
    } , {
      displayText: 'Freizeitaktivität',
      value: 'RecreationRequest'
    } , {
      displayText: 'Dienstleistungsgesuch',
      value: 'ServiceRequest'
    } , {
      displayText: 'Ausleihe',
      value: 'BorrowRequest'
    } , {
      displayText: 'Mitfahrgelegenheitsgesuch',
      value: 'RideShareRequest'
    }
  ];

  public listingKinds : FilterListItem[] = [{
    value: 'offer',
    displayText: 'NUR ANGEBOTE'
  }, {
    displayText: 'NUR GESUCHE',
    value: 'request'
  }];

  public selectAllTypes : FilterListItem = {
    value: 'Alle Inserattypen selektieren'
  };

  private listingRequest : ListingRequest;

  constructor(
    private formService : FormService,
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private statisticsService : StatisticsService,
    private messageService : MessageService
  ) {
     this.listingRequest = this.listingController.listingRequest();
     this.formService.model = this.model;
  }

  /**Let the listing repository apply the filter criteria. */
  public filterChanged() :  void {
    this.listingRepository.applyFilter(this.model);
  }

  /**Closes the filter and resets the overview component view. */
  public closeFilter() : void {
    this.messageService.sendMessage({
      message : "resetViewport"
    });
  }

}
