import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListingDescriptorHandler } from '../listing-descriptor.handler';
import { ListingModule } from '../listing.module';
import { ListingController } from '../listing.controller';
import { Listing } from '../listing.model';

/**Base listing detail view component. */
@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: [ './listing.component.css' ]
})
export class ListingComponent {

  // TODO: remove this, lock up the spelling
  // IDEA: Use this component or the whole Listing type as a type for miscancalios listings.

  // @Output() closeOverlay : EventEmitter<void> = new EventEmitter<void>();

  @Input() listing : Listing;



  constructor(

  ) {

  }

}
