import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {CustomerService} from 'src/app/core/services/module/customer.service';
import {DepartmentService} from 'src/app/core/services/module/department.service';
import {AuthenticationService} from "../../../../core/services/auth/auth.service";
import {customerContactModalComponent} from "./customer-contact-modal/customer-contact-modal.component";
import {CustomerContactService} from "../../../../core/services/module/customer-contact.service";
import Swal from "sweetalert2";
import {takeUntil} from "rxjs/operators";
import {LISTPAGE, PAGE_DEFAULT} from "../../../../shared/utils/app.util";
import {createFileType, downLoadFile} from "../../../../shared/utils/export.util";

@Component({
    selector: 'app-customer-modal',
    templateUrl: './customer-modal.component.html',
    styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent implements OnInit {
    @Input() title: any;
    @Input() item: any;
    ngUnsubscribe = new Subject<void>();
    toDay = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    isLinear = false;

    @Input() departmentList: Array<any> = [];
    customerContactList: Array<any> = [];
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    imageDefault = 'assets/images/users/avatar_default.png';
    filePath = '';
    file: any;
    pageSizes: Array<any> = LISTPAGE;
    pageNumber = PAGE_DEFAULT.PAGE;
    pageSize = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    loading = false;
    totalRecord = 0;
    form: FormGroup;
    formContact: FormGroup;
    isSubmit: boolean;
    codeHasUse = null;
    public isEditing: boolean;
    public pendingValue: string;
    private id: String;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private toastService: ToastrService,
        private  departmentService: DepartmentService,
        private authService: AuthenticationService,
        private modalService: NgbModal,
        private customerContactService: CustomerContactService,
        private toastr: ToastrService,

    ) {
    }

    ngOnInit() {

        this.filePath = this.imageDefault;
        this.initform()

        if (this.item) {
            let newitem = {...this.item};
            const date = new Date(this.item.birthday);
            newitem.birthday = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
            if (this.item.roleCode) {
                newitem.roleCode = this.item.roleCode.split(',');
            }
            newitem.editer = this.authService.user.userId;
            this.form.patchValue(newitem);
            this.filePath = (this.item.avatarUrl ? this.item.avatarUrl : this.imageDefault);
        }
        this.getDataCbb()
    }

    initform() {
        this.form = this.formBuilder.group({
            id: [null],
            code: [this.item ? this.item.code : null, [Validators.required]],
            shortName: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            identityCardNumber: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9]+[0-9]{8})')]],
            address: ['', [Validators.required]],
            mail: [''],
            // accountNumber: [''],
            // idCard: [''],
            gender: [true, [Validators.required]],
            birthday: ['', [Validators.required]],
            job: [''],
            standard: [''],
            marriage: [''],
            houseOwnership: [''],
            workingTime: [''],
            companyName: ['', [Validators.required]],
            position: ['', [Validators.required]],
            monthlyIncome: ['', [Validators.required]],
            referenceCount: ['', [Validators.required]],
            numberOfContracts: ['', [Validators.required]],
            departmentCode: ['', [Validators.required]],
            creater: [this.authService.user.userId],
            createdDate: [null],
            editer: [null],
            editedDate: [null],
            status: [true]
        });
        this.formContact = this.formBuilder.group({
            // name: [''],
            // phoneNumber: [''],
            ord: [''],
            permanentAddress: ['',[Validators.required]],
            temporaryResidenceAddress: ['',[Validators.required]],
            homeNumber: ['',[Validators.required]],
            companyAddress: ['',[Validators.required]],
            companyPhone: ['',[Validators.required]],
            nameOfTheReferencePerson: ['',[Validators.required]],
            referenceRelationship: ['',[Validators.required]],
            phoneNumberReference: ['',[Validators.required, Validators.pattern('(84|0[3|5|7|8|9]+[0-9]{8})')]],
            creater: [this.authService.user.userId],
            createdDate: [null],
            editer: [null],
            editedDate: [null],
            status: [true]
        });
    }


    getDataCbb() {
        this.departmentService.getDepartmentList({page: 1, limit: 0}).subscribe(res => {

            if (res) {
                this.departmentList = res.data;
            }
        });
        const json = {
            customerId: this.f.id.value
        }
        console.log(json)
        this.customerContactService.findCustomerContactByCustomerId(json).subscribe(res => {
            if (res) {
                this.customerContactList = res.data;
            }
        })
    }

    getDate() {
        return new Date(this.f.birthday.value.year, this.f.birthday.value.month, this.f.birthday.value.day);
    }

    get f() {
        return this.form.controls;
    }

    submit() {
        this.isSubmit = true;
        this.form.markAsTouched();
        if (this.form.invalid) {
            this.toastService.warning("Vui lòng nhập đầy đủ thông tin", ""
            );
            return;
        }
        const formValue = this.form.value;
        // set data customer contact
        formValue.customerContact = this.customerContactList;
        formValue.birthday = new Date(this.f.birthday.value.year, this.f.birthday.value.month - 1, this.f.birthday.value.day);
        formValue.avatarUrl = this.filePath;

        if (this.item) {
            this.update(formValue);
        } else {
            this.create(formValue);
        }

    }

    create(formValue) {
        this.loading = true;
        this.codeHasUse = false;
        formValue.customerContact = this.customerContactList;
        this.customerService.createCustomer(formValue).subscribe(res => {
            if (res.errorCode == '0') {
                this.toastService.success(
                    res.errorDesc
                );
                this.passEntry.emit(res);
                this.reset();
            } else if (res.errorCode == "-1") {
                const fieldError = res.errorDesc.split(' ')[0];
                if (fieldError === 'Invalid') {
                    this.codeHasUse = 'code';
                } else {
                    this.codeHasUse = fieldError;
                }
                this.toastService.error(res.errorDesc, '');
            } else {
                this.toastService.error(
                    res.errorDesc);
            }
            this.isSubmit = false;
            this.loading = false;
            this.close();
        }, error => {
            this.toastService.error('Create failed', '');
            this.isSubmit = false;
            this.loading = false;
        });

    }

    update(formValue) {
        this.loading = true;
        formValue.customerContact = this.customerContactList;
        this.customerService.updateCustomer(formValue).subscribe(
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
                this.close();
            },
            (error) => {
                this.toastService.error("Update failed", "");
                this.isSubmit = false;
                this.loading = false;
            }
        );
    }

    imagePreview(e: any) {
        this.file = (e.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.filePath = reader.result as string;
        };
        reader.readAsDataURL(this.file);
    }

    reset() {
        this.item = null;
        this.isSubmit = false;
        this.form.reset();
        this.filePath = this.imageDefault;
        this.f.status.setValue(true);
    }

    close() {
        this.isSubmit = false;
        this.form.reset();
        this.item = null;
        this.activeModal.close();
    }

    delete(item: any) {
        Swal.fire({
            title: "Dữ liệu bị xóa sẽ không thể khôi phục!",
            html: "Xác nhận xóa liên hệ này?",
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
                this.customerContactService
                    .deleteCustomerContact(json)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(
                        (res) => {
                            if (res && res.errorCode == "0") {
                                this.toastService.success("Xóa thành công", "Thông báo");
                                this.getDataCbb();
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

    openCreateModal(item: any) {
        const modalRef = this.modalService.open(customerContactModalComponent, {
            centered: true,
            size: "lg",
            scrollable: true,
        });

        if (item) {
            modalRef.componentInstance.item = item;
        }
        modalRef.componentInstance.title = item ? "Update" : "Create";
        modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
            // thêm mới thì thêm vào customerContactList
            if (receivedEntry.action === 'update') {
                const indexUpdate = this.customerContactList.indexOf(item);
                this.customerContactList[indexUpdate] = receivedEntry;
            } else {
                if (!this.customerContactList) {
                    this.customerContactList = [];
                }
                this.customerContactList.push(receivedEntry);
            }
            // update thì thay thế bản ghi cũ trong customerContactList

        });
    }

    exportCustomerContact(){
        this.loading = true;
        this.customerContactService.exportCustomerContact({"fileType":"xlsx"}).subscribe(res=>{
                if(res){
                    downLoadFile(res,createFileType("xlsx"),'CustomerContactList' + new Date().toDateString())
                }
                this.loading = false;
            },
            error => {
                this.toastr.error('Export error');
                this.loading = false;
            })
    }
}


