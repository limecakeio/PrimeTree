import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NetworkService } from './network.service';
import { MockNetworkService } from './mock-network.service';
import { RESTNetworkService } from './rest-network.service';

@NgModule({
  imports: [ HttpModule ],
  declarations: [  ],
  providers: [ // Change this if you want to use a mock or a real server.
    {
      provide: NetworkService,
      useClass: RESTNetworkService
    }
  ],
  exports: [ HttpModule ]
})
export class NetworkModule {

}
