import { Injectable } from '@angular/core';

@Injectable()
export class SecurityModel {

  private token : string;

  isAuthenticated : boolean = false;

  setToken(token : string) {
    this.token = token;
  }
  
}
