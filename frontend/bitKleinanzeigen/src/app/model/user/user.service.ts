import { Injectable } from '@angular/core';

import { User } from './user.model';
import { Employee } from './employee.model';

/**
 * This service creates a shared context among the active user.
 */
@Injectable()
export class UserService {

  constructor() {
    this.user = new User();
  }

  public user : User;

  public userInformation : Employee;

  public authenticated : boolean = false;

  public favourites : number[] = [1, 2, 3];
}
