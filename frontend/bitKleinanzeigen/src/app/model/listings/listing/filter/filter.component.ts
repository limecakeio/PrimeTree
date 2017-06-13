import { Component, Output, EventEmitter } from '@angular/core';

import { ListingController } from '../listing.controller';
import { ListingRequest } from '../listing.request';
import { ListingRepository } from '../listing.repository';
import { FormService } from '../../../../form/forms.service';
import { Message, MessageService } from '../../../../shared/message.service';
import { FilterListItem } from '../../../../form/elements/filter-list/filter-list.component';

import { StatisticsService } from '../../../../shared/statistics.service';

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

  public showOverlay : boolean = true;

  public hideFilterOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  public price_min : number;

  public price_max : number;

  public model : FilterCriteria = {
    location : [],
    kind : '',
    price_max : 0,
    price_min: 0,
    type : []
  }

  public loactionList : string[] = [
    "Mannheim",
    "Heidelberg",
    "Köln",
    "Nürnberg",
    "München",
    "Zug"
  ];

  public lisitingTypes : FilterListItem[] = [
    {
      displayText: 'Gegenstandsangebot',
      value: 'SaleOffer'
    } , {
      displayText: 'Dienstleistungsangebote',
      value: 'ServiceOffer'
    } , {
      displayText: 'Mitfahrgelegenheitsangebot',
      value: 'RideShareOffer'
    } , {
      displayText: 'Verleih',
      value: 'BorrowRequest'
    } , {
      displayText: 'Gegenstandsgesuch',
      value: 'PurchaseRequest'
    } , {
      displayText: 'Mitfahrgelegenheitsgesuch',
      value: 'RideShareRequest'
    } , {
      displayText: 'Freizeitangebote (wiederkehrend)',
      value: 'ReoccuringRecreationRequest'
    } , {
      displayText: 'Freizeitangebote (einmalig)',
      value: 'SingleRecreationRequest'
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

  @Output() hideOverlay : EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formService : FormService,
    private listingController : ListingController,
    private listingRepository : ListingRepository,
    private statisticsService : StatisticsService
    // private MessageService : MessageService
  ) {
     this.listingRequest = this.listingController.listingRequest();
     this.formService.model = this.model;
    //  this.loactionList = this.statisticsService.statistics.
  }

  public closeFilterOverlay() : void {
    this.hideOverlay.emit();
  }

  public filterChanged() : void {
    this.listingRepository.applyFilter(this.model);
  }

}
