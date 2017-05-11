import { Component, OnInit } from '@angular/core';
import { Listing } from '../../model/listings/listing.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormElementsService } from '../formElements.service';

@Component({
  selector: 'input-price',
  templateUrl: './price.component.html'
  // styleUrls: ['../elements.form.css']
})
export class PriceFormComponent implements OnInit {
  form : FormGroup;
  model : any;

  constructor(private service : FormElementsService) {
    this.form = this.service.form;
    this.model = this.service.model;
  }

  ngOnInit() {
    this.form.addControl('price', new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9\.]+$")])))
  }
}
