import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MessageService, Message } from './message.service';
import { DateService } from './date.service';
import { OverlayDirective } from './overlay.directive';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

import { NotifyComponent } from './notify.component';

@NgModule({
  declarations: [
    OverlayDirective,
    NotifyComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayDirective,
    NotifyComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    MessageService,
    StatisticsService,
    StatisticsController,
    DateService
  ]
})
export class SharedModule {

}

export { MessageService, Message };
