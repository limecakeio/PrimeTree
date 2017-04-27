import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListingRequest } from './network/listing.controller';
import { NetworkService } from './network/network.service';

@Component({
  selector: 'bITKleinanzeigen',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  providers: [ ListingRequest, NetworkService ]
})
export class AppComponent  {  }
