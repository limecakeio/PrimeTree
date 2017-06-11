import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';
import { UserController } from '../../../model/user/user.controller';
import { Employee } from '../../../model/user/employee.model';

@Component({
  selector: 'view-detail-creator',
  templateUrl: './creator.component.html',
  styleUrls: [ './creator.component.css' ]
})
export class CreatorDetailViewComponent {

  public isDataAvailable : boolean = false;

  public creator : Employee;

  public model : any;

  constructor(
    private detailViewService : DetailViewService,
    private userController : UserController
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.userController.getUser(this.model.creatorID).subscribe((employee : Employee) => {
        this.creator = employee;
        this.isDataAvailable = true;
      });
    });
  }

  public getTimeStringFromUnixTime(unixTime : number) : string {
    let date : Date = new Date(unixTime);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  }

}
