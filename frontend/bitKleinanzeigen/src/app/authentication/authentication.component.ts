import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { AuthenticationController } from './authentication.controller';
import { User, UserService, Employee } from '../model/user/user';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: [ './authentication.component.css' ]
})
export class AuthenticationComponent {

  public user : User;

  public form : FormGroup;

  constructor(
    private authenticationController : AuthenticationController,
    private userService : UserService,
    private router : Router
  ) {
    this.user = this.userService.user;
    this.form = new FormGroup({});
    this.form.addControl('username', new FormControl('username', Validators.required));
    this.form.addControl('password', new FormControl('password', Validators.required));
  }

  /**
   * Authenticates the user with the input credentionals.
   * After receiving the server validation of the credentionals,
   * the user will be forwarded to the listing overview or a message will be displayed.
   */
  public authenticate() : void {
    this.authenticationController.authenticate(this.user).subscribe((employee : Employee) => {
      this.userService.userInformation = employee;
      this.userService.authenticated = true;
      this.router.navigate(['home']);
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

}
