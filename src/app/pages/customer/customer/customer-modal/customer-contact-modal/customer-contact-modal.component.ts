import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerService} from "../../../../../core/services/module/customer.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../../../core/services/auth/auth.service";
import {CustomerContactService} from "../../../../../core/services/module/customer-contact.service";
import {LISTPAGE, PAGE_DEFAULT} from "../../../../../shared/utils/app.util";

@Component({
    selector: 'app-customer-contact-modal',
    templateUrl: './customer-contact-modal.component.html',
    styleUrls: ['./customer-contact-modal.component.scss']
})
export class customerContactModalComponent implements OnInit {
    @Input() title: any;
    @Input() item: any;
    ngUnsubscribe = new Subject<void>();
    customerContactList: Array<any> = [];
    form: FormGroup;
    isSubmit: boolean;
    @Input() customerList: Array<any> = [];
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    private customerId: any;
    pageSizes: Array<any> = LISTPAGE;
    pageNumber = PAGE_DEFAULT.PAGE;
    pageSize = PAGE_DEFAULT.PAGESIZE;
    maxSize = PAGE_DEFAULT.MAXSIZE;
    loading = false;
    totalRecord = 0;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastService: ToastrService,
        private customerService: CustomerService,
        private customerContactService: CustomerContactService
    ){
    }

    ngOnInit() {
        this.getDataCbb()
        this.initform()
        if (this.item) {
            this.form.patchValue(this.item);}

    }
    initform(){
        this.form = this.formBuilder.group({
            id:[null],
            customerId: [null,[Validators.required] ],
            ord:[""],
            // name: ['', ],
            // phoneNumber: ['',[Validators.required, Validators.pattern('(84|0[3|5|7|8|9]+[0-9]{8})')]],
            permanentAddress: ['',[Validators.required] ],
            companyAddress: ['',[Validators.required]  ],
            nameOfTheReferencePerson: ['',[Validators.required] ],
            referenceRelationship: ["",[Validators.required] ],
            phoneNumberReference:["",[Validators.required] , Validators.pattern('(84|0[3|5|7|8|9]+[0-9]{8})') ],
            temporaryResidenceAddress:["",[Validators.required] ],
            homeNumber:["",[Validators.required] ],
            companyPhone:["",[Validators.required], Validators.pattern('(84|0[3|5|7|8|9]+[0-9]{8})')]
        })
    }

    getDataCbb() {
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
        const formValue = this.form.value;
        if (this.item) {
            formValue.action = 'update';
            this.update(formValue);
        }else if(this.item){
            formValue.action = "delete";
            this.delete(formValue);
        } else {
            formValue.action = 'add';
            this.create(formValue);
        }
    }

    create(formValue) {
        this.loading = true;
        this.passEntry.emit(formValue);
        this.close();
    }


    update(formValue) {
        this.loading = true;
        this.passEntry.emit(formValue);
        this.close();
    }
    delete(formValue){
        this.loading = true;
        this.passEntry.emit(formValue);
        this.close();
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


