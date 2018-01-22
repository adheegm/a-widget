import { 
  NgModule, 
  Component } from '@angular/core';

import { 
  Routes, 
  RouterModule 
} from '@angular/router';

import { 
  HomeComponent
} from '../app/components/pages/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'controls', loadChildren: './components/pages/controls/controls.module#ControlsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
