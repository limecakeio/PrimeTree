import { Injectable } from '@angular/core';

@Injectable()
export class SecurityModel {

  private key : string;
  private secret : string;
  private authenticated : boolean = false;

  public setKey(key : string) : void {
    this.authenticated = true;
    this.key = key;
  }

  public setSecret(secret : string) : void {
    this.authenticated = true;
    this.secret = secret;
  }

  public isAuthenticated() : boolean {
    return this.authenticated;
  }

  public getKey() : string {
    return this.key;
  }

  public getSecret() : string {
    return this.secret;
  }

}
