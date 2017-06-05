import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';

import { PreviewService } from '../../../../view/preview/preview.service';

import { Listing } from '../listing.model';

@Component({
  selector: 'listing-preview',
  templateUrl: './listing-preview.component.html',
  styleUrls: [ './listing-preview.component.css' ],
  providers: [
    PreviewService
  ]
})
export class ListingPreviewComponent implements OnChanges {

  @Input() listing : Listing = null;

  @Output() showListingDetailView : EventEmitter<number> = new EventEmitter<number>();

  public listingDetailViewLink : string;

  constructor(
    public previewService : PreviewService
  ) {

  }

  public previewClick(event : Event) {
    this.showListingDetailView.emit(this.listing.id);
  }

  // ngOnInit() : void {
  //   this.listingDetailViewLink = '/listing/' + this.listing.id;
  // }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    console.log(this.listing, 'ListingPreviewComponent')
    this.previewService.sendModelToObservers(this.listing);
  }

}
