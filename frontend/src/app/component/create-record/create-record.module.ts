import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecordContainerComponent } from './create-record-container/create-record-container.component';
import { CreateRecordTableComponent } from './create-record-table/create-record-table.component';



@NgModule({
  declarations: [
    CreateRecordContainerComponent,
    CreateRecordTableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreateRecordContainerComponent
  ]
})
export class CreateRecordModule { }
