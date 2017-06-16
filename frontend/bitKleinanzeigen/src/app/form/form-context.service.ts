import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AsyncContextService } from '../shared/async-context.service';

/** This class shares a form, a model object and a data object between one ListingFromComponent and multiple form elements.*/
@Injectable()
export class FormContextService extends AsyncContextService {

  form : FormGroup = new FormGroup({});

  model : any;

  data : any = {};

  constructor() {
    super();
  }

  /**Puts the object into context between all components who share the same context. */
  /**Components who need to be in  the same context needs to subscribe to getContext(). */
  public putIntoContext(object : any) : void {
    this.model = object;
    super.putIntoContext(object);
  }

}
