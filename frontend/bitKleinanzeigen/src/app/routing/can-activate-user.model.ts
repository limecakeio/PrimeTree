import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { UserService } from '../model/user/user';

@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(
    private userService : UserService,
    private router : Router
  ) {  }

  canActivate() {
    if (!this.userService.authenticated) {
      this.router.navigate(['/user/login']);
      return false;
    }
    // return this.userService.authenticated;
    return true;
  }
}
