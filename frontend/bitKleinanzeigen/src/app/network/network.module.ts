import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NetworkService } from './network.service';
import { SecurityModule } from '../security/security.module';
import { SecurityModel } from '../security/security.model';

@NgModule({
  imports: [ HttpModule, SecurityModule ],
  declarations: [  ],
  providers: [ NetworkService, SecurityModel ],
  exports: [ HttpModule ]
})

export class NetworkModule {

}
