import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NetworkService } from './network.service';
import { SecurityModule } from '../security/security.module';
import { SecurityModel } from '../security/security.model';
import { MockNetworkService } from './mockNetwork.service';

@NgModule({
  imports: [ HttpModule, SecurityModule ],
  declarations: [  ],
  providers: [ {
    provide: NetworkService,
    useClass: MockNetworkService
  }, SecurityModel ],
  exports: [ HttpModule ]
})

export class NetworkModule {

}
