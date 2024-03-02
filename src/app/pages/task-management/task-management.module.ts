import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { TaskManagementComponent } from './task-management/task-management.component';
import { TaskManagementModalComponent } from './task-management/task-management-modal/task-management-modal.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartistModule } from 'ngx-chartist';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { QuillModule } from 'ngx-quill';
import { TaskManagementDetailComponent } from './task-management/task-management-detail/task-management-detail.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { TaskCommentModalComponent } from './task-management/task-comment-modal/task-comment-modal.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { MyTaskModalComponent } from './my-task/my-task-modal/my-task-modal.component';
import { MyTaskDetailComponent } from './my-task/my-task-detail/my-task-detail.component';
import { MyTaskCommentModalComponent } from './my-task/my-task-comment-modal/my-task-comment-modal.component';


@NgModule({
  declarations: [
    TaskManagementComponent, 
    TaskManagementModalComponent, TaskManagementDetailComponent, TaskCommentModalComponent, MyTaskComponent, MyTaskModalComponent, MyTaskDetailComponent, MyTaskCommentModalComponent],
  imports: [
    UIModule,
    CommonModule,
    TaskManagementRoutingModule,
    NgApexchartsModule,
    NgxChartistModule,
    ChartsModule,
    NgSelectModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    TranslateModule,
    QuillModule.forRoot(),
    MatNativeDateModule,
    MatTabsModule,
    MatCardModule

  ]
})
export class TaskManagementModule { }
