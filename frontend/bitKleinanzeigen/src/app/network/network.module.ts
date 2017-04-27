import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ListingRequest } from './listing.controller';
import { NetworkService } from './network.service';

@NgModule({
  imports: [ HttpModule ],
  providers: [ ListingRequest, NetworkService ],
  exports: [ HttpModule ]
})

export class NetworkModule {

}
