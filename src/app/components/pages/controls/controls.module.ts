import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlsComponent } from './controls.component';
import { ControlsRoutingModule } from './controls-routing.module';
import { TableModule } from '../../../controls/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ControlsRoutingModule
  ],
  declarations: [
    ControlsComponent
  ]
})
export class ControlsModule { }
