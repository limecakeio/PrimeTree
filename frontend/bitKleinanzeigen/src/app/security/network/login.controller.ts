import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { SecurityModel } from '../../security/security.model';
import { User } from '../../security/user.model';
import { SecurityService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { NetworkRequest } from '../../network/network.request';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginController {

  constructor(private security : SecurityModel, private sercurityService : SecurityService) {  }

  public login(user : User) : Observable<any> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setHostname('localhost')
    .setPort(3500)
    .addPath('listing')
    .addPath('login')
    .setBody(user);
    return this.sercurityService.send(request);
  }

  public logout() : Observable<any> {
    let request = new NetworkRequest();
    request.setHttpMethod(RequestMethod.Post)
    .setHostname('localhost')
    .setPort(3500)
    .addPath('listing')
    .addPath('login')
    return this.sercurityService.send(request);
  }
}
