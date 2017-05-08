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
    let formdata = new FormData();
    formdata.append('username', user.username);
    formdata.append('password', user.password);
    request
    .setHttpMethod(RequestMethod.Post)
    .setHostname('141.19.145.175')
    .setPort(8080)
    .addPath('login')
    .setBody(formdata);
    // request.addHeader('Content-Type', 'application/x-www-form-urlencoded');
    return this.network.send(request);
  }

  public logout() : Observable<Response> {
    let request : NetworkRequest = this.network.networkRequest();
    request
    .setHttpMethod(RequestMethod.Post)
    .setHostname('141.19.145.175')
    .setPort(8080)
    .addPath('logout');
    // .addHeader('Access-Control-Request-Headers', 'POST');
    return this.network.send(request);
  }

}
