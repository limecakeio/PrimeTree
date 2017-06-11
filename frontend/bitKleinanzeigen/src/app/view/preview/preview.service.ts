import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PreviewService {

  private subject : Subject<any>;

  private observable : Observable<any>;

  constructor() {
    this.subject = new Subject<any>();
    this.observable = this.subject.asObservable();
  }

  public sendModelToObservers(model : any) : void {
    this.subject.next(model);
  }

  public getModelObservable() : Observable<any> {
    return this.observable;
  }


}
