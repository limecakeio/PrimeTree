import { Component } from '@angular/core';
import { Listing } from './model/listing.model';
import { Observable } from 'rxjs/Observable';
import { RESTService } from './network/rest.service';

@Component({
  selector: 'bITKleinanzeigen',
  template: `<h1 (click)="updateListings()">Hello {{name}}</h1>`,
  providers: [ RESTService ]
})
export class AppComponent  { name = 'Angular';

  listings : Listing[] = [];

  constructor(private restService : RESTService) {

  }

  /**
   * test for the rest.service
   * is not necessary for the app
   */
  updateListings() : void {
    this.restService.postListing('SellItem', new Listing()).subscribe(res => {
      console.log(res);
    });

    this.restService.getListings().subscribe(res => {console.log(res)});
  };
}
