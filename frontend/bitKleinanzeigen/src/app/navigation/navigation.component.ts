import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationController } from '../authentication/authentication';
import { UserService } from '../model/user/user.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isAuthenticated : boolean;

  constructor(
    private router : Router,
    private authenticationController : AuthenticationController,
    public userService : UserService
  ) {
    this.isAuthenticated = this.userService.authenticated;
  }

  create() : void {
    console.log(this.router.config, 'routerconfig')
    this.router.navigate(['listing/create/SaleOffer']);
  }

  home() : void {
    this.router.navigate(['home']);
  }

  logout() : void {
    this.authenticationController.logout().subscribe(() => {
      this.userService.authenticated = false;
      this.router.navigate(['login']);
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

}
