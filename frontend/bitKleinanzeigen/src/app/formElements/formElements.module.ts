import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DescriptionFormComponent } from './description/description.component';
import { TitleFormComponent } from './title/title.component';
import { PriceFormComponent } from './price/price.component';
import { ImageFormComponent } from './image/image.component';
import { FormElementsService } from './formElements.service';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ DescriptionFormComponent, TitleFormComponent, PriceFormComponent, ImageFormComponent ],
  exports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DescriptionFormComponent,
    TitleFormComponent,
    PriceFormComponent,
    ImageFormComponent ],
  providers: [ FormElementsService ]
})
export class FormElementsModule {

}
