import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Employee } from '../model/user/employee.model';
import { User } from '../model/user/user.model';
import { EmployeeFactory } from '../model/user/employee.factory';

import { NetworkService, NetworkRequest, RequestMethod, Response } from '../network/network';

/**
 * This controller handles all required functionalities for authentication.
 */
@Injectable()
export class AuthenticationController {

  private employeeFactory : EmployeeFactory;

  constructor(private networkService : NetworkService) {
    this.employeeFactory = new EmployeeFactory();
  }

  /** Authenticates a user with the argument user credentials from a User object.
   * @argument {User} user includes the user credentials
   * @returns {Observable<Employee>} An Observable which returns an Employee if the right user credentials are send or an error if they are wrong
   */
  public authenticate(user : User) : Observable<Employee> {
    let request : NetworkRequest = this.networkService.networkRequest();
    request
    .setHttpMethod(RequestMethod.Post)
    .addPath('user')
    .addPath('login')
    .setBody(user);
    return this.networkService.send(request).map((response : Response) => {
      if (response.status === 200) {
        this.networkService.setSecurityHeader('api_key', response.headers.get('api_key'));
        return this.employeeFactory.createEmployee(response.json());
      }
      throw new Error('Some or all user credentials are wrong!');
    });
  }

  /** Discards the authentication of the active user.
   * @return {Observable<void>} An Observable which returns successfully if the user credentials are invoked or throws an error if the user was not authenticated beforhand.
   */
  public logout() : Observable<void> {
    let request : NetworkRequest = this.networkService.networkRequest();
    request
    .setHttpMethod(RequestMethod.Post)
    .addPath('user')
    .addPath('logout');
    return this.networkService.send(request).map((response : Response) => {
      if (response.status === 200) {
        return;
      }
      throw new Error('A user must be authenticated to use this method!');
    });
  }
}
