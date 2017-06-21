export class UserMin {
  userID : number;
  userImage : string;
  firstName : string;
  lastName : string;
  isAdmin : boolean;
  eMail : string;
}


export class UserMinFactory {

  private userMinProperties : string[] = [
    'userId', 'userImage', 'firstName', 'lastName', 'isAdmin', 'eMail'
  ];

  public createUserMin(body : any) : UserMin {
    if (this.checkProperties(body)) {
      let userMin : UserMin = new UserMin();
      this.assignProperties(userMin, body);
      return userMin;
    } else {
      throw new Error('Cannot create UserMin: ' + this.findMissingProperties(body).join(', ') + ' are missing.')
    }
  }

  private checkProperties(body : any) : boolean {
    this.userMinProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        return false;
      }
    });
    return true;
  }

  private assignProperties(userMin : UserMin, body : any) : void {
    this.userMinProperties.forEach((property : string) => {
      userMin[property] = body[property];
    });
  }

  private findMissingProperties(body : any) : string[] {
    let missingProperies : string[] = [];
    this.userMinProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        missingProperies.push(property);
      }
    });
    return missingProperies;
  }

}
