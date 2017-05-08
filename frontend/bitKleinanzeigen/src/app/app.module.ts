import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SecurityModule } from './security/security.module';
import { NetworkModule } from './network/network.module';
import { ListingModule  } from './model/listings/listing.modul';
import { AppComponent } from './app.component';
import { LoginModul  } from './login/login.module';
import { SecurityModel } from './security/security.model';
import { routing } from './app.routing';

@NgModule({
  imports:      [ BrowserModule, SecurityModule, NetworkModule, ListingModule, LoginModul, routing ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ SecurityModel ]
})
export class AppModule { }
