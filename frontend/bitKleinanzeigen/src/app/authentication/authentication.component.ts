import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { AuthenticationController } from './authentication.controller';
import { User, UserService, Employee } from '../model/user/user';

import { Message, MessageService } from '../shared/message.service';

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
    private router : Router,
    private  messageService : MessageService
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
      this.form.reset();
      this.router.navigate(['home']);
    }, (error : Error) => {
      if(error.toString().indexOf('401') > -1) {
        this.messageService.sendMessage({
          message: 'notify-error',
          payload: 'Falscher Benutzername oder Kennwort.'
        })
      } else {
        this.messageService.sendMessage({
          message: 'notify-error',
          payload: 'Die Verbindung zum Server ist gescheitert.'
        })
      }
      this.form.reset();
  });
}
}
