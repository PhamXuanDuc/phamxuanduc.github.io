import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComposeComponent } from './email-compose/email-compose.component';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  {
    path: 'email',
    component: EmailComponent
  },
  {
    path: 'email-compose',
    component: EmailComposeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailManagementRoutingModule { }
