import { Employee } from './employee.model';

export class EmployeeFactory {

  private employeeProperties : string[] = [
    'userID', 'userImage', 'firstName',
    'lastName', 'isAdmin', 'phone',
    'location', 'position', 'eMail'
  ];

  private checkProperties(body : any) : boolean {
    this.employeeProperties.forEach((employeeProperty : string) => {
      if (!body.hasOwnProperty(employeeProperty)) {
        return false;
      }
    });
    return true;
  }

  private findMissingProperties(body : any) : string[] {
    let missingProperties : string[] = [];
    this.employeeProperties.forEach((employeeProperty : string) => {
      if (!body.hasOwnProperty(employeeProperty)) {
        missingProperties.push(employeeProperty);
      }
    });
    return missingProperties;
  }

  /**
   * Creates a new employee from body object.
   * Throws an error if some or all properties are missing.
   */
  public createEmployee(body : any) : Employee {
    if (this.checkProperties(body)) {
      let employee : Employee = new Employee();
      this.employeeProperties.forEach((employeeProperty : string) => {
        employee[employeeProperty] = body[employeeProperty];
      });
      return employee;
    }
    throw new Error('Not possible to create an employee, ' + this.findMissingProperties(body).join(', ') + '.');
  }

}
