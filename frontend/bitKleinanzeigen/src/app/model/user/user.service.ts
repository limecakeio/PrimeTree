import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from './user.model';
import { Employee } from './employee.model';

import { UserController } from './user.controller';

/**
 * This service creates a shared context among the active user.
 */
@Injectable()
export class UserService {

  constructor(
    private userController : UserController
  ) {
    this.user = new User();
  }

  public user : User;

  public userInformation : Employee;

  public authenticated : boolean = false;

  private favourites : number[] = [1, 2, 3];

  public getFavourites() : number[] {
    return this.favourites;
  }

  public updateFavourites() : void {
    this.userController.getFavourites().subscribe((favouriteIDs : number[]) => {
      this.favourites = favouriteIDs;
    });
  }

  public addFavourite(listingID : number) : Observable<void> {
    return this.userController.postFavourite(listingID).map(() => {
      this.updateFavourites();
    });
  }

  public isFavourite(listingID : number) : boolean {
    for (let i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i] === listingID) {
        return true;
      }
    }
    return false;
  }

  public removeFavourite(listingID : number) : Observable<void> {
    return this.userController.removeFavourite(listingID).map(() => {
      this.updateFavourites();
    });
  }
}
