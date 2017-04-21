import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateListingFormComponent } from './CreateListingForm.component';
import { NetworkModule } from '../network/network.module';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ CreateListingFormComponent ],
  exports: [ CreateListingFormComponent ],
  providers: [  ]
})
export class ListingFormsModule {

}
