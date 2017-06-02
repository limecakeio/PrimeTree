import { NgModule, OnInit }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationModule } from './authentication/authentication';
import { NavigationModule } from './navigation/navigation';
import { ListingsModule } from './model/listings/listings.module';
import { UserModule } from './model/user/user';

import { NetworkModule } from './network/network.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  imports: [
    BrowserModule,
    NetworkModule,
    AuthenticationModule,
    NavigationModule,
    ListingsModule,
    UserModule,

    RouterModule,
    RoutingModule,
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule implements OnInit {

  ngOnInit() {
    // console.log(this);
  }
}
