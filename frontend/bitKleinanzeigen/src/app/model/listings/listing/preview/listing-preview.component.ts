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

import { MessageService, Message } from '../../../../shared/message.service';

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

  public listingDetailViewLink : string;

  constructor(
    public previewService : PreviewService,
    public messageService : MessageService
  ) {

  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    this.previewService.sendModelToObservers(this.listing);
  }

  /**Sends a  */
  public displayListingDetail() {
    this.messageService.sendMessage({
      message: 'displayListingDetail',
      payload: this.listing.id
    });
  }

}
