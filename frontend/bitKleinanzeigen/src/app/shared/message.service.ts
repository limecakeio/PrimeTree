import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface Message {
  message : string;
  payload? : any;
}

@Injectable()
export class MessageService {

  private messageSubject : Subject<Message> = new Subject<Message>();

  private messageObservable : Observable<Message> = this.messageSubject.asObservable();

  /**Sends a message to all subscribers of this service.*/
  public sendMessage(message : Message) {
    this.messageSubject.next(message);
  }

  /**Returns an Observable. Subscribers receive Messages send from other components with sendMessage. */
  public getObservable() : Observable<Message> {
    return this.messageObservable;
  }

}
