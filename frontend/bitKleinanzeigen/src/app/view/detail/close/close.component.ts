import { Component, Input, OnChanges } from '@angular/core';

import { Message, MessageService } from '../../../shared/message.service';
import { DetailViewService } from '../detail.service';

@Component({
  selector: 'view-detail-close',
  templateUrl: './close.component.html',
  styleUrls: [ './close.component.css' ]
})
export class CloseDetailViewComponent {

  public isDataAvailable : boolean = false;

  constructor(
    private detailViewService : DetailViewService,
    private messageService : MessageService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.isDataAvailable = true;
    });
  }

  public closeDetailViewOverlay() : void {
    this.messageService.sendMessage({
      message: 'hideDetailView'
    });
  }


}
