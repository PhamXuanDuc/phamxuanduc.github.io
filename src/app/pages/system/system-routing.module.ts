import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemParameterComponent } from './system-parameter/system-parameter.component';
import {SystemLogsComponent} from "./system-logs/system-logs.component";

const routes: Routes = [
  {
    path: 'system-parameter',
    component: SystemParameterComponent
  },
  {
    path: 'system-logs',
    component: SystemLogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
