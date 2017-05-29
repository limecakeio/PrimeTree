import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListingController } from './network/listing.controller';
import { FormElementsModule } from '../../formElements/formElements.module';
import { SellItemCreateFormComponent } from './form/create/sellitem-create.component';
import { ListingReposetory } from './listing.reposetory';
import { ListingComponent } from './listing.component';
import { SellItemComponent } from './sellitem/sellitem.component';

@NgModule({
  imports: [ FormElementsModule ],
  declarations: [ SellItemCreateFormComponent, ListingComponent, SellItemComponent ],
  exports: [ SellItemCreateFormComponent, ListingComponent, SellItemComponent ],
  providers: [ ListingController, ListingReposetory ]
})
export class ListingModule {

}
