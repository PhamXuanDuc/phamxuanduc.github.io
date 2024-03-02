import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from 'src/app/core/services/auth/auth.service';
import {RoleService} from 'src/app/core/services/module/role.service';
import {UserService} from 'src/app/core/services/module/user.service';
import {RoleModalComponent} from '../role-modal/role-modal.component';
import {
  getBreadCrumbItems,
  getBreadCrumbItemsWithLanguage,
  LISTPAGE,
  PAGE_DEFAULT
} from "../../../../shared/utils/app.util";
import {ShareDataService} from "../../../../share-data.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-role-management',
    templateUrl: './role-management.component.html',
    styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

    breadCrumbItemsData: Array<any>;
    breadCrumbItems: Array<any>;
    isCollapsed = true;
    loading = false;
    totalRecords = 0;
    listRole: Array<any> = [];
    departmentList: Array<any> = [];
    groupList: Array<any> = [];
    limitSelect: any;
    page = PAGE_DEFAULT.PAGE;
    limit = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    listPage: Array<any> = LISTPAGE;

    code: string;
    name: string;
    language: string;

    constructor(
        private shareDataService: ShareDataService,
        private userSerivice: UserService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastService: ToastrService,
        private roleService: RoleService,
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
        this.getAllByCondition();
    }


    search() {
        this.limit = 5;
        this.page = 1;
        this.getAllByCondition();

    }

    getAllByCondition() {
        this.loading = true;
        const json = {
            limit: this.limit,
            page: this.page,
            code: this.code,
            name: this.name
        }

        this.roleService.getByCondition(json).subscribe(res => {
            if (res && res.data) {
                this.listRole = res.data;
                this.totalRecords = res.totalRecord;
            } else {
                this.toastService.error(res.errorDesc, '');
            }
            this.loading = false;
        }, error => {
            this.toastService.error('Get data failed', '');
            this.loading = false;
        });
    }

    onPageChange(pageNum: number) {
        this.page = pageNum;
        //console.log(pageNum);
        this.getAllByCondition();
    }

    changeLimit(event: any) {
        this.limit = event;
        this.getAllByCondition();
    }

    openCreateModal(item: any) {
        const modalRef = this.modalService.open(RoleModalComponent, {centered: true, size: 'lg', backdrop: 'static'});
        if (item) {
            modalRef.componentInstance.item = item;
        }
        modalRef.componentInstance.title = item ? 'Edit' : 'Create';
        // modalRef.componentInstance.departmentList = this.departmentList;
        // modalRef.componentInstance.groupList = this.groupList;
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
            this.getAllByCondition();
            this.modalService.dismissAll();
        });
    }

    resetSearch() {
        this.code = null;
        this.name = null;
        this.search();
    }
}
