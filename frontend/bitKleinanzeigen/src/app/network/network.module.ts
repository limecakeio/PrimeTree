import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RESTService } from './rest.service';

@NgModule({
  imports: [ HttpModule ],
  providers: [ RESTService ]
})
export class NetworkModule {

}
