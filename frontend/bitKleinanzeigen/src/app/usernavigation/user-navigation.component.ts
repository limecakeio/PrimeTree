import { Component } from '@angular/core';
import { SecurityModel } from '../security/security.model';
import { Router } from '@angular/router';
import { LoginService } from '../login/network/login.service';

@Component({
  selector: 'user-nav',
<<<<<<< HEAD
  templateUrl: './user-navigation.component.html'
=======
  templateUrl: 'user-navigation.component.html'
>>>>>>> a0cfd9909733ece4b2bb3755c28934ced8d430ec
})
export class UserNavigationComponent {

  isAuthenticated : any;

  constructor(public securityModel : SecurityModel,
    private router : Router,
    private loginService : LoginService) {
    this.isAuthenticated = this.securityModel.authenticated;
  }

  create() : void {
    this.router.navigate(['create/sellitem']);
  }

  home() : void {
    this.router.navigate(['home']);
  }

  logout() : void {
    this.loginService.logout().subscribe(res => {
      this.securityModel.authenticated = false;
      this.router.navigate(['']);
    });
  }

}
