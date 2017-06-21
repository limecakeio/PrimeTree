import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle,
  SafeUrl
} from '@angular/platform-browser';
import { Router } from '@angular/router';

import { BorrowRequest } from './borrow-request.model';
import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { PreviewService } from '../../../../view/preview/preview.service';
import { MessageService, Message } from '../../../../shared/message.service';

import { DateProperty } from '../../../../view/preview/date/date.component';

@Component({
  selector: 'borrow-request-preview',
  templateUrl: './borrow-request-preview.component.html',
  // styleUrls: [ '../../../listing/preview/listing-preview.component.css' ], // JIT
  styleUrls: [ '../../listing/preview/listing-preview.component.css' ], // AOT
  providers: [
    PreviewService
  ]
})
export class BorrowRequestPreviewComponent extends ListingPreviewComponent implements OnChanges, OnInit {

  @Input() listing : BorrowRequest = null;

  public borrowFromDate : DateProperty = {
    propertyName : 'borrowFromDate',
    displayText: 'Von: '
  }

  public borrowToDate : DateProperty = {
    propertyName : 'borrowToDate',
    displayText: 'Bis: '
  }

  isOwner : boolean = false;

  image : SafeStyle;

  imagesrc : SafeUrl = '';

  constructor(
    private domSanitizer : DomSanitizer,
    private router : Router,
    public previewService : PreviewService,
    public messageService : MessageService
  ) {
    super(previewService, messageService);
  }

  ngOnInit() : void {
  //   if (this.listing.mainImage) {
  //     this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
  //   }
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    this.previewService.sendModelToObservers(this.listing);
  }
}
