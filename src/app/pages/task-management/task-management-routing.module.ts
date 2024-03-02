import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTaskDetailComponent } from './my-task/my-task-detail/my-task-detail.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { TaskManagementDetailComponent } from './task-management/task-management-detail/task-management-detail.component';
import { TaskManagementComponent } from './task-management/task-management.component';

const routes: Routes = [
  {
    path: 'task-management',
    component: TaskManagementComponent
  },
  {
    path: 'task-management/:code',
    component: TaskManagementDetailComponent,
  },
  {
    path: 'my-task',
    component: MyTaskComponent,
  },
  {
    path: 'my-task/:code',
    component: MyTaskDetailComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagementRoutingModule { }
