import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { MenuManagementComponent } from './menu-management/menu-management/menu-management.component';
import { PermissionComponentComponent } from './permission-management/permission-component/permission-component.component';
import { RoleManagementComponent } from './role-management/role-management/role-management.component';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
    {
        path: 'department-management',
        component: DepartmentManagementComponent
    },
    {
        path: 'user-management',
        component: UserManagementComponent
    },
    {
        path: 'role-management',
        component: RoleManagementComponent
    },
    {
        path: 'menu-management',
        component: MenuManagementComponent
    },
    {
        path: 'permission-management',
        component: PermissionComponentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
