import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListingController } from './network/listing.controller';
import { FormElementsModule } from '../../formElements/formElements.module';
import { SellItemCreateFormComponent } from './form/create/sellitem-create.component';

@NgModule({
  imports: [ FormElementsModule ],
  declarations: [ SellItemCreateFormComponent ],
  exports: [ SellItemCreateFormComponent ],
  providers: [ ListingController ]
})
export class ListingModule {

}
