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


@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: [ './listing.component.css' ]
})
export class ListingComponent {

  @Output() closeOverlay : EventEmitter<void> = new EventEmitter<void>();

  @Input() listing : Listing;

  

  constructor(

  ) {

  }

}
