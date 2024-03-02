import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractManagementComponent } from './contract-management/contract-management.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {TranslateModule} from "@ngx-translate/core";
import {NgbPaginationModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UIModule} from "../../shared/ui/ui.module";
import { ContractManagementModalComponent } from './contract-management/contract-management-modal/contract-management-modal.component';


@NgModule({
  declarations: [ContractManagementComponent, ContractManagementModalComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    NgSelectModule,
    TranslateModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    UIModule,
    ReactiveFormsModule
  ]
})
export class ContractModule { }
