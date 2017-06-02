import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
