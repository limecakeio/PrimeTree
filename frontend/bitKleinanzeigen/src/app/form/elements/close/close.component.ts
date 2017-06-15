import { Component, Input, OnChanges } from '@angular/core';

import { Message, MessageService } from '../../../shared/message.service';
import { FormContextService } from '../../form-context.service';

@Component({
  selector: 'form-element-close',
  templateUrl: './close.component.html',
  styleUrls: [ './close.component.css' ]
})
export class CloseDetailViewComponent {

  public isModelAvailable : boolean = false;

  constructor(
    private formContextService : FormContextService,
    private messageService : MessageService
  ) {
    this.formContextService.getContext().subscribe(() => {
      this.isModelAvailable = true;
    })
  }

  public closeDetailViewOverlay() : void {
    this.messageService.sendMessage({
      message: 'hideListingForm'
    });
  }


}
