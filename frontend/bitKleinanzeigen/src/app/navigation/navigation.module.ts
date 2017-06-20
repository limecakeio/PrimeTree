import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [ SharedModule, RouterModule, FormsModule, ReactiveFormsModule ],
  exports: [ NavigationComponent, RouterModule ],
  declarations: [ NavigationComponent ],
  providers: []
})
export class NavigationModule {

}
