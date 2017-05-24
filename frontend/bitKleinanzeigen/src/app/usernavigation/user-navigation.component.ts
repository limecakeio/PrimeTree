import { Component } from '@angular/core';
import { SecurityModel } from '../security/security.model';
import { Router } from '@angular/router';
import { LoginService } from '../login/network/login.service';

@Component({
  selector: 'user-nav',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
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
      this.securityModel.username = '';
      this.router.navigate(['']);
    });
  }

}
