import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';
import { AuthenticationController } from './authentication.controller';

import { NetworkModule } from '../network/network';

/**
 * Collects all files and templates which pertains to authentication.
 */
@NgModule({
  declarations: [ AuthenticationComponent ],
  exports: [ AuthenticationComponent ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // NetworkModule
  ],
  providers: [ AuthenticationController ]
})
export class AuthenticationModule {

}
