import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NetworkService } from './network.service';
import { MockNetworkService } from './mock-network.service';
import { RESTNetworkService } from './rest-network.service';

@NgModule({
  imports: [ HttpModule ],
  declarations: [  ],
  providers: [ {
    provide: NetworkService,
    useClass: MockNetworkService
<<<<<<< HEAD
  }, SecurityModel ],
  exports: [ HttpModule ]
=======
  } ],
  exports: [  ]
>>>>>>> e42f4dda6ecbeaa6ca0d7299a5cb631871241c21
})

export class NetworkModule {

}
