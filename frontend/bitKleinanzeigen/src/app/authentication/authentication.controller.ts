import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Employee } from '../model/user/employee.model';
import { User } from '../model/user/user.model';
import { EmployeeFactory } from '../model/user/employee.factory';

import { NetworkService, NetworkRequest, RequestMethod, Response } from '../network/network';

import { StatisticsService } from '../shared/statistics.service';
import { UserService } from '../model/user/user.service';
/**
 * This controller handles all required functionalities for authentication.
 */
@Injectable()
export class AuthenticationController {

  private employeeFactory : EmployeeFactory;

  constructor(
    private networkService : NetworkService,
    private userService : UserService,
    private statisticsService : StatisticsService
  ) {
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
        this.networkService.setSecurityHeader('X-API-Key', response.headers.get('X-API-Key'));
        this.userService.updateFavourites();
        this.statisticsService.updateStatistics();
        let activeUser : Employee = this.employeeFactory.createEmployee(response.json());
        activeUser.userImage = this.networkService.getServerAddress() + activeUser.userImage;
        return activeUser;
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
