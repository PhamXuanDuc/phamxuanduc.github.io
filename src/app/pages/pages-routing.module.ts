import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'administration', loadChildren: () => import('./admin-management/admin-management.module').then(m => m.AdminManagementModule) },
  { path: 'task', loadChildren: () => import('./task-management/task-management.module').then(m => m.TaskManagementModule) },
  { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
  { path: 'email-management', loadChildren: () => import('./email-management/email-management.module').then(m => m.EmailManagementModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path:'customer', loadChildren: () => import('./customer/customer.module').then(m=>m.CustomerModule)},
  {path:"loan-account",loadChildren:()=>import('./loan-account/loan-account.module').then(m=>m.LoanAccountModule)},
  {path:"category-management",loadChildren:()=>import('./category-management/category-management.module').then(m=>m.CategoryManagementModule)},
  {path:"contract",loadChildren:()=>import('./contract/contract.module').then(m=>m.ContractModule)},]
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
