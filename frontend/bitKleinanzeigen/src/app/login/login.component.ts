import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user/user.model';
import { LoginService } from './network/login.service';
import { SecurityModel } from '../security/security.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [  ]
})
export class LoginComponent implements OnInit {
  user : User = new User();
  form : FormGroup;
  formSubmitted : boolean = false;

  constructor(private login : LoginService, private securityService : SecurityModel) {  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  authenticate() {
    if (this.form.valid) {
      this.login.login(this.user).subscribe((response : Response) => {
        this.securityService.setKey('x-author');
        this.securityService.setSecret('nein');
      })
    }
  }

  logout() {
    // if (this.securityService.isAuthenticated()) {
      console.log('logout');
      this.login.logout().subscribe(res => {
        console.log('logout');
        console.log(res);
        console.log('logout');
      });
    // }
  }

}
