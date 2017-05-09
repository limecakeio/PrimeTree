import { Injectable } from '@angular/core';

@Injectable()
export class SecurityModel {

  username : string;

  authenticated : boolean = false;

  public isAuthenticated() : boolean {
    return this.authenticated;
  }


}
