import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoanAccountComponent } from './loan-account/loan-account.component';
import { LoanAccountRoutingModule } from './loan-account.routing.module';
import { LoanAccountModalComponent } from './loan-account/loan-account-modal/loan-account-modal/loan-account-modal.component';

@NgModule({
    imports: [
        UIModule,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        NgSelectModule,
        NgbPaginationModule,
        NgbPaginationModule,
        LoanAccountRoutingModule,
        FormsModule,


    ],
  declarations: [LoanAccountComponent,LoanAccountModalComponent]
})
export class LoanAccountModule { 
    
}