import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateListingFormComponent } from './CreateListingForm.component';
import { NetworkModule } from '../network/network.module';
import { NetworkService } from '../network/network.service';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ CreateListingFormComponent ],
  exports: [ CreateListingFormComponent ],
  providers: [ NetworkService ]
})
export class ListingFormsModule {

}
