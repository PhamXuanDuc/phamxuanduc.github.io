import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanAccountComponent } from './loan-account/loan-account.component';

const routes: Routes = [
  {
    path:'',
    component:LoanAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanAccountRoutingModule { }
