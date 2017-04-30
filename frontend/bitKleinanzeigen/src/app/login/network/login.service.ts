import { Injectable } from '@angular/core';
import { NetworkService } from '../../network/network.service';
import { NetworkRequest } from '../../network/network.request';
import { RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user/user.model';

@Injectable()
export class LoginService {

  constructor(private network : NetworkService) {  }

  public login(user : User) : Observable<Response> {
    let request : NetworkRequest = this.network.networkRequest();
    request
    .setHttpMethod(RequestMethod.Post)
    .setPort(3500)
    .addPath('listing')
    .addPath('user')
    .addPath('login')
    .setBody(user);
    return this.network.send(request);
  }

  public logout() : Observable<Response> {
    let request : NetworkRequest = this.network.networkRequest();
    request
    .setHttpMethod(RequestMethod.Post)
    .setPort(3500)
    .addPath('user')
    .addPath('logout')
    return this.network.send(request);
  }

}
