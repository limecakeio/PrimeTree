import { Component, Input, OnInit } from '@angular/core';

import { Listing } from './listing.model';

@Component({
  selector: 'listing-preview',
  templateUrl: './listing-preview.component.html',
  styleUrls: [ './listing-preview.component.css' ]
})
export class ListingPreviewComponent implements OnInit {

  @Input() listing : Listing;

  public listingDetailViewLink : string;

  ngOnInit() : void {
    this.listingDetailViewLink = '/listing/' + this.listing.id;

  }

}
