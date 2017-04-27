import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Listing, Offering, SellItem } from '../model/listing.model';
import { ListingRequest } from '../network/listing.controller';

@Component({
  selector: 'createListingForm',
  templateUrl: 'createListingForm.component.html',
  styleUrls: ['createListingForm.component.css']
})
export class CreateListingFormComponent implements OnInit {
  listing : SellItem = new SellItem();
  form: FormGroup;
  formSubmitted : boolean = false;

  constructor(private network : ListingRequest) {
  //  this.listing.title = 'efeag';
  //  this.listing.description = 'Ist ein Mensch';
  //  this.listing.price = 5000;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[0-9\.]+$")]))
    });
  }

  submitListing(form?: any) : void {
    if (this.form.valid) {
      this.network.postListing('SellItem', this.listing).subscribe(res => console.log(res));
      this.formSubmitted = true;
    }
  }

  test(form? : any) : void {
    console.log('Inserat get test');
    this.network.getListing().subscribe(res => console.log(res));
  }

}
