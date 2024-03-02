import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { CustomerService } from 'src/app/core/services/module/customer.service';
import { DepartmentService } from 'src/app/core/services/module/department.service';
import { LoanAccountService } from 'src/app/core/services/module/loan-account.service';

@Component({
  selector: 'app-loan-account-modal',
  templateUrl: './loan-account-modal.component.html',
  styleUrls: ['./loan-account-modal.component.scss']
})
export class LoanAccountModalComponent implements OnInit {
  @Input() title: any;
  @Input() item: any;
  ngUnsubscribe = new Subject<void>();
  form: FormGroup;
  isSubmit: boolean;
  loading: boolean;
  nameHasUse = false;
  @Input() departmentList: Array<any> = [];
  @Input() customerList: Array<any> = [];

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private loanAccountService: LoanAccountService,
    private authService: AuthenticationService,
    private toastService: ToastrService,
    private  departmentService: DepartmentService,
    private customerService: CustomerService,
    )
    { 

    }

  ngOnInit() {
    this.getDataCbb()
    this.form = this.formBuilder.group({
      id:[null],
      cifNo: ['', [Validators.required]],
      accountNumber:[this.item?this.item.accountNumber:null,[Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9]+[0-9]{8})')]],
      address: ['', [Validators.required]],
      currency: ['',[Validators.required] ],
      email: ['', [Validators.required]],
      branchCode: [""],
      customerCode:[""]
     })
    if (this.item) {
      this.form.patchValue(this.item);}

    }
    
    getDataCbb() {
      this.departmentService.getDepartmentList({ page: 1, limit: 0 }).subscribe(res => {

          if (res) {
              this.departmentList = res.data;
          }
      });
      this.customerService.getCustomer({ page: 1, limit: 0 }).subscribe(res => {

        if (res) {
            this.customerList = res.data;
        }
    });
    }
 get f() {
  return this.form.controls;
}
submit() {
  this.isSubmit = true;
  if (this.form.invalid) {
        return;
      }
  if (this.item) {
        this.update();
  } else {
        this.create();
      }
}
  
  

  create() {
    this.loading = true;
    this.nameHasUse = false;
    this.loanAccountService.createAccount(this.form.value).subscribe(res => {
      if (res.errorCode == '0') {
        this.toastService.success(
          res.errorDesc
        );
        this.passEntry.emit(res);
        this.reset();
      } else {
        this.toastService.error(
          res.errorDesc);
      }
      this.isSubmit = false;
      this.loading = false;
    }, error => {
      this.toastService.error('Create failed', '');
      this.isSubmit = false;
      this.loading = false;
    });
  }


  update() {
    this.loading = true;
    this.loanAccountService.updateAccount(this.form.value).subscribe(
      (res) => {
        if (res.errorCode == "0") {
          this.toastService.success("Updated success", "");
          this.passEntry.emit(res);
          this.reset();
        } else {
          this.toastService.error("Update failed", "");
        }
        this.isSubmit = false;
        this.loading = false;
      },
      (error) => {
        this.toastService.error("Update failed", "");
        this.isSubmit = false;
        this.loading = false;
      }
    );
  }


  reset() {
    this.isSubmit = false;
    this.form.reset();
  }
  close() {
    this.isSubmit = false;
    this.form.reset();
    this.item = null;
    this.activeModal.close();
  }
}


