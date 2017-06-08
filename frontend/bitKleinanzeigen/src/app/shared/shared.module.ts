import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MessageService, Message } from './message.service';
import { OverlayDirective } from './overlay.directive';

@NgModule({
  declarations: [
    OverlayDirective
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule {

}

export { MessageService, Message };
