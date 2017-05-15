import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user/user.model';
import { LoginService } from './network/login.service';
import { SecurityModel } from '../security/security.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [  ]
})
export class LoginComponent implements OnInit {
  user : User = new User();
  form : FormGroup;
  formSubmitted : boolean = false;

  constructor(private login : LoginService, private securityService : SecurityModel, private router : Router) {  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  authenticate() {
    if (this.form.valid) {
      // this.securityService.username = this.user.username;
      this.securityService.username = this.user.username;
      this.securityService.password = this.user.password; // BUG: Remove it, only for mock backend
      this.login.login(this.user).subscribe((response : boolean) => {
        // console.log('next')
        this.securityService.username = this.user.username;
        this.securityService.authenticated = true;
        this.router.navigate(['home']);
      }, (error : any) => {
        // console.log('error')
        this.securityService.authenticated = false;
      }, () => {
        // console.log('complete')
        this.router.navigate(['home']);
      })
    }
  }

  logout() {
    this.login.logout().subscribe(res => {

    });
  }

}
