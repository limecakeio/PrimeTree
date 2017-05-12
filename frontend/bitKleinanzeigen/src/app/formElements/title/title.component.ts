import { Component, OnInit } from '@angular/core';
import { FormElementsService } from '../formElements.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'input-title',
  templateUrl: './title.component.html'
  // styleUrls: ['../elements.form.css']
})
export class TitleFormComponent implements OnInit {
  model : any;
  form : FormGroup;

  constructor(private service : FormElementsService) {
    this.form = this.service.form;
    this.model = this.service.model;
    if (typeof this.model.title === 'undefined') {
      this.model.title = '';
    }
  }

  ngOnInit() {
    this.service.addFormControl('title', new FormControl('title', Validators.required));
  }
}
