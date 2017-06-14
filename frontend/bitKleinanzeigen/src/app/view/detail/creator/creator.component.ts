import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';
import { UserController } from '../../../model/user/user.controller';
import { Employee } from '../../../model/user/employee.model';

import { NetworkService } from '../../../network/network.service';

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
    private userController : UserController,
    private networkService : NetworkService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.userController.getUser(this.model.creatorID).subscribe((employee : Employee) => {
        this.creator = employee;
        if (this.creator.userImage.indexOf('http') === -1) {
          this.creator.userImage = this.networkService.getServerAddress() + this.creator.userImage;
        }
        this.isDataAvailable = true;
      });
    });
  }

  public getTimeStringFromUnixTime(unixTime : number) : string {
    let date : Date = new Date(unixTime);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  }

}
