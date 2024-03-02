import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthenticationService} from 'src/app/core/services/auth/auth.service';
import {DepartmentService} from 'src/app/core/services/module/department.service';
import {ShareDataService} from 'src/app/share-data.service';
import {createFileType, downLoadFile} from 'src/app/shared/utils/export.util';
import {parseDataUpload} from 'src/app/shared/utils/upload.util';
import Swal from 'sweetalert2';
import {ImportErrorAdminModalComponent} from '../import-error-admin-modal/import-error-admin-modal.component';
import {DepartmentModalComponent} from './department-modal/department-modal.component';
import {
  getBreadCrumbItems,
  getBreadCrumbItemsWithLanguage,
  LISTPAGE,
  PAGE_DEFAULT
} from "../../../shared/utils/app.util";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-department-management',
    templateUrl: './department-management.component.html',
    styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent implements OnInit {
    @ViewChild('userFileImport', {static: false}) userFileImport: ElementRef;

    ngUnsubscribe = new Subject<void>();

    breadCrumbItemsData: Array<any>;
    breadCrumbItems: Array<any>;
    isCollapsed = true;

    //Param
    departmentCode: string;
    departmentName: string;
    status = '';
    statusList = [
        {value: '', name: 'Tất cả', nameEn: 'All'},
        {value: '1', name: 'Hoạt động', nameEn: 'Actice'},
        {value: '0', name: 'Không hoạt động', nameEn: 'Inactive'},
    ];

    pageSizes: Array<any> = LISTPAGE;
    pageNumber = PAGE_DEFAULT.PAGE;
    pageSize = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    loading = false;
    totalRecord = 0;
    departmentList: Array<any> = [];
    departmentAll: Array<any> = [];
    language: string;

    constructor(
        private departmentSerivice: DepartmentService,
        private modalService: NgbModal,
        private toastService: ToastrService,
        private authService: AuthenticationService,
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

    ngOnInit() {
        this.language = this.translate.currentLang;
        this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
        this.breadCrumbItems = getBreadCrumbItemsWithLanguage(this.breadCrumbItemsData, this.language);

        this.getDepartmentList();
        this.getAllDepartment();
    }

    refresh() {
        this.loading = true;
        this.departmentCode = null;
        this.departmentName = null;
        this.status = null;
        const json = {
            status: null,
            page: 1,
            limit: this.pageSize,
        }
        this.departmentSerivice.getDepartmentList(json).subscribe(res => {
            if (res) {
                this.departmentList = res.data;
                this.totalRecord = res.totalRecord;
            }
            this.loading = false;
        }, err => {
            this.loading = false;
        })
    }

    getDepartmentList() {
        const json = {
            code: this.departmentCode,
            name: this.departmentName,
            status: this.status ? Number(this.status) : null,
            page: this.pageNumber,
            limit: this.pageSize,
        }
        this.loading = true;
        this.departmentSerivice.getDepartmentList(json).subscribe(res => {
            if (res) {
                this.departmentList = res.data;
                this.totalRecord = res.totalRecord;
            } else {
                this.departmentList = [];
                this.totalRecord = 0;
            }
            this.loading = false;
        }, err => {
            this.loading = false;
        })
    }

    getAllDepartment() {
        const json = {
            status: null,
            page: 1,
            limit: 0,
        }
        this.loading = true;
        this.departmentSerivice.getDepartmentList(json).subscribe(res => {
            this.departmentAll = res.data;
            this.loading = false;
        }, err => {
            this.loading = false;
        })
    }


    search() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.getDepartmentList();
    }

    onPageChange(page: any) {
        this.pageNumber = page;
        this.getDepartmentList();
    }

    changeLimit(event: any) {
        this.pageSize = event;
        this.getDepartmentList();
    }

    deletedDepartment(item: any) {
        Swal.fire({
            // tslint:disable-next-line: max-line-length
            title: 'Dữ liệu bị xóa sẽ không thể khôi phục!',
            html: 'Xác nhận phòng ban này?',
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
                const json = {id: item.id};
                this.loading = true;
                this.departmentSerivice.deleteDepartment(json).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
                    if (res && res.errorCode == '0') {
                        this.toastService.success('Xóa phòng ban thành công', 'Thông báo');
                        this.getDepartmentList();
                    } else {
                        this.toastService.error('Xóa phòng ban thất bại', 'Lỗi');
                    }
                    this.loading = false;

                }, err => {
                    this.loading = false;
                })

            }
        });
    }

    reset() {

    }

    export() {
        this.loading = true;
        this.departmentSerivice.export({"fileType": "xlsx"}).subscribe(res => {
                if (res) {
                    downLoadFile(res, createFileType("xlsx"), 'DepartmentManagement_' + new Date().toDateString())
                }
                this.loading = false;
            },
            error => {
                this.toastService.error('Export error');
                this.loading = false;
            })
    }

    exportTemplate() {
        this.loading = true;
        this.departmentSerivice.exportTemplate({"fileType": "xlsx"}).subscribe(res => {
                if (res) {
                    downLoadFile(res, createFileType("xlsx"), 'DepartmentTemplate_' + new Date().toDateString())
                }
                this.loading = false;
            },
            error => {
                this.toastService.error('Export error');
                this.loading = false;
            })
    }

    openCreateModal(item: any) {
        const modalRef = this.modalService.open(DepartmentModalComponent, {
            centered: true,
            size: 'lg',
            scrollable: true,
            backdrop: 'static'
        });
        if (item) {
            modalRef.componentInstance.item = item;
        }
        modalRef.componentInstance.title = item ? 'Edit' : 'Create';
        modalRef.componentInstance.departmentAll = this.departmentAll;
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
            this.modalService.dismissAll();
            this.getDepartmentList();
            this.getAllDepartment();
        });
    }

    openModalErrorImport(data: any) {
        const modalRef = this.modalService.open(ImportErrorAdminModalComponent,
            {
                centered: true,
                windowClass: 'customSize',
                backdrop: 'static'
            });
        modalRef.componentInstance.listError = data;
        // modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
        //   this.modalService.dismissAll();
        // })
    }


    onFileSelect(e: any) {
        this.loading = true;
        if (e.target.files ? e.target.files.length > 0 : false) {
            this.departmentSerivice.importDepartment(
                parseDataUpload(e.target.files[0], {creater: this.authService.user.userId}))
                .subscribe(res => {
                    if (res ? res.errorCode === '0' : false) {
                        this.userFileImport.nativeElement.value = ''; // reset value file choose
                        if (res.data.length > 0) {
                            this.openModalErrorImport(res.data);
                        } else {
                            this.toastService.success(res.errorDesc, 'Thông báo');
                        }
                        this.search();
                    } else {
                        this.toastService.error(res.errorDesc, 'Thông báo');
                        this.userFileImport.nativeElement.value = ''; // reset value file choose
                    }
                    this.loading = false;
                });
        }
    }

}
