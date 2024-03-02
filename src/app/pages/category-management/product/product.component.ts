import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/module/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../../core/services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {
    getBreadCrumbItems,
    getBreadCrumbItemsWithLanguage,
    LISTPAGE,
    PAGE_DEFAULT
} from "../../../shared/utils/app.util";
import {Router} from "@angular/router";
import {ShareDataService} from "../../../share-data.service";
import {TranslateService} from "@ngx-translate/core";
import {ProductService} from "../../../core/services/module/category-management/product.service";
import {ProductModalComponent} from "./product-modal/product-modal.component";
import Swal from "sweetalert2";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    breadCrumbItemsData: Array<any>;
    breadCrumbItems: Array<any>;
    isCollapsed = true;
    loading = false;
    totalRecords = 0;
    listData: Array<any> = [];
    departmentList: Array<any> = [];
    groupList: Array<any> = [];
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
        private productService: ProductService,
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

        this.productService.getByCondition(json).subscribe(res => {
            if (res && res.data) {
                this.listData = res.data;
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
        const modalRef = this.modalService.open(ProductModalComponent, {
            centered: true,
            size: 'lg',
            backdrop: 'static'
        });
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

    deleteItem(item: any) {
        Swal.fire({
            // tslint:disable-next-line: max-line-length
            title: this.translate.instant('PORTAL.warning_delete'),
            html: this.translate.instant('PORTAL.confirm_delete'),
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
                this.productService.delete(json).subscribe(res => {
                    if (res && res.errorCode == '0') {
                        this.toastService.success(this.translate.instant('PORTAL.delete_successfully'),
                            this.translate.instant('PORTAL.notification'));
                        this.getAllByCondition();
                        this.modalService.dismissAll();
                    } else {
                        this.toastService.error(this.translate.instant('PORTAL.delete_failed'),
                            this.translate.instant('PORTAL.error'));
                    }
                    this.loading = false;

                }, err => {
                    this.loading = false;
                })

            }
        });
    }
}
