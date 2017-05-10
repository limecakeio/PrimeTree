import { Component } from '@angular/core';
import { SecurityModel } from './security/security.model';

@Component({
  selector: 'bITKleinanzeigen',
  templateUrl: './app.component.html',
  // styleUrls: [ 'app.component.css' ],
  providers: [  ]
})
export class AppComponent  {

  isAuthentificated : boolean = true;

  constructor(private security : SecurityModel) {
    this.isAuthentificated = security.authenticated;
  }

}
