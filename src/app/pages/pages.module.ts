import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PagesRoutingModule } from './pages-routing.module';
import { AdminManagementModule } from './admin-management/admin-management.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { UIModule } from '../shared/ui/ui.module';
import {DashboardsModule} from "./dashboards/dashboards.module";
import {SharedModule} from "../shared/shared.module";
import { QuillModule } from 'ngx-quill';
import { CustomerModule } from './customer/customer.module';
import { LoanAccountModule } from './loan-account/loan-account.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        NgbDropdownModule,
        NgApexchartsModule,
        NgSelectModule,
        DashboardsModule,
        PagesRoutingModule,
        ReactiveFormsModule,
        UIModule,
        AdminManagementModule,
        NgbDatepickerModule,
        NgbModule,
        CollapseModule,
        TabsModule,
        SharedModule,
        QuillModule.forRoot()
    ], providers: [
        TabsetConfig,
		SharedModule,
        CustomerModule,
		LoanAccountModule
    ], 
    
})
export class PagesModule { }
