import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer.routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerModalComponent } from './customer/customer-modal/customer-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule, NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartistModule } from 'ngx-chartist';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTabsModule} from "@angular/material/tabs";
import {customerContactModalComponent} from "./customer/customer-modal/customer-contact-modal/customer-contact-modal.component";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  
    imports: [
        UIModule,
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        NgSelectModule,
        NgbPaginationModule,
        NgbModule,
        NgApexchartsModule,
        NgbDatepickerModule,
        FormsModule,
        SharedModule,
        NgbTypeaheadModule,
        MatTabsModule,
        MatRadioModule

    ],
  declarations: [CustomerComponent, CustomerModalComponent, customerContactModalComponent]
})
export class CustomerModule { 
    
}