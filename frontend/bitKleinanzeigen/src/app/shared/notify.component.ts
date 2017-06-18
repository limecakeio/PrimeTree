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
  public messageType : string; //success or error
  public messageBoard : any[] = [];

  constructor(
    private messageService : MessageService
  ) {
    this.messageService.getObservable().subscribe((message : Message) => {
      if (message.message.indexOf('notify') !== 0) {
        return;
      }
      let notification : string;
      let notificationType : string;
      if (message.message === 'notify-sucess') {
        // this.displayMessage = true;
        // this.notifyMessage = message.payload;
        notificationType = 'success'
      } else if (message.message === 'notify-error') {
        // this.displayMessage = true;
        // this.notifyMessage = message.payload;
        notificationType= 'error';
      }
      notification = message.payload;
      let announcement : any = {
        type: notificationType,
        notification: notification
      }
      this.messageBoard.push(announcement);
      setTimeout(() => {
        this.messageBoard = this.messageBoard.filter((message) => {
          return message !== announcement;
        });
      }, 5000);
    });
  }

  public hideNotify() : void {
    this.displayMessage = false;
    this.notifyMessage = '';
  };

}
