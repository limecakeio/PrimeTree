import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkModule } from '../network/network.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ LoginComponent ],
  providers: [],
  exports: [ LoginComponent ]
})
export class LoginModul {

}
