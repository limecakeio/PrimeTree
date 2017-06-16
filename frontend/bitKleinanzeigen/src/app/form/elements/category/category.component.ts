import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Category } from '../../../model/listings/request/recreation-request/category.model';

import { FormContextService } from '../../form-context.service';

interface CategoryOptions {
  name : string;
  value : string;
}

@Component({
  selector: 'form-element-category',
  templateUrl: './category.component.html'
})
export class CategoryFormComponent {

  public isModelAvailable : boolean = false;

  public categoryOptions : CategoryOptions[] = [
    {
      name: 'Sport',
      value: Category.Sport
    }, {
      name: 'Sozial',
      value: Category.Social
    }, {
      name: 'Outdoors',
      value: Category.Outdoors
    }, {
      name: 'Event',
      value: Category.Events
    }
  ];

  form : FormGroup;

  model : any;

  data : any;

  constructor(
    private formContextService : FormContextService
  ) {
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.formContextService.getContext().subscribe(() => {
      this.model = this.formContextService.model;
      if (!this.model.category) {
        this.model.category = null;
      }
      this.form.addControl('category', new FormControl('category', Validators.required));
      this.isModelAvailable = true;
    })
  }

}
