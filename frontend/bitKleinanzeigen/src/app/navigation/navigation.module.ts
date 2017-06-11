import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [ SharedModule, RouterModule ],
  exports: [ NavigationComponent, RouterModule ],
  declarations: [ NavigationComponent ],
  providers: []
})
export class NavigationModule {

}
