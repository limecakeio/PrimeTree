import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**Creates a shared context between a model class and multiple subscribers.*/
@Injectable()
export class DetailViewService {

  private detailViewSubject : Subject<any> = new Subject<any>();

  private detailViewObservable : Observable<any> = this.detailViewSubject.asObservable();

  public sendModelToSubscribers(model : any) : void {
    this.detailViewSubject.next(model);
  }

  /** Returns an Observable to capture the model, when it is ready*/
  public getModel() : Observable<any> {
    return this.detailViewObservable;
  }
}
