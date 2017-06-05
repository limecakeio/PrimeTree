import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterCheckboxComponent } from './elements/filter-checkbox/filter-checkbox.component';
import { FilterMultiValueCheckboxComponent } from './elements/filter-multi-value-checkbox/filter-multi-value-checkbox.component';
import { FilterRadioComponent } from './elements/filter-radio/filter-radio.component';

import { DescriptionFormComponent } from './elements/description/description.component';
import { ImageFormComponent } from './elements/image/image.component';
import { PriceFormComponent } from './elements/price/price.component';
import { TitleFormComponent } from './elements/title/title.component';
import { GalleryFormComponent } from './elements/gallery/gallery.component';

/**
 * This module collects all components and services which pertain to building forms.
 */
@NgModule({
  declarations: [
    FilterCheckboxComponent,
    FilterRadioComponent,
    FilterMultiValueCheckboxComponent,
    
    DescriptionFormComponent,
    ImageFormComponent,
    PriceFormComponent,
    TitleFormComponent,
    GalleryFormComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FilterCheckboxComponent,
    FilterRadioComponent,
    FilterMultiValueCheckboxComponent,

    DescriptionFormComponent,
    ImageFormComponent,
    PriceFormComponent,
    TitleFormComponent,
    GalleryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [  ]
})
export class FormModule {

}
