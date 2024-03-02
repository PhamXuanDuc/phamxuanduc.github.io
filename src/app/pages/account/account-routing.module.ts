import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: 'my-account',
    component: MyAccountComponent
  },


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
