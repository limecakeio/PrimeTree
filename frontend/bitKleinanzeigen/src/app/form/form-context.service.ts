import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AsyncContextService } from '../shared/async-context.service';

@Injectable()
export class FormContextService extends AsyncContextService {

  form : FormGroup = new FormGroup({});

  model : any;

  data : any = {};

  constructor() {
    super();
  }

  public putIntoContext(object : any) : void {
    this.model = object;
    super.putIntoContext(object);
  }

}
