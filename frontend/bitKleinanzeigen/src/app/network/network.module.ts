import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NetworkRequest } from './network.controller';
import { ListingRequest } from './listing.controller';
import { RESTService } from './rest.service';
import { NetworkService } from './network.service';

@NgModule({
  imports: [ HttpModule ],
  providers: [ NetworkModule, ListingRequest, RESTService, NetworkService ],
  exports: [ HttpModule ]
})

export class NetworkModule {

}
