import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

/**This service creates a shared async context between one or multiple components. */
@Injectable()
export class AsyncContextService {

  private contextSubject : Subject<any> = new Subject<any>();

  private contextObservable : Observable<any> = this.contextSubject.asObservable();

  /**Sends the argument object to all subscribers that share this class. */
  public putIntoContext(object : any) : void {
    this.contextSubject.next(object);
  }

  public getContext() : Observable<any> {
    return this.contextObservable;
  }


}
