import { Injectable } from '@angular/core';


import { MessageService, Message } from '../../../../shared/message.service';
import { ListingList } from '../listing.list';
import { ListingController } from '../listing.controller';

// BUG: Angular bug or dump behavior: Angular creates services in @NgModule
// BUG: when the first component is instanciated that inject this service via dependancy injection.
// BUG: An service that needs services itself cannot be created directly as a useValue.

@Injectable()
export class ListingSearchService {

  public listingSearchResults : ListingList;

  constructor(
    private messageService : MessageService,
    private listingController : ListingController,
  ) {
    // console.log('ListingSearchService')
    this.messageService.getObservable().subscribe((message : Message) => {
      console.log(message)
      if (message.message === 'ListingSearch') {
        this.listingController.searchListings(message.payload).subscribe((listingList : ListingList) => {
          this.listingSearchResults = listingList;
        });
      }
    });
  }

}
