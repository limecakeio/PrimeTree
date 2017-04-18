import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule } from '@angular/http';
import { NetworkModule } from './network/network.module';
import { RESTService } from './network/rest.service';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, NetworkModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ RESTService ]
})
export class AppModule { }
