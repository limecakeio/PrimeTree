import {
  Component,
  Input,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { RideShareRequest } from './rideshare-request.model';

import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { PreviewService } from '../../../../view/preview/preview.service';
import { MessageService, Message } from '../../../../shared/message.service';

@Component({
  selector: 'rideshare-request-preview',
  templateUrl: './rideshare-request-preview.component.html',
  styleUrls: [ '../../../listing/preview/listing-preview.component.css'], // JIT
  // styleUrls: [ '../../listing/preview/listing-preview.component.css'], // AOT
  providers: [
    PreviewService
  ]
})
export class RideShareRequestPreviewComponent extends ListingPreviewComponent implements OnInit {

  @Input() listing : RideShareRequest;

  constructor(
    public previewService : PreviewService,
    public messageService : MessageService
  ) {
    super(previewService, messageService);
  }

  ngOnInit() {

  }
}
