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

  public sendMessage(message : Message) {
    this.messageSubject.next(message);
  }

  public getObservable() : Observable<Message> {
    return this.messageObservable;
  }

}
