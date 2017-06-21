import { Injectable } from '@angular/core';


import { MessageService, Message } from '../../../../shared/message.service';
import { ListingList } from '../listing.list';
import { ListingController } from '../listing.controller';

// BUG: Angular bug: Angular creates services in @NgModule
// BUG: when the first component is instanciated that inject this service via dependancy injection.
// BUG: An service that needs services itself cannot be created directly as a useValue.

@Injectable()
export class ListingSearchService {

  public listingSearchResults : ListingList;
  public searchTerm : string;

  constructor(
    private messageService : MessageService,
    private listingController : ListingController,
  ) {
    this.messageService.getObservable().subscribe((message : Message) => {
      if (message.message === 'ListingSearch') {
        this.listingController.searchListings(message.payload).subscribe((listingList : ListingList) => {
          this.searchTerm = message.payload;
          this.listingSearchResults = listingList;
        });
      }
    });
  }

}
