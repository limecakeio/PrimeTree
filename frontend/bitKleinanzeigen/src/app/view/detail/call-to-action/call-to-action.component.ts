import { Component, Input, OnChanges } from '@angular/core';

import { DetailViewService } from '../detail.service';
import { UserController } from '../../../model/user/user.controller';
import { Employee } from '../../../model/user/employee.model';

@Component({
  selector: 'view-detail-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: [ './call-to-action.component.css' ]
})
export class CallToActionDetailViewComponent {

  @Input() action : string = 'hat nicht funktioniert';

  @Input() listingIcon : string = '';

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

  public mailTo() : void {
    let a : HTMLAnchorElement = document.createElement('a');
    a.href = 'mailto:' + this.creator.eMail + '?subject=Kaufanfrage für Artikel ' + this.model.id + " bei bIT Kleinanzeigen";
    a.href += '&body=Hallo, ich möchte gerne Deinen Artikel: ' + this.model.title + ' ... von dir kaufen.'; 
    a.click();
  }

}
