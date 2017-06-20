import { NgModule, OnInit }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationModule } from './authentication/authentication.module';
import { NavigationModule } from './navigation/navigation';
import { ListingsModule } from './model/listings/listings.module';
import { UserModule } from './model/user/user';

import { SharedModule } from './shared/shared.module';

import { NetworkModule } from './network/network.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  imports: [
    BrowserModule,
    NetworkModule,
    RouterModule,
    RoutingModule,
    AuthenticationModule,
    NavigationModule,
    ListingsModule,
    UserModule,
    SharedModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule {

}
