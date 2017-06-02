import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../model/user/user';

@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(
    private userService : UserService,
  ) {  }

  canActivate() {
    return this.userService.authenticated;
  }
}
