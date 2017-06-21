import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

import { ServiceRequest } from './service-request.model';

import { ListingPreviewComponent } from '../../listing/preview/listing-preview.component';
import { PreviewService } from '../../../../view/preview/preview.service';
import { MessageService, Message } from '../../../../shared/message.service';

@Component({
  selector: 'service-request-preview',
  templateUrl: './service-request-preview.component.html',
  // styleUrls: [ '../../../listing/preview/listing-preview.component.css'], // JIT
  styleUrls: [ '../../listing/preview/listing-preview.component.css'], // AOT
  providers: [
    PreviewService
  ]
})
export class ServiceRequestPreviewComponent extends ListingPreviewComponent implements OnInit {

  @Input() listing : ServiceRequest;

  isOwner : boolean = false;

  image : SafeStyle;

  imagesrc : SafeUrl = '';

  constructor(
    private domSanitizer : DomSanitizer,
    public previewService : PreviewService,
    public messageService : MessageService
  ) {
    super(previewService, messageService);
  }

  ngOnInit() {
    if (this.listing.mainImage) {
      this.imagesrc = this.domSanitizer.bypassSecurityTrustUrl(this.listing.mainImage);
    }
  }
}
