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

  private searchQuery : string = '';

  isAuthenticated : boolean;

  constructor(
    private router : Router,
    private authenticationController : AuthenticationController,
    public userService : UserService,
    private messageService : MessageService
  ) {
    this.isAuthenticated = this.userService.authenticated;
  }

  /**Navigates the router to listing/create. */
  create() : void {
    this.router.navigate(['home']).then(() => {
      this.messageService.sendMessage({
        message: 'createListing'
      });
    });
  }

  /**Navigates the router to home. */
  home() : void {
    this.router.navigate(['home']);
  }

  /**Discards the active users credentials and routes back to /user/login. */
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

  /**Performs a search request if the search query contains at least two characters. Routes to /listing/search afterwards. */
  public searchOnInput(event : any) : void {
    this.searchQuery = event.target.value;
    this.search(this.searchQuery);
  }

  public searchOnButton() : void {
    this.search(this.searchQuery);
  }

  private search(query : string) : void {
    if (query.length >= 2) {
      this.router.navigate(['listing/search']).then(() => {
        this.messageService.sendMessage({
          message: 'ListingSearch',
          payload: query
        });
      });
    } else {
      this.router.navigate(['home']);
    }
  }

  /**Toggls the filter component if the listing overview viewport component is visible. */
  public activateListingFilter() : void {
    this.messageService.sendMessage({
      message: 'toggleListingFilter'
    });
  }

  public navigateToDashboard() : void {
    this.router.navigate(['admin', 'dashboard']);
  }

}
