import { Component, OnInit } from '@angular/core';
import { ListingRequest } from '../network/listing.controller';
import { User } from './login.model';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: []
})
export class LoginComponent implements OnInit {
  user : User = new User();
  form : FormGroup;
  formSubmitted : boolean = false;

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  authenticate(loginForm? : FormGroup) {
    if (this.form.valid) {
      console.log(this.form.controls);
    }
  }

}
