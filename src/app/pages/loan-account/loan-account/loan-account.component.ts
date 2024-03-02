import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { LoanAccountService } from 'src/app/core/services/module/loan-account.service';
import { LoanAccountModalComponent } from './loan-account-modal/loan-account-modal/loan-account-modal.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/core/services/module/customer.service';
import {getBreadCrumbItems, getBreadCrumbItemsWithLanguage} from "../../../shared/utils/app.util";
import {ShareDataService} from "../../../share-data.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.css']
})
export class LoanAccountComponent implements OnInit {

  ngUnsubscribe = new Subject<void>();

  breadCrumbItemsData: Array<any>;
  breadCrumbItems: Array<any>;
  isCollapsed = true;
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  maxSize = 5;
  totalRecord = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  loanAccountList: Array<any> = [];
  loanAccountAll: Array<any> = [];
  language: string;
  departmentList: Array<any> = [];
  customerList: Array<any> = [];
  form: FormGroup;
  isSubmit: boolean;
  status: -1;
  departmentCode: string;
  accountNumber: string;
  name: string;
  constructor(
    private loanAccountService : LoanAccountService,
    private departmentService : DepartmentService,
    private modalService: NgbModal,
    private formBuilder : FormBuilder,
    private toastService: ToastrService,
    private customerService: CustomerService,
    private shareDataService: ShareDataService,
    private translate: TranslateService,
  private router: Router,

  ) {this.shareDataService.shareLangMethod$.subscribe((data) => {
    if (data) {
      this.language = data;
      this.breadCrumbItems = getBreadCrumbItemsWithLanguage(
          this.breadCrumbItemsData,
          this.language
        );}
      });
  }

  ngOnInit() {
    this.language = this.translate.currentLang;
    this.breadCrumbItemsData = [...getBreadCrumbItems(this.router)];
    this.breadCrumbItems = getBreadCrumbItemsWithLanguage(
        this.breadCrumbItemsData,
        this.language
    );
    this.initFormSearch();
    this.getDataCbb();
  }


  
  initFormSearch() {
    this.form = this.formBuilder.group({
      cifNo:[""],
      accountNumber:[""],
      name:[""],
      address:[""],
      phone:[""],
      email:[""],
      currency:[""],
      currentBalance:[""],
      pastDuePrincipal:[""],
      getPastDueinterest:[""],
      principalPaidToDate:[""],
      interesPaidToDate:[""],
      riskCode:[""],
      collateralAmount:[""],
      collateralCode:[""],
      npl:[""],
      branchCode:[""],
      customerCode:[""]
  });
    this.getLoanAccountList();
    }
  getLoanAccountList() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      accountNumber: this.form.value.accountNumber,
      name: this.form.value.name,
      departmentCode: this.departmentCode,
      status: this.status,
    }
    this.loading = true;
    this.loanAccountService.getAccountList(json).subscribe(res => {
      if (res) {
        this.loanAccountList = res.data;
        this.totalRecord = res.totalRecord;
      } else {
        this.loanAccountList = [];
        this.totalRecord = 0;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }
  search() {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.getLoanAccountList();
  }


  changeLimit(event: any) {
    this.pageSize = event;
    this.getLoanAccountList();
  }
  
  onPageChange(page: any) {
    this.pageNumber = page;
    this.getLoanAccountList();
  }


  reset() {
    this.isSubmit = false;
    this.form.reset();
    }
  getDataCbb() {
    this.departmentService.getDepartmentList({ page: 1, limit: 0 }).subscribe(res => {

        if (res) {
            this.departmentList = res.data;
        }
    });
    this.customerService.getCustomer({page:1,limit:0}).subscribe(res => {
      if(res){
        this.customerList = res.data;
      }
    })
}

openModal(item: any) {
  const modalRef = this.modalService.open(LoanAccountModalComponent, {
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
    this.getLoanAccountList();
  });
}


delete(item: any) {
  Swal.fire({
    title: "Dữ liệu bị xóa sẽ không thể khôi phục!",
    html: "Xác nhận xóa loan account này?",
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
      const json = { id: item.id };
      this.loading = true;
      this.loanAccountService
        .deleteAccount(json)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res) => {
            if (res && res.errorCode == "0") {
              this.toastService.success("Xóa thành công", "Thông báo");
              this.getLoanAccountList();
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
}




