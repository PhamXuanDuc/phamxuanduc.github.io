import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {forkJoin} from 'rxjs';
import {AuthenticationService} from 'src/app/core/services/auth/auth.service';
import {CategoryService} from 'src/app/core/services/module/category.service';
import {PermissionService} from 'src/app/core/services/module/permission.service';
import {RoleService} from 'src/app/core/services/module/role.service';
import {
    getBreadCrumbItems,
    getBreadCrumbItemsWithLanguage,
    LISTPAGE,
    PAGE_DEFAULT
} from "../../../../shared/utils/app.util";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ShareDataService} from "../../../../share-data.service";

@Component({
    selector: 'app-permission-component',
    templateUrl: './permission-component.component.html',
    styleUrls: ['./permission-component.component.scss']
})
export class PermissionComponentComponent implements OnInit {
    breadCrumbItemsData: Array<any>;
    breadCrumbItems: Array<any>;
    isCollapsed = true;
    loading = false;
    page = PAGE_DEFAULT.PAGE;
    limit = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    listPage: Array<any> = LISTPAGE;
    totalRecords = 0;
    listRole: Array<any> = [];
    listMenu: Array<any> = [];
    permissionRole: any;
    allPermission: any;

    //search
    roleCode: any;
    roleName: any;

    defaultPermissionList: Array<any> = [];
    permissionList: Array<any> = [];
    requestList: Array<any> = [];

    form: any;
    language: string;

    constructor(
        private shareDataService: ShareDataService,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastService: ToastrService,
        private categoryService: CategoryService,
        private roleService: RoleService,
        private permissionService: PermissionService,
        private router: Router,
        private translate: TranslateService
    ) {
        this.shareDataService.shareLangMethod$.subscribe((data) => {
            if (data) {
                this.language = data;
                this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
            }
        });
    }

    ngOnInit() {
        this.language = this.translate.currentLang;
        this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
        this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);

        this.getDataList();
    }

    getDataList() {
        const roles = this.roleService.getByCondition({});
        const menus = this.categoryService.getByCondition({});
        const request = [
            roles,
            menus
        ];
        forkJoin(request).subscribe(res => {
            if (res) {
                this.listRole = res[0].data;
                this.listMenu = res[1].data;
                if (this.listMenu) {
                    this.listMenu.forEach(x => {
                        this.permissionList.push(
                            this.createPermissionItem(this.listRole[0].code, x.id)
                        );
                        this.defaultPermissionList = [...this.permissionList];
                    })
                }
            }
        })
    }

    search() {
        this.limit = 10;
        this.page = 1;
        this.getRoleByCondition();

    }

    reset() {
        this.page = 1;
        this.limit = 10;
        this.roleCode = null;
        this.roleName = null;
        this.getRoleByCondition();
    }

    getRoleByCondition() {
        this.permissionList = [...this.defaultPermissionList];
        this.requestList = [];
        this.permissionRole = null;

        const json = {
            limit: this.limit,
            page: this.page,
            code: this.roleCode,
            name: this.roleName,
            // status: this.searchForm.value.stastus === -1 ? -1 : this.searchForm.value.stastus,
        }
        // if (this.searchForm.value.stastus === true || this.searchForm.value.stastus === 1) {
        //   json.status = 1;
        // }
        // else if (this.searchForm.value.stastus === false || this.searchForm.value.stastus === 0)
        //   json.status = 0;
        // else
        //   json.status = -1;
        this.loading = true;
        this.roleService.getByCondition(json).subscribe(res => {
            if (res && res.data) {
                this.listRole = res.data;
                this.totalRecords = res.totalRecord;
            } else {
                this.toastService.error('Get data failed', '');
            }
            this.loading = false;
        }, () => {
            this.toastService.error('Get data failed', '');
            this.loading = false;
        });
    }

    createPermissionItem(roleCode: any, menuId: any): any {
        const json = {
            id: null,
            roleCode: roleCode,
            menuId: menuId,
            view: false,
            create: false,
            update: false,
            delete: false,
            confirm: false,
            reject: false,
            creater: this.authService.user.userId,
            createdDate: null,
            editer: null,
            editedDate: null
        }
        return json;
    }

    onCheck(item: any, action: any) {
        const index = this.permissionList.indexOf(item);
        switch (action) {
            case 'view':
                this.permissionList[index].view = !this.permissionList[index].view;
                break;
            case 'create':
                this.permissionList[index].create = !this.permissionList[index].create;
                break;
            case 'update':
                this.permissionList[index].update = !this.permissionList[index].update;
                break;
            case 'delete':
                this.permissionList[index].delete = !this.permissionList[index].delete;
                break;
            case 'confirm':
                this.permissionList[index].confirm = !this.permissionList[index].confirm;
                break;
            case 'reject':
                this.permissionList[index].reject = !this.permissionList[index].reject;
                break;
            case 'all':
                if (item.all) {
                    this.permissionList[index].view = true;
                    this.permissionList[index].create = true;
                    this.permissionList[index].update = true;
                    this.permissionList[index].delete = true;
                    this.permissionList[index].confirm = true;
                    this.permissionList[index].reject = true;
                    this.permissionList[index].call = true;
                    this.permissionList[index].download = true;
                    this.permissionList[index].importFile = true;
                    this.permissionList[index].export = true;
                } else {
                    this.permissionList[index].view = false;
                    this.permissionList[index].create = false;
                    this.permissionList[index].update = false;
                    this.permissionList[index].delete = false;
                    this.permissionList[index].confirm = false;
                    this.permissionList[index].reject = false;
                    this.permissionList[index].call = false;
                    this.permissionList[index].download = false;
                    this.permissionList[index].importFile = false;
                    this.permissionList[index].export = false;
                }
                break;
            case 'call':
                this.permissionList[index].call = !this.permissionList[index].call;
                break;
            case 'download':
                this.permissionList[index].download = !this.permissionList[index].download;
                break;
            case 'importFile':
                this.permissionList[index].importFile = !this.permissionList[index].importFile;
                break;
            case 'export':
                this.permissionList[index].export = !this.permissionList[index].export;
                break;
        }
        const findIndex = this.requestList.findIndex(x => x.menuId === item.menuId);

        if (findIndex < 0) {
            this.requestList.push(this.permissionList[index]);
        } else {
            this.requestList[findIndex] = {...this.permissionList[index]}
        }


    }

    onCheckAllPermission() {
        this.allPermission = !this.allPermission;
        if (this.allPermission) {
            this.permissionList.forEach(p => {
                p.all = true;
                p.view = true;
                p.create = true;
                p.update = true;
                p.delete = true;
                p.confirm = true;
                p.reject = true;
                p.call = true;
                p.download = true;
                p.importFile = true;
                p.export = true;
                const findIndex = this.requestList.findIndex(x => x.menuId === p.menuId);

                if (findIndex < 0) {
                    this.requestList.push(p);
                } else {
                    this.requestList[findIndex] = {...p}
                }
            });
        } else {
            this.permissionList.forEach(p => {
                p.all = false;
                p.view = false;
                p.create = false;
                p.update = false;
                p.delete = false;
                p.confirm = false;
                p.reject = false;
                p.call = false;
                p.download = false;
                p.importFile = false;
                p.export = false;
                const findIndex = this.requestList.findIndex(x => x.menuId === p.menuId);

                if (findIndex < 0) {
                    this.requestList.push(p);
                } else {
                    this.requestList[findIndex] = {...p}
                }
            });
        }
    }

    getPermissionByRoleCode(item: any) {
        this.requestList = [];
        this.permissionRole = item;
        const json = {
            roleCode: item.code
        }

        this.permissionService.getPERByCondition(json).subscribe(res => {
            if (res && res.data) {
                const listPer = res.data;

                this.permissionList = [...this.defaultPermissionList];
                this.permissionList.forEach(x => {
                    const permission = listPer.find(per => per.menuId === x.menuId);
                    if (permission) {
                        const index = this.permissionList.findIndex(i => i.menuId === permission.menuId);
                        this.permissionList[index] = {...permission};
                    }
                });
            } else {
                this.toastService.error('Get data failed');
            }
            this.loading = false;
        }, () => {
            this.toastService.error('Get data failed');
            this.loading = false;
        });
    }

    submit() {
        if (!this.requestList || this.requestList.length <= 0) {
            return;
        }
        this.loading = true;
        const json = {
            requestList: this.requestList.map(item => {
                item.roleCode = this.permissionRole?.code;
                item.creater = this.authService.currentUser().userId;
                item.editer = this.authService.currentUser().userId;
                return item;
            })
        }
        this.permissionService.savePermission(json).subscribe(res => {
            if (res && res.data > 0) {
                this.toastService.success('Update permission success!');
                this.requestList = [];
            } else {
                this.toastService.error('Update permission failed!');
            }
            this.loading = false;
        }, () => {
            this.loading = false;
            this.toastService.error('Update permission failed!');
        })
    }


}
