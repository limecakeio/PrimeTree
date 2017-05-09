import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SecurityModel } from '../security/security.model';

@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(private securityModel : SecurityModel) {  }

  canActivate() {
    return this.securityModel.isAuthenticated();
  }
}
