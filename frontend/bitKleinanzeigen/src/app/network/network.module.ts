import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NetworkService } from './network.service';
import { MockNetworkService } from './mock-network.service';
import { RESTNetworkService } from './rest-network.service';

@NgModule({
  imports: [ HttpModule ],
  declarations: [  ],
  providers: [
    {
      provide: NetworkService,
      useClass: RESTNetworkService
    }
  ],
  exports: [ HttpModule ]
})
export class NetworkModule {

}
