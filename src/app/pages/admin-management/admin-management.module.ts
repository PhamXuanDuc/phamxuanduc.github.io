import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxChartistModule } from 'ngx-chartist';
import { DepartmentModalComponent } from './department-management/department-modal/department-modal.component';
import { UserModalComponent } from './user-management/user-modal/user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PermissionModalComponent } from './permission-management/permission-modal/permission-modal.component';
import { PermissionComponentComponent } from './permission-management/permission-component/permission-component.component';
import { MenuModalComponent } from './menu-management/menu-modal/menu-modal.component';
import { MenuManagementComponent } from './menu-management/menu-management/menu-management.component';
import { RoleModalComponent } from './role-management/role-modal/role-modal.component';
import { RoleManagementComponent } from './role-management/role-management/role-management.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImportErrorAdminModalComponent } from './import-error-admin-modal/import-error-admin-modal.component';

@NgModule({
  declarations: [
    DepartmentManagementComponent,
    DepartmentModalComponent,
    UserManagementComponent,
    UserModalComponent,
    RoleManagementComponent,
    RoleModalComponent,
    MenuManagementComponent,
    MenuModalComponent,
    PermissionComponentComponent,
    PermissionModalComponent,
    ImportErrorAdminModalComponent
  ],
  imports: [
    AdminManagementRoutingModule,
    CommonModule,
    UIModule,
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
    NgbModule
  ],
  entryComponents: [
    DepartmentModalComponent,
    UserModalComponent,
    RoleModalComponent,
    MenuModalComponent,
    PermissionModalComponent
  ]
})
export class AdminManagementModule { }
