import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { SystemParameterComponent } from './system-parameter/system-parameter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemLogsComponent } from './system-logs/system-logs.component';


@NgModule({
  declarations: [SystemParameterComponent, SystemLogsComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    UIModule,
    NgSelectModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    TranslateModule,

  ]
})
export class SystemModule { }
