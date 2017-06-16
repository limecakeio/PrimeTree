import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BorrowRequestFormComponent } from './borrow-request-form.component';
import { BorrowRequestPreviewComponent } from './borrow-request-preview.component';
import { BorrowRequestComponent } from './borrow-request.component';

import { FormModule } from '../../../../form/form.module';
import { PreviewModule } from '../../../../view/preview/preview.module';
import { DetailModule } from '../../../../view/detail/detail.module';

@NgModule({
  declarations: [
    BorrowRequestFormComponent,
    BorrowRequestPreviewComponent,
    BorrowRequestComponent
  ],
  exports: [
    BorrowRequestFormComponent,
    BorrowRequestPreviewComponent,
    BorrowRequestComponent,
    RouterModule,
    PreviewModule,
    DetailModule,
  ],
  imports: [
    CommonModule,
    FormModule,
    RouterModule,
    PreviewModule,
    DetailModule
  ],
  providers: []
})
export class BorrowRequestModule {

}
