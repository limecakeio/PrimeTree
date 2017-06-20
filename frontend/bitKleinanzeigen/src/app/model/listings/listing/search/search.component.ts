import { Component, Type, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ListingSearchService } from './search.service';
import { ListingInformationService } from '../../listings-information.service'; // remove this
import { Listing } from '../listing.model';
import { ListingList } from '../listing.list';
import { ListingPreviewComponent } from '../preview/listing-preview.component'; // remove this

import { Message, MessageService } from '../../../../shared/message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'listing-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class ListingSearchComponent implements OnDestroy {

  private listingSearchSubscription : Subscription;

  constructor(
    public listingSearchService : ListingSearchService,
    private messageService : MessageService,
    private router : Router
  ) {
    this.listingSearchSubscription = this.messageService.getObservable().subscribe((message : Message) => {
      if (message.message === 'displayListingDetail') {
        this.router.navigate(['home']).then(() => {
          this.messageService.sendMessage(message);
        });
      }
    })
  }


  public updateListingCounter(event : any) : void {

  }

  public ngOnDestroy() : void {
    if (!this.listingSearchSubscription.closed) {
      this.listingSearchSubscription.unsubscribe();
    }
  }
}
