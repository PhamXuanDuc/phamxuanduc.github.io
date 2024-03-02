import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/module/user.service';
import Swal from 'sweetalert2';
import { UserModalComponent } from './user-modal/user-modal.component';
import { DepartmentService } from '../../../core/services/module/department.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    FILE_TYPE,
    getBreadCrumbItems,
    getBreadCrumbItemsWithLanguage,
    LISTPAGE,
    PAGE_DEFAULT
} from '../../../shared/utils/app.util';
import { parseDataUpload } from '../../../shared/utils/upload.util';
import { AuthenticationService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/core/services/module/role.service';
import { TranslateService } from '@ngx-translate/core';
import { createFileType, downLoadFile } from 'src/app/shared/utils/export.util';
import { ShareDataService } from 'src/app/share-data.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
    @ViewChild('userFileImport', { static: false }) userFileImport: ElementRef;

    searchUserForm: FormGroup;
    ngUnsubscribe = new Subject<void>();


    breadCrumbItemsData: Array<any>;
    breadCrumbItems: Array<any>;
    isCollapsed = true;
    fileType = FILE_TYPE;

    // Param
    statusList = [
        { value: '1', name: 'Hoạt động', nameEn: 'Actice' },
        { value: '0', name: 'Không hoạt động', nameEn: 'Inactive' },
    ];
    currenLang: any
    loading = false;
    listPage: Array<any> = LISTPAGE;
    pageNumber = PAGE_DEFAULT.PAGE;
    pageSize = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    totalRecord = 0;
    userList: Array<any> = [];
    departmentList: Array<any> = [];
    roleList: Array<any> = [];

    //searchKey
    userCode: string;
    userName: string;
    departmentCode: string;
    status: -1;
    language: string;

    constructor(
        private userSerivice: UserService,
        private modalService: NgbModal,
        private departmentService: DepartmentService,
        private roleSevice: RoleService,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private shareDataService: ShareDataService,
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

    get fSearch() {
        return this.searchUserForm.controls;
    }

    ngOnInit() {
        this.language = this.translate.currentLang;
        this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
        this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);
        
        this.currenLang = window.localStorage.getItem('language');
        this.shareDataService.shareLangMethod$.subscribe((data) => {
          if (data) {
            this.currenLang = data;
          }
        });
        this.search();
        this.getDataCbb();
    }

    getUserList() {
        const json = {
            userCode: this.userCode,
            userName: this.userName,
            departmentCode: this.departmentCode,
            status: this.status,
            page: this.pageNumber,
            limit: this.pageSize,
        };
        this.loading = true;
        this.userSerivice.getUserList(json).subscribe(res => {
            if (res) {
                this.userList = res.data;
                this.totalRecord = res.totalRecord;
            }
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    }
    search() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.getUserList();
    }

    onPageChange(page: any) {
        this.pageNumber = page;
        this.getUserList();
    }

    changeLimit(event: any) {
        this.pageSize = event;
        this.getUserList();
    }

    reset() {
        this.userCode = null;
        this.userName = null;
        this.departmentCode = null;
        this.status = -1;
        this.search();
    }

    resetPassword(code: string) {
        const json = {code: code};
        this.loading = true;
        this.userSerivice.resetPass(json).subscribe(res => {
            this.loading = false;
            if(res) {
                if(res.errorCode === '0') {
                    this.toastr.success(res.errorDesc, 'Thông báo');
                } else {
                    this.toastr.error(res.errorDesc, 'Thông báo');
                }
            } else {
                this.toastr.error('Cấp lại mật khẩu thất bại');
            }
        }, _err => {this.loading = false;})
    }

    deletedUser(item: any) {
        Swal.fire({
            // tslint:disable-next-line: max-line-length
            title: 'Dữ liệu bị xóa sẽ không thể khôi phục!',
            html: 'Xác nhận xóa người dùng này?',
            type: 'question',
            imageHeight: 150,
            imageWidth: 320,
            imageClass: 'img-responsive',
            animation: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.value) {
                const json = { id: item.id };
                this.loading = true;
                this.userSerivice.deleteUser(json).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
                    if (res && res.errorCode === '0') {
                        this.toastr.success('Xóa người dùng thành công');
                        this.search();
                    } else {
                        this.toastr.error(res.errorDesc, 'Thông báo');
                    }
                    this.loading = false;

                }, err => {
                    this.loading = false;
                });

            }
        });
    }

    openCreateModal(item: any) {
        const modalRef = this.modalService.open(UserModalComponent, { centered: true, size: 'lg', backdrop: 'static' });
        if (item) {
            modalRef.componentInstance.item = item;
        }
        modalRef.componentInstance.title = item ? 'Edit' : 'Create';
        modalRef.componentInstance.departmentList = this.departmentList;
        modalRef.componentInstance.roleList = this.roleList.filter(x => x.status !== -1);
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
            this.search();
            this.modalService.dismissAll();
        });
    }

    getDataCbb() {
        this.departmentService.getDepartmentList({ page: 1, limit: 0 }).subscribe(res => {

            if (res) {
                this.departmentList = res.data;
            }
        });
        this.roleSevice.getByCondition({ status: -1 }).subscribe(res => {
            if (res && res.data) {
                this.roleList = res.data;
            }
        });
    }

    onFileSelect(e: any) {
        if (e.target.files ? e.target.files.length > 0 : false) {
            this.userSerivice.importUsers(
                parseDataUpload(e.target.files[0], { creater: this.authService.currentUser().userCode }))
                .subscribe(data => {
                    if (data ? data.errorCode === '0' : false) {
                        this.toastr.success('Import dữ liệu thành công');
                        this.search();
                        this.userFileImport.nativeElement.value = ''; // reset value file choose
                    } else {
                        this.toastr.error(data.errorDesc, 'Thông báo');
                        this.userFileImport.nativeElement.value = ''; // reset value file choose
                    }
                });
        }

    }

    export(){
        this.loading = true;
        this.userSerivice.export({"fileType":"xlsx"}).subscribe(res=>{
            if(res){
                downLoadFile(res,createFileType("xlsx"),'UserManagement_' + new Date().toDateString())
            }
            this.loading = false;
        },
        error => {
          this.toastr.error('Export error');
          this.loading = false;
        })
    }
    

}
