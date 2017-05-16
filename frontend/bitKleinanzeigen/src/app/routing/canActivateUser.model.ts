import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SecurityModel } from '../security/security.model';

@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(
    private securityModel : SecurityModel,
    private router : Router
  ) {  }

  canActivate() {
    // if (this.securityModel.authenticated) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;
    return this.securityModel.isAuthenticated();
  }
}
