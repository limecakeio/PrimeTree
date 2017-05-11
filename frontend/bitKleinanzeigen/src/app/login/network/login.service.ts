import { Injectable } from '@angular/core';
import { NetworkService } from '../../network/network.service';
import { NetworkRequest } from '../../network/network.request';
import { RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user/user.model';

@Injectable()
export class LoginService {

  constructor(private network : NetworkService) {  }

  public login(user : User) : Observable<boolean> {
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
    return this.network.send(request).map((response : Response) => {
      if (response.status !== 200) {
        return false;
      }
      return true;
    });
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
