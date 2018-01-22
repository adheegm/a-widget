import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlsComponent } from './controls.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ControlsComponent }
        ])
    ], 
    exports: [
        RouterModule
    ]
})
export class ControlsRoutingModule { }
