import { Component } from '@angular/core';

import { MessageService, Message } from './message.service';

@Component({
  selector: 'notify',
  templateUrl: './notify.component.html',
  styleUrls: [ './notify.component.css' ]
})
export class NotifyComponent {

  public notifyMessage : string;

  public displayMessage : boolean = true;

  constructor(
    private messageService : MessageService
  ) {
    this.messageService.getObservable().subscribe((message : Message) => {
      if (message.message === 'notify') {
        if (typeof message.payload === 'string') {
          this.displayMessage = true;
          this.notifyMessage = message.payload;
        }
      }
    });
  }

  public hideNotify() : void {
    this.displayMessage = false;
    this.notifyMessage = '';
  };

}
