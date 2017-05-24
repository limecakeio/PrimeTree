import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SecurityModule } from './security/security.module';
import { NetworkModule } from './network/network.module';
import { ListingModule  } from './model/listings/listing.modul';
import { AppComponent } from './app.component';
import { LoginModul  } from './login/login.module';
import { SecurityModel } from './security/security.model';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
import { UserNavigationModule } from './usernavigation/user-navigation.module';

@NgModule({
  imports: [ 
    BrowserModule,
    SecurityModule,
    NetworkModule,
    ListingModule,
    LoginModul,
    RouterModule,
    RoutingModule,
    UserNavigationModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ SecurityModel ]
})
export class AppModule { }
