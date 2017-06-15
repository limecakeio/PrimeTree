import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationController } from '../authentication/authentication.controller';
import { UserService } from '../model/user/user.service';
import { User } from '../model/user/user.model';
import { MessageService, Message } from '../shared/message.service';

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
    public userService : UserService,
    private messageService : MessageService
  ) {
    this.isAuthenticated = this.userService.authenticated;
  }

  create() : void {
    this.router.navigate(['listing/create/SaleOffer']);
  }

  home() : void {
    this.router.navigate(['home']);
  }

  logout() : void {
    this.authenticationController.logout().subscribe(() => {
      this.userService.authenticated = false;
      this.userService.user = new User();
      this.userService.userInformation = null;
    }, (error : Error) => {
      console.error(error);
    }, () => {

    });
  }

  public search(event : any) : void {
    if (event.target.value.length >= 2) {
      console.log('search')
      this.router.navigate(['listing/search']);

      this.messageService.sendMessage({
        message: 'ListingSearch',
        payload: event.target.value
      });
      // this.router.navigate(['listing/search']);
    }
  }

  public activateListingFilter() : void {
    this.messageService.sendMessage({
      message: 'toggleListingFilter'
    });
  }

}
