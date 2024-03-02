import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbDatepickerModule, NgbDropdownModule , NgbTooltipModule , NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { UIModule } from '../../shared/ui/ui.module';

import { DashboardsRoutingModule } from './dashboards-routing.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    UIModule,
    NgbTooltipModule,
    DashboardsRoutingModule,
    NgApexchartsModule,
    NgSelectModule,
    
  ]
})
export class DashboardsModule { }
