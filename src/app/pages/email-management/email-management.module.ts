import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailManagementRoutingModule } from './email-management-routing.module';
import { EmailComponent } from './email/email.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailComposeComponent } from './email-compose/email-compose.component';
import { QuillModule } from 'ngx-quill';
import { EmailModalComponent } from './email/email-modal/email-modal.component';


@NgModule({
  declarations: [EmailComponent, EmailComposeComponent, EmailModalComponent],
  imports: [
    CommonModule,
    EmailManagementRoutingModule,
    UIModule,
    NgSelectModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    TranslateModule,
    QuillModule.forRoot(),

  ]
})
export class EmailManagementModule { }
