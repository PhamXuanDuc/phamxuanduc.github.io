import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AuthenticationService} from "src/app/core/services/auth/auth.service";
import Swal from "sweetalert2";
import {CustomerModalComponent} from "./customer-modal/customer-modal.component";
import {CustomerService} from "src/app/core/services/module/customer.service";
import {DepartmentService} from "src/app/core/services/module/department.service";
import {ShareDataService} from "src/app/share-data.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {
    getBreadCrumbItems,
    getBreadCrumbItemsWithLanguage,
    LISTPAGE,
    PAGE_DEFAULT
} from "src/app/shared/utils/app.util";
import {createFileType, downLoadFile} from "../../../shared/utils/export.util";
import {parseDataUpload} from "../../../shared/utils/upload.util";

@Component({
    selector: "app-customer",
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
    @ViewChild("inputFile", {static: false}) inputFile: ElementRef;
    ngUnsubscribe = new Subject<void>();
    searchCustomerForm: FormGroup;
    customerList: Array<any> = [];
    breadCrumbItemsData: Array<any>;
    breadCrumbItems: Array<any>;
    isCollapsed = true;
    isSubmit: boolean;
    isCheckAll = false;
    itemChecked: any;
    itemCheckeds: Array<any> = [];

    departmentList: Array<any> = [];

    pageSizes: Array<any> = LISTPAGE;
    pageNumber = PAGE_DEFAULT.PAGE;
    pageSize = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    loading = false;
    totalRecord = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    customerContact: any[];
//searchKey
    code: string;
    fullName: string;
    departmentCode: string;
    language: string;



    constructor(
        private shareDataService: ShareDataService,
        private departmentService: DepartmentService,
        private customerService: CustomerService,
        private toastService: ToastrService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private router: Router,
        private translate: TranslateService
    ) {
        this.shareDataService.shareLangMethod$.subscribe((data) => {
            if (data) {
                this.language = data;
                this.breadCrumbItems = getBreadCrumbItemsWithLanguage(
                    this.breadCrumbItemsData,
                    this.language
                );
            }
        });
    }

    ngOnInit() {
        this.language = this.translate.currentLang;
        this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
        this.breadCrumbItems = getBreadCrumbItemsWithLanguage(
            this.breadCrumbItemsData,
            this.language
        );
        this.search();
        this.getDataCbb();
    }

    getCustomerList() {
        const json = {
            code: this.code,
            fullName: this.fullName,
            departmentCode: this.departmentCode,
            page: this.pageNumber,
            limit: this.pageSize,
        };
        this.loading = true;
        this.customerService.getCustomer(json).subscribe(
            (res) => {
                if (res) {
                    this.customerList = res.data;
                    this.totalRecord = res.totalRecord;
                }
                this.loading = false;
            },
            (err) => {
                this.loading = false;
            }
        );
    }

    openCreateModal(item: any) {
        const modalRef = this.modalService.open(CustomerModalComponent, {
            centered: true,
            size: "lg",
            scrollable: true,
        });

        if (item) {
            modalRef.componentInstance.item = item;
        }
        modalRef.componentInstance.title = item ? "Update" : "Create";
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
            this.modalService.dismissAll();
            this.getCustomerList();
        });
    }

    search() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.getCustomerList();
    }

    reset() {
        this.code = null;
        this.fullName = null;
        this.departmentCode = null;
        this.search();
    }

    getDataCbb() {
        this.departmentService
            .getDepartmentList({page: 1, limit: 0})
            .subscribe((res) => {
                if (res) {
                    this.departmentList = res.data;
                    console.log(this.departmentList);
                }
            });
        this.customerService
            .getCustomer({page: 1, limit: 0})
            .subscribe((res) => {
                if (res) {
                    this.customerList = res.data;
                }
            });

    }

    changeLimit(event: any) {
        this.pageSize = event;
        this.getCustomerList();
    }

    onPageChange(page: any) {
        this.pageNumber = page;
        this.getCustomerList();
    }

    delete(item: any) {
        Swal.fire({
            title: "Dữ liệu bị xóa sẽ không thể khôi phục!",
            html: "Xác nhận xóa customer này?",
            type: "question",
            imageHeight: 150,
            imageWidth: 320,
            imageClass: "img-responsive",
            animation: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Đóng",
        }).then((result) => {
            if (result.value) {
                const json = {id: item.id};
                this.loading = true;
                this.customerService
                    .deleteCustomer(json)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(
                        (res) => {
                            if (res && res.errorCode == "0") {
                                this.toastService.success("Xóa thành công", "Thông báo");
                                this.getCustomerList();
                            } else {
                            }
                            this.loading = false;
                        },
                        (err) => {
                            this.loading = false;
                        }
                    );
            }
        });
    }

    export(){
        this.loading = true;
        this.customerService.export({"fileType":"xlsx"}).subscribe(res=>{
                if(res){
                    downLoadFile(res,createFileType("xlsx"),'CustomerList' + new Date().toDateString())
                }
                this.loading = false;
            },
            error => {
                this.toastr.error('Export error');
                this.loading = false;
            })
    }

    onFileSelect(e: any) {
        if (e.target.files ? e.target.files.length > 0 : false) {
            this.customerService.importCustomer(
                parseDataUpload(e.target.files[0], {creater: this.authService.currentUser().userCode}))
                .subscribe(data => {
                    if (data ? data.errorCode === '0' : false) {
                        this.toastr.success('Import dữ liệu thành công');
                        this.search();
                        this.inputFile.nativeElement.value = ''; // reset value file choose
                    } else {
                        this.toastr.error(data.errorDesc, 'Thông báo');
                        this.inputFile.nativeElement.value = ''; // reset value file choose
                    }
                });
        }
    }
}
