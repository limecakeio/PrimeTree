import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  exports: [ NavigationComponent, RouterModule ],
  declarations: [ NavigationComponent ],
  providers: []
})
export class NavigationModule {

}
