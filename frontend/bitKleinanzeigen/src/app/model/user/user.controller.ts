import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { NetworkService } from '../../network/network.service';
import { NetworkRequest } from '../../network/network.request';

import { UserMin, UserMinFactory } from './user-min.model';
import { Employee } from './employee.model';
import { EmployeeFactory } from './employee.factory';


@Injectable()
export class UserController {

  private userMinFactory : UserMinFactory = new UserMinFactory();
  private employeeFactory : EmployeeFactory = new EmployeeFactory();

  constructor(
    private networkService : NetworkService
  ) {  }

  public getUsers() : Observable<UserMin[]> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('users');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return response.json().users;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
          throw new Error('User must be an admin to use this method!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public getUser(userId : number) : Observable<Employee> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('user')
    .addPath('' + userId);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return this.employeeFactory.createEmployee(response.json());
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 404) {
          throw new Error(userId + ' is no valid identifier for a user.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public postFavourite(listingId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Post)
    .addPath('user')
    .addPath('favourites')
    .setBody({
      listingID : listingId
    });
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 201) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User can only add favourites to their own accounts!');
      } else if (response.status === 404) {
          throw new Error(listingId + ' is no valid identifier for a listing.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public getFavourites() : Observable<number[]> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('user')
    .addPath('favourites');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return response.json().ids;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User can only retrieve their own listings!');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public removeFavourite(listingId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Delete)
    .addPath('user')
    .addPath('favourites')
    .addPath('' + listingId);
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User can only remove their own listings from their favourites list!');
      } else if (response.status === 404) {
          throw new Error(listingId + ' is no valid identifier for a listing.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public appointAdmin(userId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('user')
    .addPath('' + userId)
    .addPath('admin');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User must be an admin to appoint another user to act as an admin!');
      } else if (response.status === 404) {
          throw new Error(userId + ' is no valid user identifier.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

  public relieveAdmin(userId : number) : Observable<void> {
    let networkRequest : NetworkRequest = this.networkService.networkRequest();
    networkRequest
    .setHttpMethod(RequestMethod.Get)
    .addPath('user')
    .addPath('' + userId)
    .addPath('admin');
    return this.networkService.send(networkRequest).map((response : Response) => {
      if (response.status === 200) {
        return;
      } else if (response.status === 401) {
        throw new Error('User must be authenticated to use this method!');
      } else if (response.status === 403) {
        throw new Error('User must be an admin to appoint another user to act as an admin!');
      } else if (response.status === 404) {
          throw new Error(userId + ' is no valid user identifier.');
      } else {
        throw new Error(response.toString());
      }
    });
  }

}
